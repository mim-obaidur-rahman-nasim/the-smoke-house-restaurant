import React, { useEffect, useState } from "react";
import Loading from "../shared/Loading";
import Error from "../shared/Error";
import axios from "axios";
import { convertToLocalDate } from "../../utils/convertToLocalDate";

const History = () => {
  const [purchaseHistory, setPurchaseHistory] = useState([]);
  const [pageLoading, setPageLoading] = useState(true);
  const [pageError, setPageError] = useState("");

  useEffect(() => {
    const fetchReservations = async () => {
      try {
        const token = localStorage.getItem("token");

        const response = await axios.get(
          `${process.env.REACT_APP_SERVER}/api/payment/history`,

          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setPurchaseHistory(response?.data?.data);
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

  if (!pageLoading && purchaseHistory.length < 1) {
    return <Error message="No purchase history found" />;
  }

  if (pageError) {
    return <Error message={pageError} />;
  }

  return (
    <div className="h-screen p-12">
      <h1 className="pb-4 font-bold font-xl">Purchase History</h1>
      <div className="overflow-x-auto">
        <table className="table">
          <thead>
            <tr>
              <th>SL</th>
              <th>Food Name</th>
              <th>Image</th>
              <th>Price</th>
            </tr>
          </thead>
          <tbody>
            {purchaseHistory?.map((category, index) => {
              const { _id, foodName, imageURL, price } = category;
              return (
                <tr key={_id}>
                  <th>{index + 1}</th>
                  <td>{foodName}</td>
                  <td>
                    <img src={imageURL} alt={foodName} className="w-24" />
                  </td>
                  <td>bdt {price}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default History;
