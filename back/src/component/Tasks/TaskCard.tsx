import React from 'react';
import { Task } from './type.task';

interface TaskCardProps {
  task: Task;
  onMoveTask: (id: number, newStatus: 'task' | 'in-progress' | 'done') => void;
  onDeleteTask: (id: number) => void;
}

const TaskCard: React.FC<TaskCardProps> = ({ task, onMoveTask, onDeleteTask }) => {
  const handleMove = (newStatus: 'task' | 'in-progress' | 'done') => {
    if (task.status !== newStatus) {
      onMoveTask(task.id, newStatus);
    }
  };

  const handleDelete = () => {
    onDeleteTask(task.id);
  };

  return (
    <div className="task-card">
      <h3>{task.title}</h3>
      <p>{task.description}</p>
      <div className="buttons">
        {task.status !== 'task' && (
          <button onClick={() => handleMove('task')}>Назад до задач</button>
        )}
        {task.status !== 'in-progress' && (
          <button onClick={() => handleMove('in-progress')}>В процесі</button>
        )}
        {task.status !== 'done' && (
          <button onClick={() => handleMove('done')}>Завершено</button>
        )}
        <button onClick={handleDelete} className="delete-button">Видалити</button>
      </div>
    </div>
  );
};

export default TaskCard;
