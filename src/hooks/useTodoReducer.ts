import { useReducer } from "react"
import { Todo } from "../model"

export type Action =
| {
    type: 'add'
    payload: string
}
| {
    type: 'remove'
    payload: number
}
|{
   type: 'done'
   payload: number  
}
| {
    type: 'edit'
    payloadId: number
    payloadContent: string
}
| {
    type: 'move_todos'
    payload: Todo[]
}

const appStateReducer = (state: Todo[], action: Action): Todo[] => {
    switch (action.type) {
        case 'add': 
            return [
                ...state,
                { id: Date.now(), todo: action.payload, isDone: false }
            ]
            
        case 'remove': 
            return state.filter(todo => todo.id !== action.payload)
        
        case 'done': 
            return state.map(todo => todo.id === action.payload ? {...todo, isDone: !todo.isDone
            }: todo)

        case 'edit': 
            return state.map(todo => todo.id === action.payloadId ? {...todo, todo: action.payloadContent} : todo) 
            
        case 'move_todos':
            return action.payload    
        
        default: 
            return state
        
    }
}

const useTodoReducer = (initialTodos: Todo[]) => {
    const [todos, setTodos] = useReducer(appStateReducer, initialTodos, init)
    return {todos, setTodos}
}

function init() {
    let preloadedState = localStorage.getItem('todos')
    if (preloadedState) {
      return JSON.parse(preloadedState)
    } else {
      return []
    }
  }

//   useEffect(() => {
//     localStorage.setItem('todos', JSON.stringify(todos))
//   }, [todos])

export default useTodoReducer