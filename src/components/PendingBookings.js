import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types'
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { collection, doc, getDoc, query, where, getDocs } from "firebase/firestore";
import { db } from '../App';
import PendingBookingCard from './PendingBookingCard';

const PendingBookings = props => {
    
    const [allBookingDetails, setAllBookingDetails] = useState([]);
    const [usersInBooking, setUsersInBooking] = useState([]);
    const [once, setOnce] = useState('');

    const getNameById = async (uid) => {
        // console.log("abhi ye dekh" + uid);
        const userDoc = await getDoc(doc(db, "users/" + uid));
        var name = await userDoc.get("name");
        // console.log(name);
        return await userDoc.get("name");
      }
    

    const getAllBookings = async () => {

        const querySnapshot = await getDocs(collection(db, "bookings"));
        querySnapshot.forEach((doc) => {
            // console.log(`${doc.id} => ${doc.data()}`);

            //setAllBookings([...allBookings, doc.id,]);
            const getAllBookingDetails = async () => {

                const bookings = await getDocs(query(collection(db, `bookings/${doc.id}/mybookings`), where("confirmed", "==", false)));
                bookings.forEach((booking) => {
                    // console.log(booking.id);
                    // console.log(booking.data());
                    var data_to_append = booking.data();
                    data_to_append.bookingid = booking.id;
                    setAllBookingDetails((prev)=>{return [...prev, data_to_append]});
                });
            }
            getAllBookingDetails();
        });
    }

    useEffect(() => {
        getAllBookings();
    }, [once]);

    return (
        <div>
            <form className="d-flex">
              <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
              <button className="btn btn-outline-success" type="submit">Search</button>
            </form>
            {allBookingDetails.map((booking) =>
                <div
                    style={{
                        display: 'flex',
                        flexWrap: 'wrap',
                        justifyContent: 'center'
                    }}
                    key={booking.bookingid}
                >
                    <PendingBookingCard booking={booking} />
                </div>
            )}
        </div>
    )
}

PendingBookings.propTypes = {

}

export default PendingBookings
