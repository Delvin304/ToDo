import { useState } from 'react';
import { useStore } from '../../store/useStore';
import { Plus } from 'lucide-react';
import './Tasks.css';

export function TaskInput() {
  const [title, setTitle] = useState('');
  const addTask = useStore((state) => state.addTask);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;
    
    addTask({
      title: title.trim(),
      completed: false,
      priority: 'medium'
    });
    setTitle('');
  };

  return (
    <form className="task-input-form" onSubmit={handleSubmit}>
      <input 
        type="text" 
        placeholder="Add a new task..." 
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <button type="submit" className="primary">
        <Plus size={20} />
      </button>
    </form>
  );
}
