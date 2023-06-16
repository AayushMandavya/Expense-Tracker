import React, { useState } from 'react'
import Modal from './modal'
import { useCookies } from 'react-cookie'
export default function ListHeader({listName,getData}) {
 
 const[cookies,setCookie,removeCookie]=useCookies(null)
  const signOut =()=>{
    console.log('signout')
    removeCookie('Email')
    removeCookie('AuthToken')
    window.location.reload()

  }
  const[showModal,setShowModal]= useState(false)
  return (
    <div className='list-header'>
     
       <h1> {listName}</h1>
       <div className='button-container'>
        <button className='create' onClick={()=>setShowModal(true)}>Add new</button>
        <button className='signout' onClick={signOut}>Sign Out</button>

       </div>
      
     {showModal &&  <Modal mode={'create'}getData={getData} setShowModal={setShowModal}/>}
    </div>
  )
}
