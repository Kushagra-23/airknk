import { useContext, useEffect, useState } from "react";
import { differenceInCalendarDays } from 'date-fns'; 
import axios from "axios";
import { Navigate } from "react-router-dom";
import { UserContext } from "./UserContext";

// eslint-disable-next-line react/prop-types
export const BookingWidget = ({ place }) => {
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [numberOfGuests, setNumberOfGuests] = useState(1);
  const [name, setName] = useState('');
  const [mobile, setMobile] = useState('');
  const [redirect, setRedirect] = useState('');
  const {user} = useContext(UserContext);

  useEffect(() => {
    if(user) {
      setName(user.name);
    }
  }, [user])
  
  let numberOfNights = 0;
  if(checkIn && checkOut) {
    numberOfNights = differenceInCalendarDays(new Date(checkOut), new Date(checkIn))
  }

  const bookThisPlace = async () => {
    const response = await axios.post('/bookings', {checkIn, checkOut, numberOfGuests, name, mobile, place: place._id, price: (numberOfNights * place.price)});
    const bookingId = response.data._id;
    setRedirect(`/account/bookings/${bookingId}`)

  }

  if(redirect){
    return <Navigate to={redirect}/>
  }

  return (
    <div className="bg-white shadow p-4 rounded-2xl">
      <div className="text-2xl text-center">Price: ${place.price} / per night</div>
      <div className="border rounded-2xl mt-4">
        <div className="flex">
          <div className="py-3 px-4">
            <label className="">Check in:</label>
            <input
              type="date"
              value={checkIn}
              onChange={(e) => setCheckIn(e.target.value)}
            />
          </div>
          <div className="py-3 px-4 border-t">
            <label className="">Check out:</label>
            <input
              type="date"
              value={checkOut}
              onChange={(e) => setCheckOut(e.target.value)}
            />
          </div>
        </div>
        <div className="">
          <div className="py-3 px-4 border-t">
            <label className="">Number of guest:</label>
            <input
              type="number"
              value={numberOfGuests}
              onChange={(e) => setNumberOfGuests(e.target.value)}
            />
          </div>
        </div>
        {numberOfNights > 0 && (
          <div className="py-3 px-4 border-t">
          <label className="">Your full name:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <label className="">Phone number:</label>
          <input
            type="tel"
            value={mobile}
            onChange={(e) => setMobile(e.target.value)}
          />
        </div>
        )}
      </div>
      <button className="primary mt-4" onClick={bookThisPlace}>Book this place
      {numberOfNights > 0 && ( 
        // eslint-disable-next-line react/prop-types
        <span> ${numberOfNights * place.price}</span>
        )}
      </button>
    </div>
  );
};
