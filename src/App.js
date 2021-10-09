import './App.css';
import React, { useState, useEffect } from 'react';
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { collection, doc, getDoc, query, where, getDocs } from "firebase/firestore";
import PendingBookingCard from './components/PendingBookingCard';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Users from './components/Users';
import PendingBookings from './components/PendingBookings';
import ConfirmedBookings from './components/ConfirmedBookings';


const firebaseConfig = {
  apiKey: "AIzaSyDVaHvaYxSIOEknWgkJniFwPhXNZuUXzY8",
  authDomain: "kaarobaar-mobile-app.firebaseapp.com",
  projectId: "kaarobaar-mobile-app",
  storageBucket: "kaarobaar-mobile-app.appspot.com",
  messagingSenderId: "1035731338707",
  appId: "1:1035731338707:web:efee5776bfb2d95d069b26",
  measurementId: "G-VSG6MB0S61"
};

const firebaseApp = initializeApp(firebaseConfig);

export const db = getFirestore();


function App() {
  const [allBookings, setAllBookings] = useState([]);
  // const [allBookingDetails, setAllBookingDetails] = useState([]);
  // const [usersInBooking, setUsersInBooking] = useState([]);
  // const [once, setOnce] = useState('');

  // const getNameById = async (uid) => {
  //   // console.log("abhi ye dekh" + uid);
  //   const userDoc = await getDoc(doc(db, "users/" + uid));
  //   var name = await userDoc.get("name");
  //   // console.log(name);
  //   return await userDoc.get("name");
  // }

  // const getAllBookings = async () => {

  //   const querySnapshot = await getDocs(collection(db, "bookings"));
  //   querySnapshot.forEach((doc) => {
  //     // console.log(`${doc.id} => ${doc.data()}`);

  //     //setAllBookings([...allBookings, doc.id,]);
  //     const getAllBookingDetails = async () => {

  //       const bookings = await getDocs(query(collection(db, `bookings/${doc.id}/mybookings`), where("confirmed", "==", false)));
  //       bookings.forEach((booking) => {
  //         // console.log(booking.id);
  //         // console.log(booking.data());
  //         getNameById(booking.data().userid);
  //         var name = getNameById(booking.data().userid);

  //         setAllBookingDetails([...allBookingDetails, booking.data()]);

  //       });
  //     }
  //     getAllBookingDetails();

  //   });
  // }


  // useEffect(() => {
  //   getAllBookings();
  // }, [once]);

  return (
    <div className="App">
      <Router>
      <nav className="navbar sticky-top navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid">
          <a className="navbar-brand" href="#">Kaarobaar</a>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
        <li className="nav-item">
          <Link className="nav-link active" aria-current="page" to="/users">Users</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link active" aria-current="page" to="/confirmed">Confirmed Bookings</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link active" aria-current="page" to="/">Pending Bookings</Link>
        </li>
        </ul>


        
            {/* 
      <ul className="navbar-nav me-auto mb-2 mb-lg-0">
        <li className="nav-item">
          <a className="nav-link active" aria-current="page" href="#">Home</a>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="#">Link</a>
        </li>
        <li className="nav-item dropdown">
          <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
            Dropdown
          </a>
          <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
            <li><a className="dropdown-item" href="#">Action</a></li>
            <li><a className="dropdown-item" href="#">Another action</a></li>
            <li><hr className="dropdown-divider"/></li>
            <li><a className="dropdown-item" href="#">Something else here</a></li>
          </ul>
        </li>
        <li className="nav-item">
          <a className="nav-link disabled">Disabled</a>
        </li>
      </ul>
       */}
            
          </div>
        </div>
      </nav>
      
      
      <Switch>
          <Route path="/confirmed">
            <ConfirmedBookings/>
          </Route>
          <Route path="/users">
            <Users />
          </Route>
          <Route path="/">
          <PendingBookings/>
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
