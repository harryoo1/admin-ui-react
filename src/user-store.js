import React from "react";
import { createStore } from "redux";

const initialState = {
    "users": []
}
function userReducer(state = initialState, action){
    switch(action.type){
        case "SET_USERS" :
            return {...state, "users": action.payload};
            
        default:
            return state;
    }
}

export default createStore(userReducer);