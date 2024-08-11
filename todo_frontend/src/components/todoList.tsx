import React, { useEffect, useState } from "react";
import axios from 'axios';
import TodoItem from './TodoItem';
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
      await axios.delete(`http://localhost:3000/todos/${id}`)
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
            <TodoItem todo={todo} onTodoUpdated={fetchTodos} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoList;