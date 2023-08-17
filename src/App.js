import React, { Component } from 'react'
import Navbar from './components/Navbar';
import News from './components/News';
import Home from './components/Home';

import {
  BrowserRouter as Router,
  Route,
  Routes
} from "react-router-dom";
import Tech from './components/Tech';
import Bbc from './components/Bbc';
import Sources from './components/Sources';


function App() {

  return (
    <>
      <Router>
        <Navbar />
        <Routes>
        <Route exact path='/' element={<Home pageSize={6} country="in" category='general' />}></Route>
        <Route exact path='/home' element={<Home key="general" pageSize={6} country="in" category='general' />}></Route>
        <Route exact path='/business' element={<Home key = 'business'  pageSize={6} category='business' />}></Route>
        <Route exact path='/entertainment' element={<Home key = 'entertainment' pageSize={6} category='entertainment' />}></Route>
        <Route exact path='/general' element={<Home key = 'general'  pageSize={6} category='general' />}></Route>
        <Route exact path='/health' element={<Home key = 'health'  pageSize={6} category  = "health" />}></Route>
        <Route exact path='/science' element={<Home key = 'science'  pageSize={6} category="science" />}></Route>
        <Route exact path='/technology' element={<Home key = 'technology'  pageSize={6} category="technology" />}></Route>
        <Route exact path='/sports' element={<Home key = 'sports'  pageSize={6} category="sports" />}></Route>

        <Route exact path='/bbc' element={<Bbc />}></Route>
        <Route exact path='/sources' element={<Sources />}></Route>
        <Route exact path='/bitcoin' element={<News/>}></Route>
   
        <Route path='/tech' element={<Tech/>}></Route>
      
        </Routes>
      
      </Router>

    </>
  );
}

export default App;
//Before using router - npm i react-router-dom