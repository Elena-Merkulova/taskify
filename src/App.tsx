import { useState, useReducer, useEffect } from 'react'
import './App.css'
import InputField from './components/InputField'
import TodoList from './components/TodoList'
import { appStateReducer } from './model'
import { Todo } from './model'

const App: React.FC = () => {
  const [todo, setTodo] = useState<string>('')

  const [todosState, dispatch] = useReducer(appStateReducer, [] , init )

  function init() {
    let preloadedState = localStorage.getItem('todos')
    if (preloadedState) {
      return JSON.parse(preloadedState)
    } else {
      return []
    }
  }

  useEffect(()=>{
    localStorage.setItem('todos', JSON.stringify(todosState))
  }, [todosState])

  return (
    <div className='App'>
      <span className='heading'>Taskify</span>
      <InputField todo={todo} setTodo={setTodo} todosDispatch={dispatch} />
      <TodoList
        todos={todosState}
        todosDispatch={dispatch}
      />
    </div>
  )
}

export default App
