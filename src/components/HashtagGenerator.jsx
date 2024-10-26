import { createSignal } from 'solid-js';
import { createEvent, supabase } from '../supabaseClient';

function HashtagGenerator(props) {
  const [keyword, setKeyword] = createSignal('');
  const [hashtags, setHashtags] = createSignal([]);
  const [loading, setLoading] = createSignal(false);

  const generateHashtags = async () => {
    if (!keyword()) return;
    setLoading(true);
    try {
      const { data: { session } } = await supabase.auth.getSession();
      const response = await fetch('/api/generateHashtags', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${session.access_token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ keyword: keyword() }),
      });
      if (response.ok) {
        const data = await response.json();
        setHashtags(data.hashtags);
      } else {
        const error = await response.json();
        alert(error.error);
      }
    } catch (error) {
      console.error('Error generating hashtags:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div class="flex-1">
      <div class="bg-white p-6 rounded-lg shadow-md">
        <h2 class="text-2xl font-bold mb-4 text-purple-600">Generate TikTok Hashtags</h2>
        <div class="flex items-center space-x-4">
          <input
            type="text"
            placeholder="Enter keyword"
            value={keyword()}
            onInput={(e) => setKeyword(e.target.value)}
            class="flex-1 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-400 focus:border-transparent box-border"
          />
          <button
            onClick={generateHashtags}
            class={`px-6 py-3 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition duration-300 ease-in-out transform hover:scale-105 cursor-pointer ${loading() ? 'opacity-50 cursor-not-allowed' : ''}`}
            disabled={loading()}
          >
            {loading() ? 'Generating...' : 'Generate'}
          </button>
        </div>
        {hashtags().length > 0 && (
          <div class="mt-6">
            <h3 class="text-xl font-bold mb-2 text-purple-600">Generated Hashtags</h3>
            <div class="flex flex-wrap gap-2">
              {hashtags().map((tag) => (
                <span class="bg-blue-100 text-blue-800 px-3 py-1 rounded-full">{tag}</span>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default HashtagGenerator;