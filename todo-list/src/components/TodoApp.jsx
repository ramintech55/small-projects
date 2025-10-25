import { useEffect, useState } from 'react'
import TodoInput from './TodoInput'
import TodoList from './TodoList'
import '../styles/TodoApp.css'
import { useSelector } from 'react-redux'

function TodoApp() {

    const { todos } = useSelector(state => state.todos);

    useEffect(() => {
      localStorage.setItem('todos', JSON.stringify(todos))
    }, [todos]);

  return (
    <div className='todoAppDiv'>
        <TodoInput/>
        <TodoList todos={todos}/>
    </div>
  )
}

export default TodoApp