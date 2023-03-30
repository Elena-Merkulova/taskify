import { useState } from 'react'
import './App.css'
import InputField from './components/InputField'
import TodoList from './components/TodoList'
import useTodoReducer from './hooks/useTodoReducer'
import { DragDropContext, DropResult } from 'react-beautiful-dnd'

const App: React.FC = () => {
  const [todo, setTodo] = useState<string>('')

  const {todos, setTodos} = useTodoReducer([])

  const {todos: completedTodos, setTodos: setCompletedTodos} = useTodoReducer([])

  const onDragEnd = (result: DropResult) => {
    const { source, destination } = result
    if (!destination) {
      return
    } 

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return
    }

      let add
      let active = todos
      let complete = completedTodos
      //Source logic
      if(source.droppableId === 'TodosList') {
        add = active[source.index]
        active.splice(source.index, 1)
      } else {
        add = complete[source.index];
        complete.splice(source.index, 1)
      }
      //Destination logic
      if(destination.droppableId === "TodosList") {
        active.splice(destination.index, 0, add)
      } else {
        complete.splice(destination.index, 0, add)
      }

      setCompletedTodos({type: 'move_todos', payload: complete})
      setTodos({ type: 'move_todos', payload: active })
  }

  const handleAdd = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (todo) {
      setTodos({
        type: 'add',
        payload: todo,
      })
      setTodo('')
    }
  }

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className='App'>
        <span className='heading'>Taskify</span>
        <InputField todo={todo} setTodo={setTodo} handleAdd={handleAdd} />
        <TodoList
          todos={todos}
          setTodos={setTodos}
          completedTodos={completedTodos}
          setCompletedTodos={setCompletedTodos}
        />
      </div>
    </DragDropContext>
  )
}

export default App
