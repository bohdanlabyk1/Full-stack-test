// src/App.tsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AuthForm from './component/AuthForm/Authform';
import TaskBoard from './component/Tasks/TaskBoard';


const App: React.FC = () => {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<AuthForm />} />
        <Route path="/tasks" element={<TaskBoard />} />
      </Routes>
    </Router>
  );
};

export default App;

