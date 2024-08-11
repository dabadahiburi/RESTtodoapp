import React, { useState } from 'react';
import axios from "axios";

interface TodoFormProps{
  onTodoCreated: () => void;
}

const TodoForm: React.FC<TodoFormProps> = ({ onTodoCreated }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      await axios.post(`${process.env.REACT_APP_API_URL}/todos`, {
        title,
        description,
        completed: false,
      });
      setTitle('');
      setDescription('');
      onTodoCreated();
    } catch (error) {
      // console.error('Error creating todo:', error);
      setError('Todoの作成に失敗しました。もう一度作成してください');
    }
  };
  return (
    <form onSubmit={handleSubmit}>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <div>
        <label htmlFor="title">Title:</label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </div>
      <div>
        <label htmlFor="description">Description:</label>
        <input
          type="text"
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
      </div>
      <button type="submit">Add Todo</button>
    </form>
  );
};

export default TodoForm;