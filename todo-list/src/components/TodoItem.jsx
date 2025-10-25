import React, { useState } from 'react'
import '../styles/TodoItem.css'
import { useDispatch, useSelector } from 'react-redux'
import { deleteTodo, updateTodo } from '../redux/todoSlice';


function TodoItem( {todo} ) {
  const dispatch = useDispatch();

  const [isEditing, setIsEditing] = useState(false);
  const [updatedText, setUpdatedText] = useState(todo.text);

  const saveEditedTodo = () => {
    if (updatedText.trim() === '') {
      return;
    } else {
      dispatch(updateTodo({ id: todo.id, newText: updatedText}));
      setIsEditing(false)
    }
  }

  return (
    <ul className='todoUl'>
      {
        isEditing ? (
          <li className='todoItem'>
            <input type='text' value={updatedText} onChange={(e) => setUpdatedText(e.target.value)} className='editInput' onKeyDown={(e) => {if (e.key === 'Enter') {saveEditedTodo()}}}/>
            <div className='buttons'>
              <button onClick={() => setIsEditing(false)} className='cancelBtn'>Cancel</button>
              <button onClick={saveEditedTodo} className='saveBtn'>Save</button>
              <button onClick={() => dispatch(deleteTodo(todo.id))} className='deleteBtn'>Delete</button>
            </div>
          </li>
        ) : (
          <li className='todoItem'>
            <span className='todoText'>{todo.text}</span>
            <div className='buttons'>
              <button onClick={() => setIsEditing(true)} className='editBtn'>Edit</button>
              <button onClick={() => dispatch(deleteTodo(todo.id))} className='deleteBtn'>Delete</button>
            </div>
          </li>
        )
      }
    </ul>
  )
}

export default TodoItem