
import { useEffect, useState } from "react";
import ListHeader from "./ListHeader";
import ListItem from "./ListItem";
import Auth from "./Auth";
import { useCookies } from "react-cookie";
function App() {

const[cookies,setCookie,removeCookie]=useCookies(null)
const authToken = cookies.AuthToken
  const userEmail=cookies.Email
  const [expenses,setExpenses] =useState(null)
  const getData = async()=>{
try {
  const response = await fetch(`http://localhost:8000/transactions/${userEmail}`)
  const jsonres = await response.json()
  setExpenses(jsonres)
console.log(jsonres)
} catch (error) {
  
}
  }


  useEffect(()=>
  {
    if(authToken){
      getData()
    }

  }
  ,[])
  console.log(expenses)

//sort by date
const sortedExpenses = expenses?.sort((a,b)=>new Date(a.Date)- new Date(b.Date))

const getTotal=()=>{
  console.log(expenses)
  const Amounts=expenses?.map(e=>e.amount)
  const Total= Amounts?.reduce((a,c)=>a+c,0)
  return Total
}

const calculateNegativeTotal = () => {
  const negativeAmounts = expenses?.filter(e=> e.amount < 0);
  
  const totalneg = negativeAmounts?.map(e=>e.amount)
  console.log(totalneg)
  const totalNegativeAmount = totalneg?.reduce(
    (total, e) => total + e,
    0
  );

  return totalNegativeAmount;
  
};

  return (
    <>
    <div className="app">  
    {!authToken &&<Auth/>}
     {authToken &&
     <>
      <ListHeader listName={'Transactions'}/>  
      <p className="user-email">
        Welcome {userEmail}
      </p>
      <p className="total-amt">
        Your Total Balance:         {getTotal()}
      </p>
      <p className="neg-amt">
      Your Total Expense:  {calculateNegativeTotal()}
      </p>
      {sortedExpenses?.map((expenses)=><ListItem key={expenses.id}  expenses={expenses}getData={getData}/>)}


     
      </>
      
      }
    </div>

    </>
  );
}

export default App;
