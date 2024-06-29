import axios from "axios";
import useAuth from "../hooks/useAuth";
import { LuUtensilsCrossed } from "react-icons/lu";
import toast from "react-hot-toast";

const Cart = () => {
  const { cart, removeFromCart } = useAuth();

  const payNow = async () => {
    try {
      const data = {
        cart,
        total: totalPrice,
        email: "payment@ssl.com.bd",
      };
      const token = localStorage.getItem("token");
      const response = await axios.post(
        `${process.env.REACT_APP_SERVER}/api/payment/pay-now`,
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      window.location.replace(response?.data?.url);
    } catch (error) {
      toast.error(error?.response?.data?.message || "Server error");
    }
  };

  const totalPrice = cart?.reduce((total, item) => total + item.price, 0);
  return (
    <div className="min-h-screen container mx-auto pt-6 pb-12">
      <div className="flex flex-col justify-center items-center gap-4">
        <h1 className="font-bold text-4xl text-center">Your Cart</h1>
        <p className="text-gray-500 text-sm px-12">
          Pay, confim your order and get delivary faster
        </p>
      </div>

      {cart?.length > 0 ? (
        <div className="overflow-x-auto mt-6">
          <table className="table">
            <thead>
              <tr>
                <th>SL</th>
                <th>Food Name</th>
                <th>Image</th>
                <th>Price</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {cart?.map((data, index) => {
                const { _id, foodName, imageURL, price } = data;
                return (
                  <tr key={_id}>
                    <th>{index + 1}</th>
                    <td>{foodName}</td>
                    <td>
                      <img src={imageURL} alt={foodName} className="w-24" />
                    </td>
                    <td>bdt {price}</td>
                    <td>
                      <LuUtensilsCrossed
                        onClick={() => removeFromCart(_id)}
                        color="red"
                        size={16}
                        className="cursor-pointer"
                      />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>

          <div className="mt-12 flex flex-col gap-4 justify-start px-6">
            <p className="font-bold">Total: bdt {totalPrice}</p>
            <button onClick={payNow} className="btn btn-neutral btn-sm w-24">
              pay now
            </button>
          </div>
        </div>
      ) : (
        <p className="text-center mt-24">No item in your cart</p>
      )}
    </div>
  );
};

export default Cart;
