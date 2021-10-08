import React, { useState, useEffect } from 'react'
import { collection, doc, getDoc, query, where, getDocs } from "firebase/firestore";
import { db } from '../App';
import UserCard from './UserCard';

const Users = props => {

    
    const [users, setUsers] = useState([]);
    const [once1, setOnce1] = useState('');

    const getUserDetails = async () => {
        const usersDetails = await getDocs(query(collection(db, `users`)));
        usersDetails.forEach((userDetail) => {
            // console.log(userDetail.data());
            setUsers((prev)=>{
                return [...prev, userDetail.data()]});

        });
    }

    useEffect(() => {
        getUserDetails();
    },[]);

    return (
        <div>
            <form className="d-flex">
              <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
              <button className="btn btn-outline-success" type="submit">Search</button>
            </form>
            <ul className="list-group">
            {
                users.map((user) => 
                    <UserCard key={user.uid} user={user}/>
                )
            }
            </ul>
        </div>
    )
}

Users.propTypes = {

}

export default Users;
