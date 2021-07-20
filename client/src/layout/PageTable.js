import React,{useState,useEffect, useLayoutEffect} from 'react';
import tablestyle from './Table.css'
import Modal from './Modal';
import {ADDMOVIE,FINDBYID} from '../Graphql';
import { useQuery } from '@apollo/react-hooks';
import ReactPaginate from 'react-paginate';
import PageTableStyle from './PageTable.css';

function Table({columns,data}) {
    const[modalOpen,setModalOpen]=useState(false);
    const[beforedata,setBeforeData]=useState("0");
    const[afterdata,setAfterData]=useState();

    const [pageInfo,setPageInfo]=useState({
        offset:0,
        tableData:[],
        orgtableData:[],
        perPage:3,//각페이지에 나올 갯수들
        currentPage:0
    })
    const onHandlePageClick=(e)=>{
        const selectedPage=e.selected
        console.log(typeof pageInfo.perPage)
        const offset=selectedPage*pageInfo.perPage
        //setPageInfo({currentPage:selectedPage},{offset:offset})
        console.log(offset)

        
    }
    useEffect(()=>{
        loadMoreData();
    },[pageInfo.currentPage,pageInfo.offset])

    const loadMoreData=()=>{
        console.log('aaaa')
    }
    //console.log(data.movies.slice(0, 3))

    // const onHandlePageClick=(e)=>{
    //     const selectedPage=e.selected;
    //     const offset=selectedPage*perPage;

    // }
    //console.log(data.slice(2));
    
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
        <div>
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

            </tbody>
        </table>
                 <ReactPaginate
                 previousLabel={"prev"}
                 nextLabel={"next"}
                 breakLabel={"..."}
                 breakClassName={"break-me"}
                 //pageCount={this.state.pageCount}
                 marginPagesDisplayed={3}
                 pageRangeDisplayed={5}
                 onPageChange={onHandlePageClick}
                 containerClassName={"pagination"}
                 subContainerClassName={"pages pagination"}
                 activeClassName={"active"}/>
         </div>
    )
}

export default Table;