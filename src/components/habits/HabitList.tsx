import { useStore } from '../../store/useStore';
import { HabitItem } from './HabitItem';
import './Habits.css';

export function HabitList() {
  const habits = useStore((state) => state.habits);

  if (habits.length === 0) {
    return <div className="empty-state">No habits set up. Start building positive streaks!</div>;
  }

  return (
    <div className="habit-list">
      {habits.map(habit => (
        <HabitItem key={habit.id} habit={habit} />
      ))}
    </div>
  );
}
