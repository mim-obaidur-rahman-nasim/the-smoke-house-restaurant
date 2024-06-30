import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import Loading from "../shared/Loading";
import Error from "../shared/Error";
import { Link } from "react-router-dom";

const Menu = () => {
  const [menu, setMenu] = useState([]);
  const [pageLoading, setPageLoading] = useState(true);
  const [pageError, setPageError] = useState("");

  useEffect(() => {
    const fetchMenu = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_SERVER}/api/menu/all`
        );
        setMenu(response?.data?.data);
      } catch (error) {
        setPageError(error?.response?.data?.message || "Server error");
      } finally {
        setPageLoading(false);
      }
    };

    fetchMenu();
  }, []);

  if (pageLoading) {
    return <Loading />;
  }

  if (!pageLoading && menu.length < 1) {
    return <Error message="No menu found" />;
  }

  if (pageError) {
    return <Error message={pageError} />;
  }

  const handleDelete = async (id) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.delete(
        `${process.env.REACT_APP_SERVER}/api/menu/delete?menuId=${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const deletedId = response?.data?.data?._id;
      const filterResult = menu.filter((data) => data._id !== deletedId);
      setMenu(filterResult);
      toast.success(response?.data?.message || "Menu deleted successfully");
    } catch (error) {
      setPageError(error?.response?.data?.message || "Server error");
    } finally {
      setPageLoading(false);
    }
  };

  return (
    <div className="h-screen p-12">
      <h1 className="pb-4 font-bold font-xl">All Menus</h1>
      <div className="overflow-x-auto">
        <table className="table">
          <thead>
            <tr>
              <th>SL</th>
              <th>Image</th>
              <th>Food Name</th>
              <th>Category</th>
              <th>Price</th>
              <th>Update</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {menu?.map((me, index) => {
              const { _id, foodName, imageURL, categoryName, price } = me;
              return (
                <tr key={_id}>
                  <th>{index + 1}</th>
                  <th>
                    <img src={imageURL} alt={foodName} className="w-16"></img>
                  </th>
                  <td>{foodName}</td>
                  <td>{categoryName}</td>
                  <td>bdt {price}</td>
                  <td>
                    <Link
                      to={`${_id}`}
                      className="btn btn-info btn-sm text-sm text-white"
                    >
                      update
                    </Link>
                  </td>
                  <td>
                    <button
                      onClick={() => handleDelete(_id)}
                      className="btn btn-error btn-sm text-sm text-white"
                    >
                      delete
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Menu;
