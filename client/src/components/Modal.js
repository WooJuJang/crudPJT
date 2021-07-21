import ModalStyle from '../components/Modal.css'
import React,{Component,useState,setState,useEffect,refetch} from 'react';
import {ADDMOVIE,FINDBYID,UPDATEMOVIE,DELETEMOVIE} from '../Graphql';
import { useQuery,useMutation } from "@apollo/react-hooks";

    const Modal=(props)=>{
        const {open,close,header,data,modifyOpen}=props;
        const [modifyMovieInfo,setModifyMovieInfo]=useState({//수정 모달창에 전달할 정보
            id:'0',
            name:'test',
            rating:'0',
        })
       
        const [addMovieInfo,setaddMovieInfo]=useState({//추가 모달창에서 입력된 값들 저장할 변수
            id:'',
            name:'',
            rating:'',
        })

        //추가,수정,삭제 쿼리 선언
        const [addMovie]=useMutation(ADDMOVIE,{variables: { id:addMovieInfo.id,name:addMovieInfo.name,rating:addMovieInfo.rating }})
        const [updateMovie]=useMutation(UPDATEMOVIE,{variables: { id:0,rating:0}})
        const [deleteMovie]=useMutation(DELETEMOVIE,{variables:{id:0}})

        useEffect(()=>{//row행에 있는 값 전달받아 저장
            setModifyMovieInfo(data?.findById)
        },[data])

        //Add 모달창에서 입력받은 값 저장
        const onChangeAddMovie=(e)=>{
            if(e.target.name==="id"){
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
            
        //Add,Modify,Delete 버튼 눌렀을때 이벤트
        const handleSubmit=async(e)=>{
            e.preventDefault(); 
            addMovie({variables:{id:parseInt(addMovieInfo.id),name:addMovieInfo.name,rating:parseFloat(addMovieInfo.rating)}}).then(close()).then(window.location.reload())
        }
        const handleModify=async(e)=>{
            e.preventDefault(); 
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

        }
export default Modal