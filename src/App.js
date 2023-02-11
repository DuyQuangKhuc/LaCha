import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route  } from 'react-router-dom';

import SideBar from './components/Sidebar';
import sidebar_menu from './constants/sidebar-menu';
import {auth, google, facebook, twitter, github} from './config/fire'
import {signInWithPopup, signOut} from 'firebase/auth'
import './App.css';
import Orders from './pages/Orders';

function App () {

  const [isLogin, setIsLogin] = useState(false)
  const [user, setUser] = useState(null)
  
  const LoginFalse = () => (
    <>
      <h1>Login LaCha Garden</h1>
      <button style={{width:150, backgroundColor:'#de5246', color:'white'}}
      onClick={() => login(google)}>
        Login with Google
      </button>
      {/* <button style={{width:150, backgroundColor:'#3b5998', color:'white'}}
      onClick={() => login(facebook)}>
        Login with Facebook
      </button>
      <button style={{width:150, backgroundColor:'#00acee', color:'white'}}
      onClick={() => login(twitter)}>
        Login with Twitter
      </button>
      <button style={{width:150, backgroundColor:'black', color:'white'}}
      onClick={() => {login(github)}}>
        Login with GitHub
      </button> */}
    </>
  )
  
  const LoginTrue = () => (
    <>
      <Router>
      <div className='dashboard-container'>
        <SideBar menu={sidebar_menu} />
          
          <div className='dashboard-body'>
              <Routes>
                  <Route path="*" element={<div></div>} />
                  <Route exact path="/" element={<div></div>} />
                  <Route exact path="/orders" element={< Orders/>} />
                  <Route exact path="/locations" element={<div></div>} />
                  <Route exact path="/profile" element={<div></div>} />
              </Routes>
          </div>
      </div>
    </Router>
      <button style={{width:150}} onClick={logout}>
        Logout
      </button>
    </>
  )
  
  const login = async(provider) => {
    const result = await signInWithPopup(auth, provider) 
    setUser(result.user)
    setIsLogin(true)
    console.log(result)
  }

  const logout = async() => {
    const result = await signOut(auth)
    setUser(null)
    setIsLogin(false)
    console.log(result)
  }
  
  return (
    <div className="App">
      <header className="App-header">
        
      {isLogin && user ? <LoginTrue/> : <LoginFalse/>}

      </header>
    </div>
  );
  
}

export default App;