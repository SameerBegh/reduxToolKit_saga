import './App.css';
import { Routes, Route } from "react-router-dom";
import Todo from './components/Todo';
import User from './components/User';


function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<Todo />} />
        <Route path='/users' element={<User />} />
      </Routes>
    </div>
  );
}

export default App;
