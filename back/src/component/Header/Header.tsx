// src/components/Header.tsx
import React, { useState } from 'react';
import './header.css';  // Для стилів


interface HeaderProps {
  onSearch: (query: string) => void;
  onAddTask: () => void;
}

const Header: React.FC<HeaderProps> = ({ onSearch, onAddTask }) => {
  const [searchQuery, setSearchQuery] = useState('');
 
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    onSearch(e.target.value);
  };

  return (
    <header className="header">
      <div className="logo">TaskBoard</div>
      <div className="search-bar">
        <input 
          type="text" 
          placeholder="Пошук задач..." 
          value={searchQuery}
          onChange={handleSearchChange} 
        />
      </div>
      <div className="actions">
        <button className="add-task-button" onClick={onAddTask}>
          +
        </button>
        <div className="user-icon">
          <img src="https://www.w3schools.com/w3images/avatar2.png" alt="User" />
        </div>
      </div>

    </header>
  );
};

export default Header;
