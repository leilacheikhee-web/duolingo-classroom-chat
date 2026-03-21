import { useState, useEffect } from 'react';
import { ChatMessage } from '../types/message';
import { isChatMessage } from '../utils/typeGuards';
import { CourseType } from '../types/message';
const COURSES: CourseType[] = ['Spanish','French','Japanese','German','Italian','Portuguese','Dutch','Russian','Chinese','Korean'];
export default function Dashboard() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  useEffect(() => {
    fetch('/api/messages').then(res => res.json()).then(data => setMessages(data.filter(isChatMessage)));
  }, []);
  const flagged = messages.filter(m => m.isFlagged);
  const safe = messages.filter(m => !m.isFlagged);
  const byCourse = COURSES.map(course => ({ course, count: messages.filter(m => m.courseId === course).length })).filter(c => c.count > 0);
  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-blue-50">
      <header className="bg-white shadow-sm py-4 px-6 flex items-center gap-3">
        <span className="text-3xl">🦜</span>
        <h1 className="text-2xl font-bold text-green-600">Moderation Dashboard</h1>
        <a href="/" className="ml-auto bg-green-500 text-white px-4 py-2 rounded-xl text-sm font-bold hover:bg-green-600">← Chat</a>
      </header>
      <div className="max-w-4xl mx-auto p-6">
        <div className="grid grid-cols-3 gap-4 mb-6">
          <div className="bg-white rounded-2xl p-4 shadow text-center"><p className="text-3xl font-bold text-green-600">{messages.length}</p><p className="text-sm text-gray-500">Total Messages</p></div>
          <div className="bg-white rounded-2xl p-4 shadow text-center"><p className="text-3xl font-bold text-blue-500">{safe.length}</p><p className="text-sm text-gray-500">Safe Messages</p></div>
          <div className="bg-white rounded-2xl p-4 shadow text-center"><p className="text-3xl font-bold text-red-500">{flagged.length}</p><p className="text-sm text-gray-500">Flagged Messages</p></div>
        </div>
        <div className="bg-white rounded-2xl p-4 shadow mb-6">
          <h2 className="font-bold text-gray-700 mb-3">Messages by Course</h2>
          {byCourse.map(({ course, count }) => (
            <div key={course} className="flex items-center gap-2 mb-2">
              <span className="text-sm w-24 text-gray-600">{course}</span>
              <div className="flex-1 bg-gray-100 rounded-full h-4"><div className="bg-green-400 h-4 rounded-full" style={{ width: `${(count / messages.length) * 100}%` }}/></div>
              <span className="text-sm text-gray-500">{count}</span>
            </div>
          ))}
        </div>
        {flagged.length > 0 && (
          <div className="bg-red-50 border border-red-200 rounded-2xl p-4 mb-6">
            <h2 className="font-bold text-red-700 mb-3">Flagged Messages</h2>
            {flagged.map(msg => (
              <div key={msg.id} className="bg-white border border-red-200 rounded-xl p-3 mb-2">
                <p className="text-sm text-gray-700">{msg.content}</p>
                <p className="text-xs text-red-500 mt-1">Course: {msg.courseId}</p>
              </div>
            ))}
          </div>
        )}
        <div className="bg-blue-50 border border-blue-200 rounded-2xl p-4">
          <h2 className="font-bold text-blue-700 mb-3">TypeScript Features Used</h2>
          <div className="grid grid-cols-2 gap-2 text-sm text-blue-600">
            <div>✅ Generic types (MessageMetadata)</div>
            <div>✅ Utility types (Omit, Partial)</div>
            <div>✅ Type guards (isChatMessage)</div>
            <div>✅ Conditional types (FilterRoles)</div>
            <div>✅ Zod schema validation</div>
            <div>✅ Union types (UserRole, CourseType)</div>
          </div>
        </div>
      </div>
    </div>
  );
}
