import React,{Component,useState,setState,useEffect,refetch} from 'react';
import Table from './components/Table';
import {FINDMOVIENAME,MOVIES,FINDRATING,ADDMOVIE,FINDPARTIALNAME} from './Graphql';
import { useQuery,useMutation } from "@apollo/react-hooks";
import { isCompositeType, parse } from 'graphql';
import MovieStyle from './Movie.css'

function Movie(){//Table컴포넌트를 호출하여 출력하고 출력된 값들로 검색을 함
    const [name,setName]=useState("");//검색결과 저장하는 변수
    const [data,setData]=useState("");//화면에 출력할 데이터들 저장
    const[moviename,setMovieName]=useState(true);
    const[movierating,setMovieRating]=useState(true);
    const [radioinfo,setRadioInfo]=useState('');
    const [addMovieInfo,setaddMovieInfo]=useState({
        id:'',
        name:'',
        rating:'',
    })


    const showAllMovies=useQuery(MOVIES);//모든 영화정보 조회
    const showSameMovies=useQuery(FINDPARTIALNAME,{variables:{name: name}});//검색한 영화제목 조회
    const findRating=useQuery(FINDRATING,{variables:{rating: parseFloat(name)}});//검색한 영화등급 조회
    const [addMovie]=useMutation(ADDMOVIE,{variables: { id:addMovieInfo.add_id,name:addMovieInfo.name,rating:addMovieInfo.rating }})//영화 추가
    
    
    const columns=["id","name","rating"];
    const onClick=()=>{//검색 버튼 누를 시 refetch로 재조회
        if(radioinfo=='moviename'){
            setMovieName(!moviename)//검색창에 단어를 넣기만하면 자동으로 로드되서 자동 refetch실행되고 useEffect까지 실행됨 -->검색누를때마다 moviename변수를 변동시켜 useEffect에서 재조회 시킴
            showSameMovies.refetch(FINDPARTIALNAME,{variables: { name: name }})
        }else if(radioinfo=='movierating'){
            setMovieRating(!movierating)
            if(name!=""){findRating.refetch(FINDRATING,{variables: { rating: parseFloat(name)}})}
            else{
                console.log('null')
            }
        }
    }
    const onChange=(e)=>{//검색창에 적는 값이 그대로 적히게 함
       
        setName(e.target.value);
    }
    
    const handleRadioChange=(e)=>{//누른 라디오 버튼 값 저장
       
            setRadioInfo(e.target.value);
            
    }

    //각 []에 들어있는 값이 변동되면 실행됨
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
                setData(showSameMovies.data);
                
        }
    
    }
    },[moviename])

    useEffect(()=>{
        if(name===""){
            if(showAllMovies.loading === false && showAllMovies.data){
                setData(showAllMovies.data);
            }
        }else{
            
            if(findRating.loading === false && findRating.data){
                setData(findRating.data);
                
        }
    }
    },[movierating])

//조회된 값이 저장된 data변수를 Table 컴포넌트에 전달해 테이블 형식으로 화면에 출력함
  if(showAllMovies.loading){
        return <p>Loading...</p>
    }else if(showAllMovies.error){
        return <p>error!</p>
    }else{
        return(
            <div>
         <Table columns={columns} data={data}/>
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