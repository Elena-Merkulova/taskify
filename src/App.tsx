import { useState, useReducer, useEffect } from 'react'
import './App.css'
import InputField from './components/InputField'
import TodoList from './components/TodoList'
import { appStateReducer } from './model'
import { Todo } from './model'
import { DragDropContext, DropResult } from 'react-beautiful-dnd'

const App: React.FC = () => {
  const [todo, setTodo] = useState<string>('')

  const [todosState, dispatch] = useReducer(appStateReducer, [], init)

  const [completedTodos, setCompletedTodos] = useState<Todo[]>([])

  function init() {
    let preloadedState = localStorage.getItem('todos')
    if (preloadedState) {
      return JSON.parse(preloadedState)
    } else {
      return []
    }
  }

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todosState))
  }, [todosState])

  const onDragEnd = (result: DropResult) => {
    const { source, destination } = result
    if (!destination) return

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    )
      return

      let add, active = todosState,
      complete = completedTodos

      if(source.droppableId === 'TodosList') {
        add = active[source.index]
        active.splice(source.index, 1)
      } else {
        add = complete[source.index];
        complete.splice(source.index, 1)
      }

      if(destination.droppableId === "TodosList") {
        active.splice(destination.index, 0, add)
      } else {
        complete.splice(destination.index, 0, add)
      }

      setCompletedTodos(complete)
      dispatch(active)
  }

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className='App'>
        <span className='heading'>Taskify</span>
        <InputField todo={todo} setTodo={setTodo} todosDispatch={dispatch} />
        <TodoList
          todos={todosState}
          todosDispatch={dispatch}
          completedTodos={completedTodos}
          setCompletedTodos={setCompletedTodos}
        />
      </div>
    </DragDropContext>
  )
}

export default App
