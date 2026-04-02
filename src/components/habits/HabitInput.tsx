import { useState } from 'react';
import { useStore } from '../../store/useStore';
import { Plus } from 'lucide-react';
import './Habits.css';

export function HabitInput() {
  const [title, setTitle] = useState('');
  const addHabit = useStore((state) => state.addHabit);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;
    
    addHabit({
      title: title.trim(),
      frequency: 'daily'
    });
    setTitle('');
  };

  return (
    <form className="habit-input-form" onSubmit={handleSubmit}>
      <input 
        type="text" 
        placeholder="Create a new daily habit..." 
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <button type="submit" className="primary">
        <Plus size={20} />
      </button>
    </form>
  );
}
