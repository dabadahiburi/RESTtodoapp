import React from 'react'

interface TodoFilterProps{
  filter: string;
  setFilter: (filter: string) => void;
}

const TodoFilter: React.FC<TodoFilterProps> = ({ filter, setFilter }) => {
  return (
    <div>
      <button onClick={() => setFilter('all')} disabled={filter === 'all'}>
        All
      </button>
      <button onClick={() => setFilter('completed')} disabled={filter === 'completed'}>
        Completed
      </button>
      <button onClick={() => setFilter('pending')} disabled={filter === 'pending'}>
        Pending
      </button>
    </div>
  );
};

export default TodoFilter;