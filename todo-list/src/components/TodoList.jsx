import React from 'react'
import TodoItem from './TodoItem'
import '../styles/TodoList.css'

function TodoList( {todos} ) {
  return (
    <div className='todoListDiv'>
        {
            todos.map((todo) => {
                return <TodoItem todo={todo} key={todo.id}/>
            })
        }
    </div>
  )
}

export default TodoList