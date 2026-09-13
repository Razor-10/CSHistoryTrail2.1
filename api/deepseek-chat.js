export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const body = typeof req.body === 'string' ? JSON.parse(req.body) : (req.body || {});
    const messages = body.messages;

    if (!Array.isArray(messages) || messages.length === 0 || messages.length > 30) {
      return res.status(400).json({ error: 'Invalid messages' });
    }

    const cleaned = messages.map((m) => ({
      role: ['system', 'user', 'assistant'].includes(m?.role) ? m.role : 'user',
      content: String(m?.content ?? '').slice(0, 12000)
    }));

    const totalChars = cleaned.reduce((sum, m) => sum + m.content.length, 0);
    if (totalChars > 50000) {
      return res.status(413).json({ error: 'Request too large' });
    }

    if (!process.env.DEEPSEEK_API_KEY) {
      return res.status(500).json({ error: 'DEEPSEEK_API_KEY is not configured' });
    }

    const upstream = await fetch('https://api.deepseek.com/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.DEEPSEEK_API_KEY}`
      },
      body: JSON.stringify({
        model: 'deepseek-chat',
        messages: cleaned,
        temperature: 0.4,
        max_tokens: 2000,
        stream: false
      })
    });

    const data = await upstream.json();
    if (!upstream.ok) {
      return res.status(upstream.status).json({
        error: data?.error?.message || data?.error || 'DeepSeek request failed'
      });
    }

    return res.status(200).json(data);
  } catch (error) {
    console.error('[deepseek-chat]', error);
    return res.status(500).json({ error: error?.message || 'Internal server error' });
  }
}
