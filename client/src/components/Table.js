import React,{useState,useEffect} from 'react';
import tablestyle from './Table.css'
import Modal from './Modal';
import {ADDMOVIE,FINDBYID} from '../Graphql';
import { useQuery } from '@apollo/react-hooks';
import ReactPaginate from 'react-paginate';

function Table({columns,data}) {
    const[modalOpen,setModalOpen]=useState(false);//모달창이 열고 닫힘을 저장함
    const[beforedata,setBeforeData]=useState("0");//
    const[afterdata,setAfterData]=useState();

    const findById=useQuery(FINDBYID,{variables:{id: parseInt(beforedata)}})

    const openModal=(e)=>{//모달 창 활성화
      setModalOpen(true)
      setBeforeData(e.target.getAttribute('data-item'))//수정버튼을 누른 같은 row에 있는 id값 저장
      findById.refetch(FINDBYID,{variables:{id:parseInt(beforedata)}});//id값으로 데이터 조회

    }
    const closeModal=()=>{
        setModalOpen(false)
    }

    useEffect(()=>{
        setAfterData(findById.data)//id값으로 조회된 데이터를 모달창에 넘겨줄 변수값에 저장
    },[findById.data])

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
                {data.findPartialName && data.findPartialName.map(({id,name,rating})=>(//data.findPartialName 의 값이 아직 서버로부터 넘어오지 못했었기 때문에 빈 값을 render 안에서 설정해줌 
                    <tr key={id+name+rating} className="common-table-row">
                        <td className="common-table-column" data-item={id} >{id}</td>
                        <td className="common-table-column" data-item={id}>{name}</td>
                        <td className="common-table-column" data-item={id}>{rating}</td>
                        <td className="modifyBtn" data-item={id} onClick={openModal}>수정</td>
                    </tr>
                ))}
                {data.findRating && data.findRating.map(({id,name,rating})=>(//data.findRating 의 값이 아직 서버로부터 넘어오지 못했었기 때문에 빈 값을 render 안에서 설정해줌 
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