import React, { useEffect, useState } from "react";
import axios from 'axios';

interface Todo{
  id: number;
  title: string;
  description: string;
  completed: boolean;
}

const TodoList: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  
  useEffect(() => {
    fetchTodos();
  }, []);


  const fetchTodos = async () => {
    try {
      const response = await axios.get('http://localhost:3000/todos');
      setTodos(response.data);
    } catch (error) {
      console.error('Error fetchiong todos:', error);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await axios.delete(`https://localhost:3000/todos/${id}`)
      fetchTodos();
    } catch (error) {
      console.error('Error deleting todo:', error)
    }
  };
  return (
    <div>
      <h1>Todo List</h1>
      <ul>
        {todos.map(todo => (
          <li key={todo.id}>
            {todo.title} - {todo.description} - {todo.completed ? 'Done' : 'Pending'}
            <button onClick={() => handleDelete(todo.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoList;