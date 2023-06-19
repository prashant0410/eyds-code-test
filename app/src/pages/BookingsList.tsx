import { axios } from '../common'
import { useState } from 'react'
import { Booking } from '../common'
import dateToString from '../helpers/date'

// we must keep the rendering logic and css seperate to may be components/booking.js and move the fetch logic to pages/booking.js

export default function BookingsList() {
  const [bookings, setBookings] = useState<Booking[]>([])
  // we can use facade design pattern
  // basically we are missing error handling in these axios call
  // there are two things we can do
  // 1.) make use of catch block
  // 2.) for more reusable feature we can create request/response interceptors which can have makeRequest
  // method and can do error handling at once kind of utility functions
  axios
    .get('/getBookings')
    .then(({ data }) => {
      setBookings(data)
    }).catch((error) => {
      // Error
      if (error.response) {
          // console.log(error.response.data);   
      } else if (error.request) {
          // The request was made but no response was received
          console.log(error.request);
      } else {
          // Something happened in setting up the request that triggered an Error
          //badrequest
          console.log('Error', error.message);
      }
      console.log(error.config);
  });

  return <>
{/* I would definalty recommend using seperarte css file or styled component to make it more reusable or maintainable */}
    <div className="row">
      <div className="col h4">
        Booking Date
      </div>
      <div className="col h4">
        Booking Location
      </div>
      <div className="col h4">
        Booked By
      </div>
      <div className="col"></div>
    </div>
    {bookings.map((booking) => {
      return (<div key={booking.id} className="row" style={{border: "1px solid black"}}>
        <div className="col">
          {/* seperate all resolvers into their own files and create reusable functions*/}
         {dateToString(booking.bookingDate)}

        </div>
        <div className="col">
          {booking.location}
        </div>
        <div className="col">
          {booking.username}
        </div>
        {/* same goes here this axios call can be moved out may be seperate delete handler and can be handled through props */}
        <div 
          className="col btn btn-success" 
          onClick={() => {
            axios
              .get(`/deleteBooking?id=${booking.id}`)
          }}> 
          Delete
        </div>
      </div>)
    })}
  </>
}
