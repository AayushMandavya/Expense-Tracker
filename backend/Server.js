
const express = require('express')
const app = express()
require("dotenv").config()
const pool = require('./db')
const cors = require('cors')
const {v4:uuidv4}= require('uuid')
const bcrypt = require('bcrypt')
const jwt =require('jsonwebtoken')


app.use(cors())
app.use(express.json())
app.get('/transactions/:userEmail',async(req,res)=>{

  const {userEmail}= req.params


  try {
   const expenses= await pool.query('SELECT * FROM transactions WHERE user_email=$1',[userEmail])
    res.json(expenses.rows)
  } catch (error) {
    console.log(error)
  }
})

//create 
app.post('/transactions',async(req,res)=>{
  const{title,note,user_email,amount} =req.body
  const id=uuidv4()

  try {
  const newTrans=await  pool.query(`INSERT INTO transactions(id,user_email,title,note,amount) VALUES($1,$2,$3,$4,$5)`,[id,user_email,title,note,amount])
  res.json(newTrans)
  } catch (err) {
    console.log(err)
  }
})

//edit
app.put('/transactions/:id',async(req,res)=>{
  const {id}= req.params
  console.log(id)
  
  const{title,note,user_email,amount} =req.body

  try {
   const editTrans=await pool.query('UPDATE transactions SET title=$1,note=$2,user_email=$3,amount=$4 WHERE id=$5;',[title,note,user_email,amount,id])
   res.json({editTrans:editTrans,status:200})
  } catch (err) {
  console.log(err)    
  }
})

//delete
app.delete('/transactions/:id',async(req,res)=>{
  const {id}= req.params
  console.log(id)
  try {
 const deleteTrans= await pool.query('DELETE FROM transactions WHERE id = $1',[id])
    res.json(deleteTrans)
  } catch (err) {
    console.log(err)
  }
})


//signup
app.post('/signup',async(req,res)=>{
  const{email,password}=req.body
  const salt=bcrypt.genSaltSync(10)
  
  const hashedPassword =bcrypt.hashSync(password,salt)
  try {
    const signUp=await pool.query(`INSERT INTO users (email,hashed_password) VALUES($1,$2)`,
    [email,hashedPassword])
    const token=jwt.sign({email},'secret',{expiresIn:'1hr'})

    res.json({email,token})
  } catch (err) {
    console.log(err)
    if(err){
      res.json({detail:err.detail})
    }
  }
})

//login
app.post('/login',async(req,res)=>{
  const{email,password}=req.body
console.log(email,password)
  try {
  const users=await pool.query('SELECT * FROM users WHERE email=$1',
  [email])    
  if(!users.rows.length) return res.json({detail:'User doesnt Exist!'})
   const success =await bcrypt.compare(password,users.rows[0].hashed_password)
   const token=jwt.sign({email},'secret',{expiresIn:'1hr'})

   if(success){
    res.json({
      'email':users.rows[0].email,
       token
    })
   }else{
    res.json({
      detail:"login failed"
    })
   }
  } catch (err) {
    console.log(err)
  }
})


app.listen(process.env.PORT, () =>
  console.log("Server is listening at port " + process.env.PORT)
);