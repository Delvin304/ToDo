import { useStore } from '../store/useStore';
import { CheckSquare, Activity, Target } from 'lucide-react';
import { format } from 'date-fns';
import clsx from 'clsx';
import './Dashboard.css';

export function Dashboard() {
  const { tasks, habits } = useStore();
  
  const todayStr = format(new Date(), 'yyyy-MM-dd');
  
  // Task Stats
  const totalTasks = tasks.length;
  const completedTasks = tasks.filter(t => t.completed).length;
  const taskProgress = totalTasks === 0 ? 0 : Math.round((completedTasks / totalTasks) * 100);

  // Habit Stats
  const todayHabitsCompleted = habits.filter(h => h.completedDates.includes(todayStr)).length;
  const totalHabits = habits.length;

  return (
    <div className="page-container" style={{ animation: 'fadeIn 0.5s ease' }}>
      <header className="page-header">
        <h1>Dashboard</h1>
        <p className="subtitle">Overview of your productivity</p>
      </header>

      <div className="dashboard-grid">
        {/* Task Progress */}
        <div className="stat-card">
          <div className="stat-header">
            <div className="stat-icon" style={{ color: 'var(--accent-color)' }}>
              <Target size={24} />
            </div>
            <span>Daily Task Completion</span>
          </div>
          <h2 className="stat-value">{taskProgress}%</h2>
          <div className="progress-container">
            <div className="progress-fill" style={{ width: `${taskProgress}%` }} />
          </div>
          <p className="subtitle">{completedTasks} of {totalTasks} tasks completed</p>
        </div>

        {/* Habit Progress */}
        <div className="stat-card">
          <div className="stat-header">
            <div className="stat-icon" style={{ color: 'var(--success-color)' }}>
              <Activity size={24} />
            </div>
            <span>Today's Habits</span>
          </div>
          <h2 className="stat-value">{todayHabitsCompleted} / {totalHabits}</h2>
          <p className="subtitle">Habits maintained today</p>
        </div>
      </div>

      <div className="dashboard-grid" style={{ marginTop: '12px' }}>
        {/* Mini Tasks */}
        <div className="stat-card" style={{ gridColumn: 'span 1' }}>
          <h3>Recent Tasks</h3>
          <div className="mini-task-list">
            {tasks.slice(0, 5).map(task => (
              <div key={task.id} className={clsx('mini-item', { completed: task.completed })}>
                <CheckSquare size={16} className={task.completed ? 'text-muted' : 'text-accent'} />
                <h4>{task.title}</h4>
              </div>
            ))}
            {tasks.length === 0 && <p className="subtitle" style={{ padding: '8px' }}>No tasks found.</p>}
          </div>
        </div>

        {/* Mini Habits */}
        <div className="stat-card" style={{ gridColumn: 'span 1' }}>
          <h3>Habits for Today</h3>
          <div className="mini-habit-list">
            {habits.slice(0, 5).map(habit => {
              const isDone = habit.completedDates.includes(todayStr);
              return (
                <div key={habit.id} className={clsx('mini-item', { completed: isDone })}>
                  <Activity size={16} className={isDone ? 'text-success' : 'text-muted'} />
                  <h4>{habit.title}</h4>
                </div>
              );
            })}
            {habits.length === 0 && <p className="subtitle" style={{ padding: '8px' }}>No habits tracked.</p>}
          </div>
        </div>
      </div>
    </div>
  );
}
