import React, { useState } from 'react'
import axios from 'axios'

interface TodoItemProps{
  todo: {
    id: number;
    title: string;
    description: string;
    completed: boolean;
  };
  onTodoUpdated: () => void;
}
const TodoItem: React.FC<TodoItemProps> = ({ todo, onTodoUpdated }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(todo.title);
  const [description, setDescription] = useState(todo.description);
  const [completed, setCompleted] = useState(todo.completed);
  const [error, SetError] = useState<string | null>(null);

  const handleSave = async () => {
    try {
      await axios.put(`https://todo-app-8e04883b5e0b.herokuapp.com/${todo.id}`, {
        title,
        description,
        completed,
      });
      setIsEditing(false);
      onTodoUpdated();
    } catch (error) {
      // console.error('Error updating todo:', error);
      SetError('ToDoTaskの更新に失敗しました。再度更新してください')
    }
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`https://todo-app-8e04883b5e0b.herokuapp.com/todos/${todo.id}`);
      onTodoUpdated();
    } catch (error) {
      console.error('Error deleting todo:', error);
    }
  };


  return (
    <div>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {isEditing ? (
        <div>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <label>
            <input
              type="checkbox"
              checked={completed}
              onChange={(e) => setCompleted(e.target.checked)}
            />
            Completed
          </label>
          <button onClick={handleSave}>Save</button>
          <button onClick={handleDelete}>Delete</button>
        </div>
      ) : (
        <div>
          <h3>{todo.title}</h3>
          <p>{todo.description}</p>
          <p>{todo.completed ? 'Done' : 'Pending'}</p>
          <button onClick={() => setIsEditing(true)}>Edit</button>
          <button onClick={handleDelete}>Delete</button>
        </div>
      )}
    </div>
  );
};
export default TodoItem