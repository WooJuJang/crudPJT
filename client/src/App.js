import React, { useState } from 'react'
import "./App.css"

import Movie from './Movie';
import Header from './layout/Header';
import Layout from './layout/Layout';
import Footer from './layout/Footer';
import Search  from './layout/Search';
import Modal from './layout/Modal';
// function App(){
//   const columns=["id","name","rating"];
//   const data=new graphql();
  
  
//   return <Table columns={columns} data={data} />;
// }

// export default App

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