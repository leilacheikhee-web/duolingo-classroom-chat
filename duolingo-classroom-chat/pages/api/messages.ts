import type { NextApiRequest, NextApiResponse } from 'next';
import { CreateMessageSchema } from '../../schemas/messageSchema';
import { ChatMessage } from '../../types/message';
import { filterContent } from '../../utils/contentFilter';
const messages: ChatMessage[] = [
  { id: '1', authorId: 'teacher-001', courseId: 'Spanish', content: 'Bienvenidos a la clase!', isFlagged: false, createdAt: Date.now() - 60000 },
  { id: '2', authorId: 'student-001', courseId: 'French', content: 'Bonjour! I am learning French!', isFlagged: false, createdAt: Date.now() - 30000 },
];
export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') return res.status(200).json(messages);
  if (req.method === 'POST') {
    const result = CreateMessageSchema.safeParse(req.body);
    if (!result.success) return res.status(400).json({ error: result.error.errors[0].message });
    const filterResult = filterContent(result.data.content);
    const newMessage: ChatMessage = { id: Date.now().toString(), ...result.data, isFlagged: !filterResult.isSafe, createdAt: Date.now() };
    messages.push(newMessage);
    return res.status(201).json(newMessage);
  }
  return res.status(405).json({ error: 'Method not allowed' });
}
