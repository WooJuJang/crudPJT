import ModalStyle from './Modal.css'
import React,{Component,useState,setState,useEffect,refetch} from 'react';
import {ADDMOVIE,FINDBYID,UPDATEMOVIE,DELETEMOVIE} from '../Graphql';
import { useQuery,useMutation } from "@apollo/react-hooks";

    const Modal=(props)=>{
        const {open,close,header,data,modifyOpen}=props;
        const [modifyMovieInfo,setModifyMovieInfo]=useState({
            id:'0',
            name:'test',
            rating:'0',
        })
       
        const [addMovieInfo,setaddMovieInfo]=useState({
            id:'',
            name:'',
            rating:'',
        })


     
        useEffect(()=>{
            setModifyMovieInfo(data?.findById)
        },[data])

        const [addMovie]=useMutation(ADDMOVIE,{variables: { id:addMovieInfo.id,name:addMovieInfo.name,rating:addMovieInfo.rating }})
        const [updateMovie]=useMutation(UPDATEMOVIE,{variables: { id:0,rating:0}})
        const [deleteMovie]=useMutation(DELETEMOVIE,{variables:{id:0}})

        const onChangeAddMovie=(e)=>{
        if(e.target.name==="id"){
            console.log(e.target.value)
            return setaddMovieInfo(addMovieInfo=>({...addMovieInfo,id:e.target.value}))
           
            
        }else if(e.target.name==="name"){
            return setaddMovieInfo(addMovieInfo=>({...addMovieInfo,name:e.target.value}))
        }else{
            return setaddMovieInfo(addMovieInfo=>({...addMovieInfo,rating:e.target.value }))
        }
        }

        const onChangeModify=(e)=>{
                return setModifyMovieInfo(modifyMovieInfo=>({...modifyMovieInfo,rating:e.target.value }))
                
            
            }
    
        const handleSubmit=async(e)=>{
        e.preventDefault(); 
        console.log(e.target.name)
        console.log('submit')
        addMovie({variables:{id:parseInt(addMovieInfo.id),name:addMovieInfo.name,rating:parseFloat(addMovieInfo.rating)}}).then(close()).then(window.location.reload())
        }
        const handleModify=async(e)=>{
            e.preventDefault(); 
            console.log(e.target.name)
            console.log('modify')
            updateMovie({variables:{id:parseInt(modifyMovieInfo.id),rating:parseFloat(modifyMovieInfo.rating)}}).then(close()).then(window.location.reload())
            }
        const onHandleDelete=async(e)=>{
            e.preventDefault();
            deleteMovie({variables:{id:parseInt(modifyMovieInfo.id)}}).then(close()).then(window.location.reload())
            
        }

        return (
            <div className={open?'openModal modal':' modal'}>
                {modifyOpen ?
                    <section>
                        <header>
                            {header}
                            <button className="close" onClick={close}>&times;</button>
                        </header>
                            <main>
                            <form>
                    <br/>
                    <div className="inputgroup">
                        {modifyMovieInfo?
                        <div>
                        <input type="text" value={modifyMovieInfo.id} name="id" placeholder="id" readOnly="readonly"/>
                        <br/>
                        <input type="text" value={modifyMovieInfo.name} name="name" placeholder="name" readOnly="readonly" />
                        <br/>
                        <input type="text" value={modifyMovieInfo.rating} name="rating" placeholder="rating" onChange={onChangeModify}/>
                        <br/>
                        </div>:null}
                    
                    <footer>
                        <button  type="submit" onClick={handleModify}>Modify</button> 
                        <button  type="button" onClick={onHandleDelete}>Delete</button> 
                        <button className="close" onClick={close}>close</button>
                    </footer>
                    </div>
                    </form>
                    </main>  
                    </section>
                :
                <section>
                <header>
                    {header}
                    <button className="close" onClick={close}>&times;</button>
                    </header>
                    <main>
                    <form >
                   
                      <div className="inputgroup">
                 
                    
                    <input type="text" value={addMovieInfo.id} name="id" placeholder="id" onChange={onChangeAddMovie}/>
                    <br/>
                 
                    <input type="text" value={addMovieInfo.name} name="name" placeholder="name" onChange={onChangeAddMovie}/>
                    <br/>
                  
                    <input type="text" value={addMovieInfo.rating} name="rating" placeholder="rating" onChange={onChangeAddMovie}/>
                    <br/>
                   
                    <footer>
                    
                        <button className="close" onClick={handleSubmit}>Add</button>
                        <button className="close" onClick={close}>Close</button>
                    
                    </footer>
                    </div>
                    </form>
                    </main>
                </section>}
    
            </div>
            )


        // //데이터 추가 및 수정 기능 작업중
        // return (
        // <div className={open?'openModal modal':' modal'}>
        //     {modifyOpen ?
        //         <section>
        //             <header>
        //                 {header}
        //                 <button className="close" onClick={close}>&times;</button>
        //             </header>
        //                 <main>
        //                 <form onSubmit={handleModify}>
        //         <br/>
        //         <div>
        //             {modifyMovieInfo?
        //             <div>
        //             <input type="text" value={modifyMovieInfo.id} name="id" placeholder="id" />
        //             <br/>
        //             <input type="text" value={modifyMovieInfo.name} name="name" placeholder="name" onChange={onChangeModify}/>
        //             <br/>
        //             <input type="text" value={modifyMovieInfo.rating} name="rating" placeholder="rating" onChange={onChangeModify}/>
        //             <br/>
        //             </div>:null}



        //     </div>
                
          
           
        //                 <footer>
        //                <button  type="submit">수정</button> 
        //                 <button type="button" onClick={onHandleDelete}>삭제</button> 
        //                 <button className="close" onClick={close}>close</button>
        //                 </footer>
        //                 </form>
        //                 </main>
                      
                            
                        
        //         </section>
        //     :null}

        // </div>
        // )

        // //데이터 추가하는 부분(기능완성)
        // return (
        //     <div className={open?'openModal modal':' modal'}>
        //         {open ?
        //             <section>
        //                 <header>
        //                     {header}
        //                     <button className="close" onClick={close}>&times;</button>
        //                 </header>
        //                     <main>
        //                     <form onSubmit={handleSubmit}>
        //             <br/>


        //             <div>       
        //                 <input type="text" value={addMovieInfo.id} name="id" placeholder="id" onChange={onChangeAddMovie}/>
        //                 <br/>
        //                 <input type="text" value={addMovieInfo.name} name="name" placeholder="name" onChange={onChangeAddMovie}/>
        //                 <br/>
        //                 <input type="text" value={addMovieInfo.rating} name="rating" placeholder="rating" onChange={onChangeAddMovie}/>
        //                 <br/>
        //             </div> 
        //                     <footer>
        //                     <div>
        //                         <button type="submit">추가</button>
        //                     <button className="close" onClick={close}>close</button>
        //                     </div>
        //                     </footer>
        //                     </form>
        //                     </main>
        //             </section>
        //         :null}
    
        //     </div>
        //     )





        }
export default Modal