import React, {Component, useState, useEffect, useCallback, useMemo, useReducer} from "react";
import './GetData.css';
import { Fragment} from "react/cjs/react.production.min";
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Ui from './Ui';
import { useDispatch } from "react-redux";
import Pagination from './Pagination';

export default function GetData(){

  const [usersList, setUsersList] = useState([]);

  const [checkedList, setCheckedList] = useState([]);

  //const [state, dispatch] = useReducer(TotalSubscribersReducer, {count:0});

  const dispatch = useDispatch();

  async function loadData(){
          
      const rawResponse = await fetch("https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json");
      const data = await rawResponse.json();
      dispatch({"type": "SET_USERS", payload: data}); 
      // dispatchToTotalSubscriberReducer({"type": "UPDATE_COUNT", payload: data.length});
      setUsersList(data);
  }

  useEffect(() => {
      loadData();
  }, []);

  // const deleteSubscriberHandler = useCallback(async(subscriberId) => {
  //     const rawResponse = await fetch("http://localhost:7081/api/contacts/"+subscriberId, {method: "DELETE"});
  //     const data = await rawResponse.json();
  //     loadData();
  // }, []);

  function selectSubscriberHandler(userIds) {
      console.log(userIds);
    checkedList.push(userIds);
    setCheckedList(checkedList);
}

function selectAllSubscriberHandler() {
    usersList.forEach(item => {
        checkedList.push(item.id);
    });
    console.log(checkedList);
    setCheckedList(checkedList);
}

  function deleteSubscriberHandler(userId) {
    const newUserList = usersList.filter((user) => user.id !== userId);
    dispatch({"type": "SET_USERS", payload: newUserList});
    setUsersList(newUserList);
  }

  function deleteSelectedHandler() {
    const newUserList = usersList.filter((user) => !checkedList.includes(user.id));
    dispatch({"type": "SET_USERS", payload: newUserList});
    setUsersList(newUserList);
}

//   const countOfSubscribers = useMemo(() => {
//       return subscribersList.length;
//   }, [subscribersList]);

  return(
      <Fragment>
          <Router>
            <Routes>
                <Route exact path="/" element={<Ui selectSubscriberHandler = {(userId) => selectSubscriberHandler(userId)} deleteSubscriberHandler = {(userId) => deleteSubscriberHandler(userId)} deleteSelectedHandler = {() => deleteSelectedHandler()} selectAllSubscriberHandler = {() => selectAllSubscriberHandler()}/>}/>
            </Routes>
          </Router>
      </Fragment>
  )
}
