import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { CreateMessageSchema, CreateMessageFormData } from '../schemas/messageSchema';
import { CourseType } from '../types/message';
interface Props { onSubmit: (data: CreateMessageFormData) => void; }
const COURSES: CourseType[] = ['Spanish','French','Japanese','German','Italian','Portuguese','Dutch','Russian','Chinese','Korean'];
export default function ChatForm({ onSubmit }: Props) {
  const { register, handleSubmit, reset, formState: { errors } } = useForm<CreateMessageFormData>({
    resolver: zodResolver(CreateMessageSchema),
    defaultValues: { courseId: 'Spanish', authorId: 'student-001' }
  });
  const handleFormSubmit = (data: CreateMessageFormData) => {
    onSubmit(data);
    reset({ courseId: data.courseId, authorId: data.authorId, content: '' });
  };
  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="bg-white rounded-2xl p-4 shadow border border-gray-200">
      <div className="mb-3">
        <label className="block text-sm font-semibold text-gray-600 mb-1">Course</label>
        <select {...register('courseId')} className="w-full border border-gray-300 rounded-lg p-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-400">
          {COURSES.map(c => <option key={c} value={c}>{c}</option>)}
        </select>
      </div>
      <div className="mb-3">
        <label className="block text-sm font-semibold text-gray-600 mb-1">Message</label>
        <textarea {...register('content')} placeholder="Type your message... (try 'spam' to test filtering)" className="w-full border border-gray-300 rounded-lg p-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-400 resize-none" rows={3}/>
        {errors.content && <p className="text-red-500 text-xs mt-1">{errors.content.message}</p>}
      </div>
      <input type="hidden" {...register('authorId')} />
      <button type="submit" className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-xl transition-colors">Send Message</button>
    </form>
  );
}
