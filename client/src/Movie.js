import React,{Component,useState,setState,useEffect,refetch} from 'react';
import Table from './layout/Table';
import {FINDMOVIENAME,MOVIES,FINDRATING,ADDMOVIE,FINDPARTIALNAME} from './Graphql';
import { useQuery,useMutation } from "@apollo/react-hooks";
import { isCompositeType, parse } from 'graphql';
import PageTable from './layout/PageTable';

function Movie(){
     const [name,setName]=useState("");
     const showAllMovies=useQuery(MOVIES);
     const [data,setData]=useState("");

    const[moviename,setMovieName]=useState(true);
    const[movierating,setMovieRating]=useState(true);

    //const showSameMovies=useQuery(FINDMOVIENAME,{variables:{name: name}});
    const showSameMovies=useQuery(FINDPARTIALNAME,{variables:{name: name}});

    const findRating=useQuery(FINDRATING,{variables:{rating: parseFloat(name)}});
    
    const columns=["id","name","rating"];
    const onClick=()=>{
        console.log(radioinfo)
        if(radioinfo=='moviename'){
            setMovieName(!moviename)
            //showSameMovies.refetch(FINDMOVIENAME,{variables: { name: name }})
            showSameMovies.refetch(FINDPARTIALNAME,{variables: { name: name }})
        }else if(radioinfo=='movierating'){
            setMovieRating(!movierating)
            if(name!=""){findRating.refetch(FINDRATING,{variables: { rating: parseFloat(name)}})}
            else{
                console.log('null')
            }
            // if(name!=""){
            // findRating.refetch(FINDRATING,{variables: { rating: parseFloat(name)}})
            // }else{
            //     showAllMovies.refetch(MOVIES);
            // }
        }
    }
    const onChange=(e)=>{
       
        setName(e.target.value);
    }
    const [radioinfo,setRadioInfo]=useState('');
    const handleRadioChange=(e)=>{
       
            setRadioInfo(e.target.value);
            
    }
    useEffect(()=>{
        if(showAllMovies.loading === false && showAllMovies.data){
            setData(showAllMovies.data);
           
        }
     },[showAllMovies.data])

    useEffect(()=>{
        if(name===""){
            if(showAllMovies.loading === false && showAllMovies.data){
                setData(showAllMovies.data);
            }
            
        }else{

            if(showSameMovies.loading === false && showSameMovies.data){
                console.log('a')
                setData(showSameMovies.data);
                
        }
    
    }
    },[moviename])

    useEffect(()=>{
        if(name===""){
            if(showAllMovies.loading === false && showAllMovies.data){
                console.log('aaaaa')
                setData(showAllMovies.data);
            }
        }else{
            
            if(findRating.loading === false && findRating.data){
                setData(findRating.data);
                
        }
    }
    },[movierating])





    
  const [addMovieInfo,setaddMovieInfo]=useState({
        id:'',
        name:'',
        rating:'',
  })

    const [addMovie]=useMutation(ADDMOVIE,{variables: { id:addMovieInfo.add_id,name:addMovieInfo.name,rating:addMovieInfo.rating }})


  if(showAllMovies.loading){
        return <p>Loading...</p>
    }else if(showAllMovies.error){
        return <p>error!</p>
    }else{
        return(
            <div>
         <Table columns={columns} data={data}/>
          {/* <PageTable columns={columns} data={data}/> */}
                <div className="searchboxlayout">
                    <label>
                    <input type='radio' value="moviename" checked={radioinfo==='moviename'}
                    onChange={handleRadioChange}/>
                    영화제목</label>
                    <label>
                    <input type='radio' value="movierating" checked={radioinfo==='movierating'}
                    onChange={handleRadioChange}/>
                    영화등급</label>
                    <br/>
                    <input type="text" name="id" value={name} placeholder="Search..." 
                    className="searchbox" onChange={onChange}/>
                    <button onClick={onClick}>검색</button>
            </div>
            </div>
        )
    }




}
export default Movie;