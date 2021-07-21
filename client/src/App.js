import React, { useState } from 'react'
import "./App.css"

import Movie from './Movie';
import Header from './layout/Header';
import Layout from './layout/Layout';
import Footer from './layout/Footer';


function App(){
  return(
    <div>
      <Layout>
      <Header/>
      </Layout>
      <Movie/>
      <Footer/>
    </div>
  )
}
export default App;