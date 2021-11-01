import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { initializeApp } from "firebase/app";
import { collection, doc, updateDoc, getDoc, query, where, getDocs } from "firebase/firestore";
import { db } from '../App';
// import { getStorage, ref } from "firebase/storage";
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import Resizer from "react-image-file-resizer";
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

const PendingBookingCard = props => {
  const [userId, setUserId] = useState('');
  const [image, setImage] = useState(null);
  const [bookingId, setBookingId] = useState('');
  const [imgurl, setImgUrl] = useState(null);
  const resizeFile = (file) =>
    new Promise((resolve) => {
      Resizer.imageFileResizer(
        file,
        200,
        200,
        "JPEG",
        100,
        0,
        (uri) => {
          resolve(uri);

        },
        "file"
      );
    });
  const uploadFirebase = () => {

    const storage = getStorage(firebaseApp);
    const storageRef = ref(storage, '/images/invoices/' + userId + '/' + bookingId + '/invoice');

    const uploadTask = uploadBytesResumable(storageRef, image);
    console.log('i am herer');
    console.log('i am herer');

    // Register three observers:
    // 1. 'state_changed' observer, called any time the state changes
    // 2. Error observer, called on failure
    // 3. Completion observer, called on successful completion
    uploadTask.on('state_changed',
      (snapshot) => {
        // Observe state change events such as progress, pause, and resume
        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log('Upload is ' + progress + '% done');
        switch (snapshot.state) {
          case 'paused':
            console.log('Upload is paused');
            break;
          case 'running':
            console.log('Upload is running');
            break;
        }
      },
      (error) => {
        console.log(error)
      },
      () => {
        // Handle successful uploads on complete
        // For instance, get the download URL: https://firebasestorage.googleapis.com/...
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          console.log('File available at', downloadURL);
        });
      }
    );

  }
  const confirmBooking = async (e) => {
    const targetBooking = doc(db, "bookings", userId, "mybookings", bookingId);
    await updateDoc(targetBooking, { "confirmed": true });
    alert(`Booking done for ${props.booking.name}\nBooking ID : ${bookingId}`);
    uploadFirebase();
    alert('upload called')


  }
  const handleImageUpload = async (e) => {
    const userimg = e.target.files[0];
    const img = await resizeFile(userimg);

    setImgUrl(URL.createObjectURL(img));
    setImage(userimg);
  }

  useEffect(() => {
    setBookingId(props.booking.bookingid);
    setUserId(props.booking.userid);
  }, []);
  return (
    <div
      className="p-3"
    >

      <div className="card text-dark bg-warning mb-3">

        <div className="card-header">{(props.booking.name)}</div>
        <div className="card-body" >
          <h5 className="card-title">{props.booking.title}</h5>
          <p className="card-text"><span style={smallTitle}>Amount: ₹ </span><span role="textbox" contentEditable={true} suppressContentEditableWarning={true}>{props.booking.paidamount}</span></p>
          <p className="card-text"><span style={smallTitle}>Balance: ₹ </span><span role="textbox" contentEditable={true} suppressContentEditableWarning={true}>{props.booking.outstanding}</span></p>
          <p className="card-text"><span style={smallTitle}>Deposite Amount: ₹ </span><span role="textbox" contentEditable={true} suppressContentEditableWarning={true}>{props.booking.depositeamount}</span></p>

          <div style={{ padding: 30, justifyContent: 'center', textAlign: 'center' }}>
            <p className="card-text"><span style={smallTitle}>Upload Invoice: </span>
              <input type="file" onChange={handleImageUpload} /></p>
          </div>
          <button
            type="button"
            className="btn btn-success"
            onClick={confirmBooking}
          >
            Confirm
          </button>

          <div style={{ padding: 20 }} ><img src={imgurl} alt="aisdhf" /></div>

        </div>
      </div>
    </div>
  )
}


PendingBookingCard.propTypes = {
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


export default PendingBookingCard
