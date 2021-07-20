import React,{useState,useEffect} from 'react';
import tablestyle from './Table.css'
import Modal from './Modal';
import {ADDMOVIE,FINDBYID} from '../Graphql';
import { useQuery } from '@apollo/react-hooks';
import ReactPaginate from 'react-paginate';

function Table({columns,data}) {
    const[modalOpen,setModalOpen]=useState(false);
    const[beforedata,setBeforeData]=useState("0");
    const[afterdata,setAfterData]=useState();

    const findById=useQuery(FINDBYID,{variables:{id: parseInt(beforedata)}})

    const openModal=(e)=>{
       setModalOpen(true)
      setBeforeData(e.target.getAttribute('data-item'))
      
      findById.refetch(FINDBYID,{variables:{id:parseInt(beforedata)}});

    }
    useEffect(()=>{
        setAfterData(findById.data)
        
        //console.log(afterdata.rating)
    },[findById.data])

    const closeModal=()=>{
        setModalOpen(false)
        console.log({data})
    }
    return(
        <table className="common-table">
            <thead className="common-table-header-column">
                <tr >
                    {columns.map((column)=>(
                        <th key={column}>{column}</th>
                    ))}
                </tr>
            </thead>
            <Modal  className='modal' open={modalOpen} close={closeModal} header="Modify heading" data={afterdata} modifyOpen={true}>
                    modal
                    </Modal>
            <tbody>
                {data.movies && data.movies.map(({id,name,rating})=>(//data.movies 의 값이 아직 서버로부터 넘어오지 못했었기 때문에 빈 값을 render 안에서 설정해줌 
                    <tr key={id+name+rating} className="common-table-row" >
                    <td className="common-table-column" >{id}</td>
                    <td className="common-table-column" >{name}</td>
                    <td className="common-table-column" >{rating}</td>
                    <td className="modifyBtn" data-item={id} onClick={openModal}>수정</td>
                </tr>
                ))}
                {data.findPartialName && data.findPartialName.map(({id,name,rating})=>(//data.movies 의 값이 아직 서버로부터 넘어오지 못했었기 때문에 빈 값을 render 안에서 설정해줌 
                    <tr key={id+name+rating} className="common-table-row">
                        <td className="common-table-column" data-item={id} >{id}</td>
                        <td className="common-table-column" data-item={id}>{name}</td>
                        <td className="common-table-column" data-item={id}>{rating}</td>
                        <td className="modifyBtn" data-item={id} onClick={openModal}>수정</td>
                    </tr>
                ))}
                {data.findRating && data.findRating.map(({id,name,rating})=>(//data.movies 의 값이 아직 서버로부터 넘어오지 못했었기 때문에 빈 값을 render 안에서 설정해줌 
                    <tr key={id+name+rating} className="common-table-row" >
                        <td className="common-table-column" data-item={id}>{id}</td>
                        <td className="common-table-column" data-item={id}>{name}</td>
                        <td className="common-table-column" data-item={id}>{rating}</td>
                        <td className="modifyBtn" data-item={id} onClick={openModal}>수정</td>
                    </tr>
                ))}
            </tbody>
        </table>

    )
}

export default Table;