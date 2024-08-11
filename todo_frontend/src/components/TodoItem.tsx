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

  const handleSave = async () => {
    try {
      await axios.put(`http://localhost:3000/todos/${todo.id}`, {
        title,
        description,
        completed,
      });
      setIsEditing(false);
      onTodoUpdated();
    } catch (error) {
      console.error('Error updating todo:', error);
    }
  };

  return (
    <div>
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
        </div>
      ) : (
        <div>
          <h3>{todo.title}</h3>
          <p>{todo.description}</p>
          <p>{todo.completed ? 'Done' : 'Pending'}</p>
          <button onClick={() => setIsEditing(true)}>Edit</button>
        </div>
      )}
    </div>
  );
};
export default TodoItem