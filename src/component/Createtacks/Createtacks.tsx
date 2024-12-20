import React, { useState } from 'react';
import './modal.css';

interface TaskModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (title: string, description: string) => void;
}

const TaskModal: React.FC<TaskModalProps> = ({ isOpen, onClose, onSubmit }) => {
  const [taskName, setTaskName] = useState('');
  const [taskDescription, setTaskDescription] = useState('');

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTaskName(e.target.value);
  };

  const handleDescriptionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setTaskDescription(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(taskName, taskDescription);
    setTaskName('');
    setTaskDescription('');
    onClose();
  };

  const handleModalClose = () => {
    setTaskName('');
    setTaskDescription('');
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="modal">
      <div className="modal-content">
        <h2>Створити задачу</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label>Назва задачі</label>
            <input
              type="text"
              value={taskName}
              onChange={handleNameChange}
              placeholder="Введіть назву задачі"
              required
            />
          </div>
          <div>
            <label>Опис задачі</label>
            <textarea
              value={taskDescription}
              onChange={handleDescriptionChange}
              placeholder="Введіть опис задачі"
              required
            />
          </div>
          <div className="modal-buttons">
            <button type="submit">Створити задачу</button>
            <button type="button" onClick={handleModalClose}>Закрити</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TaskModal;
