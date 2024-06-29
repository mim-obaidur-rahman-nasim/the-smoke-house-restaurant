import React, { useEffect, useState } from "react";
import Loading from "../shared/Loading";
import Error from "../shared/Error";
import axios from "axios";
import { convertToLocalDate } from "../../utils/convertToLocalDate";

const AllReservation = () => {
  const [allReservation, setAllReservation] = useState([]);
  const [pageLoading, setPageLoading] = useState(true);
  const [pageError, setPageError] = useState("");

  useEffect(() => {
    const fetchReservations = async () => {
      try {
        const token = localStorage.getItem("token");

        const response = await axios.get(
          `${process.env.REACT_APP_SERVER}/api/reservation/all`,

          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setAllReservation(response?.data?.data);
      } catch (error) {
        setPageError(error?.response?.data?.message || "Server error");
      } finally {
        setPageLoading(false);
      }
    };

    fetchReservations();
  }, []);

  if (pageLoading) {
    return <Loading />;
  }

  if (!pageLoading && allReservation.length < 1) {
    return <Error message="No reservation found" />;
  }

  if (pageError) {
    return <Error message={pageError} />;
  }
  return (
    <div className="h-screen p-12">
      <h1 className="pb-4 font-bold font-xl">All Reservation</h1>
      <div className="overflow-x-auto">
        <table className="table">
          <thead>
            <tr>
              <th>SL</th>
              <th>Person Name</th>
              <th>Date</th>
              <th>Time</th>
              <th>Guest Number</th>
              <th>Hour Limit</th>
            </tr>
          </thead>
          <tbody>
            {allReservation?.map((category, index) => {
              const {
                _id,
                firstName,
                lastName,
                date,
                guestNumber,
                time,
                limit,
              } = category;
              return (
                <tr key={_id}>
                  <th>{index + 1}</th>
                  <td>
                    {firstName} {lastName}
                  </td>
                  <td>{convertToLocalDate(date)}</td>
                  <td>{time}</td>
                  <td>{guestNumber}</td>
                  <td>{limit} hours</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllReservation;
