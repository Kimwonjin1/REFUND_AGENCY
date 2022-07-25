import React, {useContext} from "react";
import Navbar from './components/Navbar/Navbar'
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import './App.css'
import { GlobalState } from "./GlobalState";
import Home from './components/pages/Home'
import AboutUs from './components/pages/AboutUs'
import Review from './components/pages/Review'
import Login from './components/auth/Login'
import Register from './components/auth/Register'
import Consulting from './components/pages/Consulting'
import CreateCard from './components/CreateProduct/CreateProduct'
import Categories from './components/Categories/Categories'
import GlobalStyle from './GlobalStyle';  
import CardDetail from '../src/components/CardDetail/CardDetail'

function App() {
  const state = useContext(GlobalState)
  const [isLogged] = state.userAPI.isLogged
  const [isAdmin] = state.userAPI.isAdmin

 

  return (
    <>
    
    <Router>
    <div className="App">
    <GlobalStyle/>
      <Navbar/>
      <Routes>
      <Route path='/' exact element={<Home/>} />
        <Route path='/aboutus' exact element={<AboutUs/>} />
        <Route path='/detail/:id' exact element={<CardDetail/>} />  
        <Route path='/review' exact element={<Review/>} />
        <Route path='/consulting' exact element={<Consulting/>} />
        <Route path='/login' exact element={<Login/>} />
        <Route path='/register' exact element={<Register/>} />
        <Route path='/category' exact element={<Categories/>} />
        <Route path='/createproduct' exact element={<CreateCard/>}/>
        <Route path='/edit_product/:id' exact element={<CreateCard/>}/>
      </Routes>
      </div>
    </Router>
   
  </>
  )
}

export default App;
