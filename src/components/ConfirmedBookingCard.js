import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { collection, doc, updateDoc, getDoc, query, where, getDocs } from "firebase/firestore";
import { db } from '../App';

const ConfirmedBookingCard = props => {
    const [userId, setUserId] = useState('');
    const [bookingId, setBookingId] = useState('');

    useEffect(() => {
        setBookingId(props.booking.bookingid);
        setUserId(props.booking.userid);
    }, []);

    return (
        <div
            className="p-3"
        >
            <div className="card text-white bg-success mb-3">

                <div className="card-header">{(props.booking.name)}</div>
                <div className="card-body">
                    <h5 className="card-title">{props.booking.title}</h5>
                    <p className="card-text"><span style={smallTitle}>Amount: ₹ </span><span>{props.booking.paidamount}</span></p>
                    <p className="card-text"><span style={smallTitle}>Balance: ₹ </span><span>{props.booking.outstanding}</span></p>
                    <p className="card-text"><span style={smallTitle}>Deposite Amount: ₹ </span><span>{props.booking.depositeamount}</span></p>
                    <button
                        type="button"
                        className="btn btn-light"
                    >
                        Get Invoice
                    </button>
                </div>
            </div>
        </div>
    )
}

ConfirmedBookingCard.propTypes = {
    booking: PropTypes.object,
}

const smallTitle = {
    display: 'inline', fontSize: 18, fontWeight: '500',
}

const input = {
    display: 'inline',
    background: 'none',
    border: "none",
    width: ''
}

export default ConfirmedBookingCard
