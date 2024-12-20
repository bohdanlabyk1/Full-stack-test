import React, { useState, useEffect } from 'react';
import './taskboard.css';
import { Task } from './type.task';
import TaskCard from './TaskCard';
import Header from './../Header/Header';
import TaskModal from './../Createtacks/Createtacks';
import { getTasks, addTask, deleteTask } from './../api/api';  // Importing the API functions
import PaymentPage from './../playment/playment'

const TaskBoard: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isPaymentOpen, setIsPaymentOpen] = useState(false); // State to manage payment modal visibility

  useEffect(() => {
    const fetchTasks = async () => {
      const tasksFromServer = await getTasks();  // Fetch tasks using the API
      setTasks(tasksFromServer);
    };

    fetchTasks();
  }, []);

  const moveTask = (id: number, newStatus: 'task' | 'in-progress' | 'done') => {
    setTasks(tasks.map(task => (task.id === id ? { ...task, status: newStatus } : task)));
  };

  const handleAddTask = async (title: string, description: string) => {
    if (tasks.length >= 2) { // Check if the user has created 2 tasks
      setIsPaymentOpen(true); // Open the payment modal
      return;
    }

    const newTask = await addTask({ title, description });  // Add task using the API
    setTasks([...tasks, newTask]);
  };

  const handleDeleteTask = async (id: number) => {
    await deleteTask(id);  // Delete task using the API
    setTasks(tasks.filter(task => task.id !== id));
  };

  const handlePaymentSuccess = () => {
    // Payment was successful, allow the user to add tasks again
    setIsPaymentOpen(false);
    setIsModalOpen(true);  // Open the task creation modal
  };

  return (
    <div>
      <Header onSearch={() => {}} onAddTask={() => setIsModalOpen(true)} />
      <div className="task-board">
        {['task', 'in-progress', 'done'].map(status => (
          <div key={status} className="task-column-container">
            <h2>
              {status === 'task' ? 'Задача' : status === 'in-progress' ? 'В процесі' : 'Завершено'}
            </h2>
            {tasks.filter(task => task.status === status).map(task => (
              <TaskCard key={task.id} task={task} onMoveTask={moveTask} onDeleteTask={handleDeleteTask} />
            ))}
          </div>
        ))}
      </div>

      <TaskModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleAddTask}
      />

      {isPaymentOpen && <PaymentPage onPaymentSuccess={handlePaymentSuccess} />}  {/* Pass success handler */}
    </div>
  );
};

export default TaskBoard;
