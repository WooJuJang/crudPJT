import React from 'react';
import SearchStyle from './Search.css';
import Table from './Table';
import Movie from '../Movie';
function Search(){
    const onClick=()=>{
        alert("message");
    }
    const onKeyPress=e=>{
        if(e.key==='enter'){
            onClick();
        }
    }
    return (
        <div className="searchboxlayout">
            <input type="text" placeholder="Search..." className="searchbox" />
            <button onClick={onClick}>검색</button>

        </div>
    )
}
export default Search