import React, { useState } from 'react'
import headerstyle from './Header.css';
import Modal from '../components/Modal';
function Header(){
    const[modalOpen,setModalOpen]=useState(false);

    const openModal=()=>{
      setModalOpen(true)
    }
    const closeModal=()=>{
      setModalOpen(false)
    }
    return (
        <div className="headermain">
            <button onClick={openModal} className='addBtn'>Add</button>
            <Modal open={modalOpen} close={closeModal} header="Modal heading" data="" modifyOpen={false} className="modal">
        modal
      </Modal>

           BOADER

        </div>
    )
}
export default Header