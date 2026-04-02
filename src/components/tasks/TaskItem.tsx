import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { useStore, type Task } from '../../store/useStore';
import { Check, GripVertical, Trash2 } from 'lucide-react';
import clsx from 'clsx';
import './Tasks.css';

interface Props {
  task: Task;
}

export function TaskItem({ task }: Props) {
  const { toggleTaskComplete, deleteTask } = useStore();
  const { 
    attributes, listeners, setNodeRef, transform, transition, isDragging 
  } = useSortable({ id: task.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div 
      ref={setNodeRef} 
      style={style} 
      className={clsx('task-item', { 'is-dragging': isDragging })}
    >
      <div className="task-grip" {...attributes} {...listeners}>
        <GripVertical size={20} />
      </div>
      
      <div 
        className={clsx('task-checkbox', { completed: task.completed })}
        onClick={() => toggleTaskComplete(task.id)}
      >
        {task.completed && <Check size={16} strokeWidth={3} />}
      </div>

      <div className="task-content">
        <h3 className={clsx({ completed: task.completed })}>{task.title}</h3>
      </div>

      <button className="task-delete" onClick={() => deleteTask(task.id)}>
        <Trash2 size={18} />
      </button>
    </div>
  );
}
