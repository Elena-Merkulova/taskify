import React from 'react'
import { Todo, Action } from '../model'
import SingleTodo from './SingleTodo'
import './styles.css'

interface Props {
  todos: Todo[]
  todosDispatch: React.Dispatch<Action>
}

const TodoList: React.FC<Props> = ({ todos, todosDispatch }) => {
  return (
    <div className="container">
      <div className="todos">
        <span className="todos__heading">Active Tasks</span>
       
      {todos.map((todo) => (
        <SingleTodo todo={todo} key={todo.id} todosDispatch={todosDispatch} />
      ))}
    
      </div>
      <div className="todos remove">
        <span className="todos__heading">Completed Tasks</span>
        {todos.map((todo) => (
        <SingleTodo todo={todo} key={todo.id} todosDispatch={todosDispatch} />
      ))}
      </div>
    </div>
  )
}

export default TodoList
