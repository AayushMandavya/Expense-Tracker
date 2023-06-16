import React, { useState } from 'react'
import Modal from './modal'


export default function ListItem({expenses,getData,getTotal}) {
  const [showModal,setShowModal]=useState(false)

  

  const deleteTrans = async()=>{
    try {
      const response=await fetch(`http://localhost:8000/transactions/${expenses.id}`,{
        method:'DELETE'
      })
      if(response.status===200){
        getData()
      }
    } catch (err) {
      console.log(err)
    }
  }
  return (<>
  
   <div>

   
    <li className='list-item'>
      <div className='list-container'>
      
      <p className='list-title'>
        {expenses.title}
        
      </p>
      <p className='list-note'>
      {expenses.note}
      </p>
      <p className='list-amt'>
        {expenses.amount}
      </p>
     
      </div>
      <div className='button-container'>
        <button className='edit' onClick={()=>setShowModal(true)}>EDIT</button>
        <button className='delete'onClick={deleteTrans}>DELETE</button>
      </div>
      {showModal && <Modal mode={'edit'} setShowModal={setShowModal} getData={getData}expenses={expenses}/>}
      </li>
      </div>
      </>
  )
}
