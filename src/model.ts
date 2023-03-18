export interface Todo {
    id: number
    todo: string
    isDone: boolean
}

export type Action =
| {
    type: 'add'
    payload: String
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

export const appStateReducer = (state: Todo[], action: Action): Todo[] => {
    switch (action.type) {
        case 'add': 
            return [
                ...state,
                { id: Date.now(), todo: action.payload, isDone: false }
            ]
            
        case 'remove': 
            return state.filter(todo => todo.id !== action.payload)
        
        case 'done': 
            return state.map((todo) => todo.id !== action.payload ? {...todo, isDone: !todo.isDone
            }: todo)

        case 'edit': 
            return state.map(todo => todo.id === action.payloadId ? {...todo, todo: action.payloadContent} : todo)    
        
        default: 
            return state
        
    }
}