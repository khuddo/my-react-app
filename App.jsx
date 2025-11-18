import React from 'react'
import UserComponent from './UserComponent'

export default function App(){
  return (
    <div style={{fontFamily: 'system-ui, sans-serif', padding: 24}}>
      <h1>React JSX Starter</h1>
      <p>Replace <code>src/UserComponent.jsx</code> with your JSX.</p>
      <hr />
      <UserComponent />
    </div>
  )
}