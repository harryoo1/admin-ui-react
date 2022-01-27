import React, {useEffect, useState, useMemo} from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import './Search.css';
import { useSelector } from "react-redux";

export default function Search() {

    const usersList = useSelector(state => state.users);
    //console.log(usersList);

    const [searchQuery, setSearchQuery] = useState(usersList);

    const inputChangedHandler = (e) => {
        var dm = e.target.value;
        var str =dm.toString();
        var result = usersList.filter(user=> user["name"].toLowerCase().includes(str) || user["email"].toLowerCase().includes(str));
        setSearchQuery(result);
    };

    return (
        <div className='container'>
        <form className="subscriber-form">
            <input id="search" type="text" className="input-control" name="search" onChange={inputChangedHandler}/><br/>
            {
                searchQuery.map((item)=>(
                    <div key={item.id} className="search-container">
                    <span className="search-item">{item.name}</span>
                    <span className="search-item">{item.email}</span>
                    <span className="search-item">{item.role}</span>
                    </div>
                ))
            }
        </form>
        </div>
    );
}