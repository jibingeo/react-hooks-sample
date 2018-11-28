import React, {
  useState,
  useEffect,
} from 'react';
import { StoreProvider, createStore, useStore, useAction } from 'easy-peasy';

const store = createStore({
  todos: {
    items: ['Install easy-peasy', 'Build app', 'Profit'],
    add: (state, payload) => {
      state.items.push(payload) // 👈 you mutate state to update (we convert
    }                           //    to immutable updates)
  }                             //
}); 

function App() {
  const [count, setCount] = useState(0);
  const todos = useStore(state => state.todos.items)
  const add = useAction(dispatch => dispatch.todos.add)

  useEffect(() => {
    console.log("hello")
    return () => {
      console.log("bye")
    }
  }, [count])

  return (
    <div>
      <button onClick={ (e) => setCount(count + 1) } >
        { count } { 'inc' }
      </button>
      <button onClick={ () => add(count) }>
        {'Add'}
      </button> 
      {todos.map((todo, idx) => <div key={idx}>{todo}</div>)}
    </div>
  )
}

function MainApp() {
  return (
    <StoreProvider store={store}>
      <App />
    </StoreProvider>
  )
}

export default MainApp;
