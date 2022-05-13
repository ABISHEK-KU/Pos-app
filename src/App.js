import React, {useState,useEffect } from 'react';
import './App.css'
import { Route, useHistory } from 'react-router-dom'
import {useDispatch } from 'react-redux';
import LogIn from './components/LogIn'
import SignIn from './components/SignIn';
import NavBar from './components/NavBar';
import Home from './components/Home';
import Account from './components/Account';
import CustomerList from './components/CustomerList';
import ProductsList from './components/ProductsList';
import BillList from './components/BillList';
import { autoLogIn } from './action/userAction';
import BillViewer from './components/BillViewer'
import DashBoard from './components/DashBoard';

function App(props) {
  const [logInStatus,setLogInStatus]=useState(false)
  const dispatch = useDispatch()
  const history = useHistory()

  const handelAuth=(status)=>{
    setLogInStatus(status)
  }

  useEffect(()=>{
    if(localStorage.getItem('token')){
      dispatch(autoLogIn())
      history.push(localStorage.getItem('page'))
      handelAuth(true)
    }else{
      history.push('/login')
    }
   },[logInStatus])


  return (
    <div>
      <NavBar handelAuth={handelAuth} logInStatus={logInStatus}/>
      <h1 className='appTitle'>Pos App</h1>
      {(logInStatus) ? (
        <div>
          <Route path='/home' component={Home} exact={true} />
          <Route path='/account' component={Account} exact={true} />
          <Route path='/customer' component={CustomerList} exact={true} />
          <Route path='/product' component={ProductsList} exact={true} />
          <Route path='/bill' component={BillList} exact={true} />
          <Route path='/bill_View/:id' component={BillViewer} exact={true} />
          <Route path='/dash_board' component={DashBoard} exact={true} />
        </div>
      ) : (
        <div>
          <Route path='/login' render={(props)=>{return <LogIn handelAuth={handelAuth}/>}} exact={true} />
          <Route path='/signin' component={SignIn} exact={true} />
        </div>
      )}
    </div>
  );
}
export default App;
