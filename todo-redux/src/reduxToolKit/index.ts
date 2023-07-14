import createSagaMiddleare from "redux-saga";
import { configureStore } from "@reduxjs/toolkit";
import todoSlice from "./slices/todoSlice";
import userSlice from "./slices/userSlice";
import userSaga from "./saga/userSaga";


const saga = createSagaMiddleare();

const store = configureStore({
    reducer: {
        todos: todoSlice,
        users: userSlice
    },
    middleware: [saga]
});
saga.run(userSaga);
export type RootState = ReturnType<typeof store.getState>
export default store; 