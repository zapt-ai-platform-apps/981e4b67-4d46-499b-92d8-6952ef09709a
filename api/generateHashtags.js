import { authenticateUser, getUserPlan } from './_apiUtils.js';
import { hashtags } from '../drizzle/schema.js';
import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';
import { createEvent } from '../src/supabaseClient.js';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }

  try {
    const user = await authenticateUser(req);
    const plan = await getUserPlan(user.id);

    const { keyword } = req.body;

    if (!keyword) {
      return res.status(400).json({ error: 'Keyword is required' });
    }

    // Limitations based on plan
    const allowedPlans = ['free', 'basic', 'premium', 'pro'];
    if (!allowedPlans.includes(plan)) {
      return res.status(403).json({ error: 'Invalid subscription plan' });
    }

    // Generate hashtags using createEvent
    const result = await createEvent('chatgpt_request', {
      prompt: `Generate a list of TikTok hashtags related to "${keyword}" in JSON format as { "hashtags": ["hashtag1", "hashtag2", ...] }. Provide up to ${plan === 'free' ? 5 : plan === 'basic' ? 10 : plan === 'premium' ? 20 : 50} hashtags.`,
      response_type: 'json'
    });

    const { hashtags: generatedHashtags } = result;

    // Save hashtags to database
    const sql = neon(process.env.NEON_DB_URL);
    const db = drizzle(sql);

    await db.insert(hashtags).values({
      userId: user.id,
      keyword,
      hashtags: JSON.stringify(generatedHashtags)
    });

    res.status(200).json({ hashtags: generatedHashtags });
  } catch (error) {
    console.error('Error generating hashtags:', error);
    if (error.message.includes('Authorization') || error.message.includes('token')) {
      res.status(401).json({ error: 'Authentication failed' });
    } else {
      res.status(500).json({ error: 'Error generating hashtags' });
    }
  }
}