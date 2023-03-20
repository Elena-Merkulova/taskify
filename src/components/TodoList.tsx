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
    <div className='todos'>
      {todos.map((todo) => (
        <SingleTodo todo={todo} key={todo.id} todosDispatch={todosDispatch} />
      ))}
    </div>
  )
}

export default TodoList
