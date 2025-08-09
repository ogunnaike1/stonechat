import { useState } from 'react'
import reactLogo from './assets/react.svg'
import { Routes, Route } from 'react-router-dom';
import viteLogo from '/vite.svg'
import SignUp from './pages/Signup';
import ForgotPasswordForm from './pages/Forgotpassword';
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    
<div >
  <Routes>  
    <Route path="/" element={<SignUp/>}/>
    <Route path="/forget-password" element={<ForgotPasswordForm email={''} onSetEmail={function (event: React.ChangeEvent<HTMLInputElement>): void {
          throw new Error('Function not implemented.');
        } } onClick={function (): void {
          throw new Error('Function not implemented.');
        } }/>}/>
  </Routes>
</div>
  
  )
}

export default App
