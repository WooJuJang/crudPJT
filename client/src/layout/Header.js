import React, { useState } from 'react'
import headerstyle from './Header.css';
import Modal from './Modal';
function Header(){
    const[modalOpen,setModalOpen]=useState(false);

    const openModal=()=>{
      setModalOpen(true)
      console.log(modalOpen)
    }
    const closeModal=()=>{
      setModalOpen(false)
      console.log(modalOpen)
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