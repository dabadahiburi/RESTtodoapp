import React, { useEffect, useState } from "react";
import axios from 'axios';
import TodoItem from './TodoItem';
import TodoFilter from "./TodoFilter";
interface Todo{
  id: number;
  title: string;
  description: string;
  completed: boolean;
}

const TodoList: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filter, setFilter] = useState<string>('all');
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchTodos();
  }, []);


  const fetchTodos = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/todos`);
      setTodos(response.data);
    } catch (error) {
      // console.error('Error fetchiong todos:', error);
      setError('Todoの取得に失敗しました。ページを再度更新してください')
    }
  };
  //TodoItemに記載を移管
  // const handleDelete = async (id: number) => {
  //   try {
  //     await axios.delete(`http://localhost:3000/todos/${id}`)
  //     fetchTodos();
  //   } catch (error) {
  //     console.error('Error deleting todo:', error)
  //   };
  // };
  const filteredTodos = todos.filter(todo => {
    if (filter === 'completed') {
      return todo.completed;
    } else if (filter === 'pending') {
      return !todo.completed;
    } else {
      return true;
    }
  });

  return (
    <div>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <h1>Todo List</h1>
      <TodoFilter filter={filter} setFilter={setFilter} />
      <ul>
        {filteredTodos.map(todo => (
          <li key={todo.id}>
            <TodoItem todo={todo} onTodoUpdated={fetchTodos} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoList;