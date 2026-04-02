import { useStore, type Habit } from '../../store/useStore';
import { format, subDays } from 'date-fns';
import { Trash2, Check } from 'lucide-react';
import clsx from 'clsx';
import './Habits.css';

export function HabitItem({ habit }: { habit: Habit }) {
  const { toggleHabitComplete, deleteHabit } = useStore();
  
  // Show last 7 days ending with today
  const today = new Date();
  const days = Array.from({ length: 7 })
    .map((_, i) => subDays(today, 6 - i));

  return (
    <div className="habit-item">
      <div className="habit-header">
        <h3>{habit.title}</h3>
        <button className="icon-btn" onClick={() => deleteHabit(habit.id)}>
          <Trash2 size={18} />
        </button>
      </div>
      
      <div className="habit-track-grid">
        {days.map((date, index) => {
          const dateStr = format(date, 'yyyy-MM-dd');
          const isCompleted = habit.completedDates.includes(dateStr);
          const isNotToday = index < 6;
          
          return (
            <div key={dateStr} className="habit-day">
              <span className="habit-day-label">{format(date, 'EEE')}</span>
              <div 
                className={clsx('habit-cell', { 
                  completed: isCompleted && !isNotToday,
                  'completed-old': isCompleted && isNotToday 
                })}
                onClick={() => toggleHabitComplete(habit.id, dateStr)}
              >
                {isCompleted && <Check size={20} strokeWidth={3} />}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
