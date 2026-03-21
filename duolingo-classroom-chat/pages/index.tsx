import { useState, useEffect } from 'react';
import { ChatMessage as ChatMessageType } from '../types/message';
import { CreateMessageFormData } from '../schemas/messageSchema';
import ChatMessageComponent from '../components/ChatMessage';
import ChatForm from '../components/ChatForm';
export default function Home() {
  const [messages, setMessages] = useState<ChatMessageType[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    fetch('/api/messages').then(res => res.json()).then(data => { setMessages(data); setLoading(false); }).catch(() => setLoading(false));
  }, []);
  const handleSendMessage = async (data: CreateMessageFormData) => {
    setError(null);
    const res = await fetch('/api/messages', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data) });
    const result = await res.json();
    if (!res.ok) setError(result.error);
    else setMessages(prev => [...prev, result]);
  };
  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-blue-50">
      <header className="bg-white shadow-sm py-4 px-6 flex items-center gap-3">
        <span className="text-3xl">🦜</span>
        <div>
          <h1 className="text-2xl font-bold text-green-600">Duolingo Classroom Chat</h1>
          <p className="text-sm text-gray-500">Type-Safe Educational Platform</p>
        </div>
        <a href="/dashboard" className="ml-auto bg-green-500 text-white px-4 py-2 rounded-xl text-sm font-bold hover:bg-green-600">Dashboard</a>
      </header>
      <div className="max-w-2xl mx-auto p-6">
        <div className="bg-blue-50 border border-blue-200 rounded-2xl p-4 mb-6">
          <h2 className="font-bold text-blue-700 mb-2">Type-Safe Features Active</h2>
          <div className="grid grid-cols-2 gap-2 text-sm text-blue-600">
            <div>✅ TypeScript strict mode</div>
            <div>✅ Zod runtime validation</div>
            <div>✅ Content filtering</div>
            <div>✅ React Hook Form</div>
          </div>
        </div>
        <div className="bg-gray-50 rounded-2xl p-4 mb-4 min-h-64 max-h-96 overflow-y-auto">
          <h2 className="font-bold text-gray-700 mb-3">Classroom Messages</h2>
          {loading && <p className="text-gray-400 text-center">Loading...</p>}
          {messages.map(msg => <ChatMessageComponent key={msg.id} message={msg} />)}
        </div>
        {error && <div className="bg-red-50 border border-red-300 rounded-xl p-3 mb-4"><p className="text-red-600 text-sm font-semibold">{error}</p></div>}
        <ChatForm onSubmit={handleSendMessage} />
        <div className="mt-4 bg-yellow-50 border border-yellow-200 rounded-2xl p-4 text-sm">
          <h3 className="font-bold text-yellow-700 mb-2">Test Content Filtering:</h3>
          <code className="bg-yellow-100 px-2 py-1 rounded text-xs block mt-1">spam, hack, cheat, inappropriate, badword</code>
        </div>
      </div>
    </div>
  );
}
