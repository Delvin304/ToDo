import { HabitInput } from '../components/habits/HabitInput';
import { HabitList } from '../components/habits/HabitList';

export function Habits() {
  return (
    <div className="page-container">
      <header className="page-header">
        <h1>Habits</h1>
        <p className="subtitle">Build streaks and track daily routines</p>
      </header>
      <div className="habits-content">
        <HabitInput />
        <HabitList />
      </div>
    </div>
  );
}
