import React,{useState} from 'react';
import './App.css';
import TodoList from './components/todoList';
import TodoForm from './components/TodoForm';

const App: React.FC = () => {
  const [reload, setReload] = useState(false);

  const handleTodoCreated = () => {
    setReload(!reload); // ToDo作成後にリロードフラグを切り替え
  };

  return (
    <div>
      <TodoForm onTodoCreated={handleTodoCreated} />
      {/* reloadを文字列に変換 */}
      <TodoList key={reload.toString()} />
      
    </div>
  );
};

export default App;
