import { createSlice, nanoid } from '@reduxjs/toolkit';

const getInitial = (key, defaultValue) => {
    const storedItems = localStorage.getItem(key);
    return storedItems !== null ? JSON.parse(storedItems) : defaultValue;
}

const initialState = {
    todos: getInitial('todos', []),
};

export const todoSlice = createSlice({
    name: 'todos',
    initialState,
    reducers: {
        addTodo: (state, action) => {
            state.todos.unshift({
                id: nanoid(),
                text: action.payload
            });
        },

        deleteTodo: (state, action) => {
            state.todos = state.todos.filter(todo => todo.id !== action.payload);
        },

        updateTodo: (state, action) => {
            const {id, newText} = action.payload;
            const todo = state.todos.find(todo => todo.id === id);
            if (todo) {
                todo.text = newText;
            }
        }
    }
});

export const { addTodo, deleteTodo, updateTodo } = todoSlice.actions;
export default todoSlice.reducer;