import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { Button, TextField } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import "../styles/todo.css"
import { addTodo } from '../reduxToolKit/slices/todoSlice';
import { ITodo } from '../utility/types';
import TodoList from './TodoList';
import { Link } from 'react-router-dom';

const Todo = () => {
    const [todo, setTodo] = useState("");
    const dispatch = useDispatch();

    const data: ITodo = {
        id: new Date().getTime(),
        todo,
        isDone: false,
        detail: [{
            created: new Date().toLocaleDateString(),
            createdTime: new Date().toLocaleTimeString(),
            updated: null,
            updatedTime: null
        }]
    }
    const handleAddTodo = () => {
        dispatch(addTodo(data));
        setTodo("")
    }

    return (
        <div>
            <h1>Todo List</h1>
            <div className="todo_input">
                <TextField
                    id="filled-basic"
                    label="Add New Todo"
                    variant="filled"
                    value={todo}
                    onChange={(e) => setTodo(e.target.value)}
                    sx={{
                        backgroundColor: "#fff",
                        color: "#fff",
                        width: "350px",
                        borderRadius: "5px",
                        border: "1px solid #fff"
                    }}
                />
                <Button
                    variant="contained"
                    startIcon={<AddIcon />}
                    onClick={() => handleAddTodo()}
                    sx={{ marginLeft: "5px" }}
                >
                    Add Todo
                </Button>
                <Link to={"/users"}>
                    <Button variant="contained" sx={{ height: "60px", ml: "10px" }}>
                        Redux-saga
                    </Button>
                </Link>
            </div>
            <TodoList />
        </div>
    )
}

export default Todo
