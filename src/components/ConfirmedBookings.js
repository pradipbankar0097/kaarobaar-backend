import React,{ useState,useEffect } from 'react'
import PropTypes from 'prop-types'
import { collection, doc, getDoc, query, where, getDocs } from "firebase/firestore";
import { db } from '../App';
import ConfirmedBookingCard from './ConfirmedBookingCard';

const ConfirmedBookings = props => {
    const [allBookingDetails, setAllBookingDetails] = useState([]);
    const [once, setOnce] = useState('');
    const getAllBookings = async () => {

        const querySnapshot = await getDocs(collection(db, "bookings"));
        querySnapshot.forEach((doc) => {
            // console.log(`${doc.id} => ${doc.data()}`);

            //setAllBookings([...allBookings, doc.id,]);
            const getAllBookingDetails = async () => {

                const bookings = await getDocs(query(collection(db, `bookings/${doc.id}/mybookings`), where("confirmed", "==", true)));
                bookings.forEach((booking) => {
                    // console.log(booking.id);
                    // console.log(booking.data());
                    setAllBookingDetails((prev)=>{return [...prev, booking.data()]});
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
                    <ConfirmedBookingCard booking={booking} />
                </div>
            )}
        </div>
    )
}

ConfirmedBookings.propTypes = {

}

export default ConfirmedBookings
