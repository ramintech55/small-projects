import React, { useState } from 'react'
import '../styles/TodoInput.css'
import { useDispatch } from 'react-redux'
import { addTodo } from '../redux/todoSlice';

function TodoInput() {
    const dispatch = useDispatch();
    const [text, setText] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (text.trim() === '') {
            return
        } else {
            dispatch(addTodo(text));
            setText('');
        }
    }
  return (
    <div className='formDiv'>
        <form onSubmit={handleSubmit}>
            <input type='text' value={text} onChange={(e) => setText(e.target.value)} className='todoInput' placeholder='Write plan...'/>
            <button type='submit' className='addBtn'>Add</button>
        </form>
    </div>
  )
}

export default TodoInput