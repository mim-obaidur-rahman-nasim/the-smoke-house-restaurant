import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import Loading from "../shared/Loading";
import Error from "../shared/Error";
import { Link } from "react-router-dom";

const Category = () => {
  const [categories, setCategories] = useState([]);
  const [pageLoading, setPageLoading] = useState(true);
  const [pageError, setPageError] = useState("");

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const token = localStorage.getItem("token");

        const response = await axios.get(
          `${process.env.REACT_APP_SERVER}/api/category/all`,

          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setCategories(response?.data?.data);
      } catch (error) {
        setPageError(error?.response?.data?.message || "Server error");
      } finally {
        setPageLoading(false);
      }
    };

    fetchCategories();
  }, []);

  if (pageLoading) {
    return <Loading />;
  }

  if (!pageLoading && categories.length < 1) {
    return <Error message="No categories found" />;
  }

  if (pageError) {
    return <Error message={pageError} />;
  }

  const handleDelete = async (id) => {
    try {
      const token = localStorage.getItem("token");

      const response = await axios.delete(
        `${process.env.REACT_APP_SERVER}/api/category/delete?categoryId=${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const deletedId = response?.data?.data?._id;
      const filterResult = categories.filter((data) => data._id !== deletedId);
      setCategories(filterResult);

      toast.success(response?.data?.message || "Category deleted successfully");
    } catch (error) {
      setPageError(error?.response?.data?.message || "Server error");
    } finally {
      setPageLoading(false);
    }
  };

  return (
    <div className="h-screen p-12">
      <h1 className="pb-4 font-bold font-xl">All Categories</h1>
      <div className="overflow-x-auto">
        <table className="table">
          <thead>
            <tr>
              <th>SL</th>
              <th>Category Name</th>
              <th>Update</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {categories?.map((category, index) => {
              const { _id, categoryName } = category;
              return (
                <tr key={_id}>
                  <th>{index + 1}</th>
                  <td>{categoryName}</td>
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

export default Category;
