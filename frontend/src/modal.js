import React from 'react'
import { useState } from 'react'
import { useCookies } from 'react-cookie'

const Modal=({mode,setShowModal,getData,expenses})=> {
 
  const editMode = mode==='edit' ? true:false
  const [cookies,setCookie,removeCookie]=useCookies(null)
  const [data,setData]=useState({
     user_email:editMode?expenses.user_email :cookies.Email,
    title:editMode?expenses.title:null,
    note:editMode?expenses.note:null,
    amount:editMode? expenses.amount :null

  })

  const postData=async(e)=>{
    e.preventDefault()
    try {
     const response= await fetch('http://localhost:8000/transactions',{
        method:"POST",
        headers:{'Content-Type':'application/json'},
        body:JSON.stringify(data)
      })
        if(response.status===200){
          console.log('worked')
          setShowModal(false)
          getData()
        }
    } catch (error) {
      console.log("error")
    }
  }

  const editData = async(e)=>{
    console.log("button cliked")
    e.preventDefault()
    try {
   const response=await fetch(`http://localhost:8000/transactions/${expenses.id}`,{
        method:'PUT',
        headers:{'Content-Type':'application/json'},
        body:JSON.stringify(data)
      })
      if(response.status===200){
        console.log('worked')
        
        setShowModal(false)
        getData()
      }
    } catch (err) {
      console.log(err)
    }
  }


  const handleChange=(e)=>{
  
    const{name,value}=e.target

    setData(data=>({
      ...data,
      [name]:value
    }))

    console.log(data)
  }
  return (
    <div className='modal-overlay'>
      <div className='modal'>

        <div className='form-title-container'> 
          <h3>
            Let's {mode} your expense
          </h3>
          <button onClick={()=>setShowModal(false)}>x</button>
        </div>
        <form>
          <input
          type='text'
          required
          placeholder='transaction title'
          name="title"
          value={data.title}
          onChange={handleChange}
          />
          <input
          type='text'
          required
          placeholder='transaction note'
          name="note"
          value={data.note}
          onChange={handleChange}
          />
          <input
          type='number'
          required
          placeholder='transaction amount'
          name="amount"
          value={data.amount}
          onChange={handleChange}
          />
         
          <input className={mode} type="submit" onClick={editMode?editData:postData}/>

        </form>
        </div>

        </div>
  )
}

export default Modal;