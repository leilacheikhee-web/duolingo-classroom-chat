import { ChatMessage as ChatMessageType } from '../types/message';
interface Props { message: ChatMessageType; }
export default function ChatMessage({ message }: Props) {
  return (
    <div className={`p-3 rounded-xl mb-2 ${message.isFlagged ? 'bg-red-100 border border-red-300' : 'bg-white border border-gray-200'}`}>
      <div className="flex justify-between items-center mb-1">
        <span className="font-bold text-sm text-gray-700">User {message.authorId.slice(0, 6)}</span>
        <span className="text-xs bg-green-100 px-2 py-0.5 rounded-full">{message.courseId}</span>
      </div>
      <p className="text-gray-800">{message.content}</p>
      {message.isFlagged && <p className="text-xs text-red-500 mt-1">⚠️ Flagged for review</p>}
    </div>
  );
}
