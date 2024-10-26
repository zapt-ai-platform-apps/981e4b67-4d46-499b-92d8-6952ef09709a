import { initializeZapt } from '@zapt/zapt-js';
import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';
import { users } from '../drizzle/schema.js';
import { eq } from 'drizzle-orm';

const { supabase } = initializeZapt(import.meta.env.VITE_PUBLIC_APP_ID);

export async function authenticateUser(req) {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    throw new Error('Missing Authorization header');
  }

  const token = authHeader.split(' ')[1];
  const { data: { user }, error } = await supabase.auth.getUser(token);

  if (error) {
    throw new Error('Invalid token');
  }

  return user;
}

export async function getUserPlan(userId) {
  const sql = neon(process.env.NEON_DB_URL);
  const db = drizzle(sql);

  const user = await db.select()
    .from(users)
    .where(eq(users.userId, userId))
    .limit(1);

  if (user.length === 0) {
    // Create new user with default free plan
    await db.insert(users).values({
      userId,
      plan: 'free',
    });
    return 'free';
  } else {
    return user[0].plan;
  }
}