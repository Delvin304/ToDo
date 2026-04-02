import { TaskInput } from '../components/tasks/TaskInput';
import { TaskList } from '../components/tasks/TaskList';

export function Tasks() {
  return (
    <div className="page-container">
      <header className="page-header">
        <h1>Tasks</h1>
        <p className="subtitle">Manage and organize your to-dos</p>
      </header>
      <div className="tasks-content">
        <TaskInput />
        <TaskList />
      </div>
    </div>
  );
}
