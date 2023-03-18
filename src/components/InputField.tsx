import React, { useRef } from 'react'
import './styles.css'
import { Action } from '../model'

interface Props {
  todo: string
  setTodo: React.Dispatch<React.SetStateAction<string>>
  todosDispatch: React.Dispatch<Action>
}

const InputField: React.FC<Props> = ({ todo, setTodo, todosDispatch }) => {
  const inputRef = useRef<HTMLInputElement>(null)

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault()

    if (todo) {
      todosDispatch({
        type: 'add',
        payload: todo,
      })
      setTodo('')
    }
  }

  return (
    <form
      className='input'
      onSubmit={(e) => {
        handleAdd(e)
        inputRef.current?.blur()
      }}
    >
      <input
        ref={inputRef}
        type='text'
        value={todo}
        onChange={(e) => setTodo(e.target.value)}
        placeholder='Enter a task'
        className='input__box'
      />
      <button type='submit' className='input__submit'>
        Go
      </button>
    </form>
  )
}

export default InputField
