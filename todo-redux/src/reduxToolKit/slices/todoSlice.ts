import { createSlice } from "@reduxjs/toolkit";
import { TodoState } from "../../utility/types";


const initialState: TodoState = {
    todos: [],
};

const todoSlice = createSlice({
    name: "todo",
    initialState,
    reducers: {
        addTodo(state, action) {
            state.todos.push(action.payload)
        },
        deleteTodo(state, action) {
            state.todos.splice(action.payload, 1)
        },
        updateStatus(state, action) {
            const id = action.payload;
            state.todos = state.todos.map((item) => {
                if (id === item.id) {
                    item.isDone = !item.isDone;
                    item.detail[0].updated = new Date().toLocaleDateString();
                    item.detail[0].updatedTime = new Date().toLocaleTimeString();
                }
                return item;
            });
        },
    }
});

export const { addTodo, deleteTodo, updateStatus } = todoSlice.actions
export default todoSlice.reducer;
