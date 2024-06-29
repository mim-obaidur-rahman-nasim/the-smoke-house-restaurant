import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useParams } from "react-router-dom";
import { toBase64 } from "../../utils/ConvertImage";

const UpdateMenu = () => {
  const { id } = useParams();

  const [pageLoading, setPageLoading] = useState(false);
  const [pageError, setPageError] = useState("");

  const [menu, setMenu] = useState({});
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchMenu = async () => {
      try {
        const token = localStorage.getItem("token");

        const response = await axios.get(
          `${process.env.REACT_APP_SERVER}/api/menu/one?menuId=${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setMenu(response?.data?.data);
      } catch (error) {
        setPageError(error?.response?.data?.message || "Server error");
      } finally {
        setPageLoading(false);
      }
    };

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

    fetchMenu();
    fetchCategories();
  }, id);

  const findCategoryName = (id) => {
    const desireOne = categories.find((data) => data._id == id);
    return desireOne?.categoryName;
  };

  const handleUpdateMenu = async (e) => {
    e.preventDefault();

    const foodName = e.target.foodName.value;
    const categoryId = e.target.categoryId.value;
    const price = parseFloat(e.target.price.value);
    const imageURL = e.target.imageURL.files[0];

    const data = {};

    if (foodName && foodName !== menu.foodName) {
      data.foodName = foodName;
    }
    if (categoryId && categoryId !== menu.categoryId) {
      data.categoryId = categoryId;
    }
    if (price && price !== menu.price) {
      data.price = price;
    }

    if (imageURL) {
      try {
        data.imageURL = await toBase64(imageURL);
      } catch (error) {
        setPageError("An error occurred while converting the image");
        return;
      }
    }

    if (Object.keys(data).length === 0) {
      setPageError("There is no changes in your course information");
      return;
    }

    try {
      setPageError("");
      setPageLoading(true);

      const token = localStorage.getItem("token");

      const response = await axios.patch(
        `${process.env.REACT_APP_SERVER}/api/menu/update?menuId=${id}`,
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setMenu(response?.data?.data);
      toast.success(response?.data?.message || "Menu updated successfully");
    } catch (error) {
      setPageError(error?.response?.data?.message || "Server error");
    } finally {
      setPageLoading(false);
    }
  };
  return (
    <div className="h-screen flex justify-center items-center">
      <div className="card w-full max-w-md border bg-white border-gray-300 py-4">
        <h1 className="text-center pt-2 text-xl font-bold">Update Menu</h1>
        <div className="card-body">
          <form onSubmit={handleUpdateMenu}>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Food Name</span>
              </label>
              <input
                type="text"
                name="foodName"
                placeholder="Food name"
                className="input input-bordered"
                defaultValue={menu.foodName}
                required
              />
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text">Category</span>
              </label>
              <select
                name="categoryId"
                className="select select-bordered w-full"
                required
              >
                <option value={menu.categoryId} disabled selected>
                  {findCategoryName(menu.categoryId)}
                </option>

                {categories?.map((data) => {
                  const { _id, categoryName } = data;
                  return <option value={_id}>{categoryName}</option>;
                })}
              </select>
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text">Price</span>
              </label>
              <input
                type="number"
                name="price"
                placeholder="Food price"
                className="input input-bordered"
                defaultValue={menu.price}
                required
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Image</span>
              </label>
              <input
                type="file"
                name="imageURL"
                className="mt-2 rounded-md max-h-48"
              />
              {menu.imageURL && (
                <div className="md:flex-1 mt-2 md:mt-0">
                  <span className="label-text">Current Image:</span>
                  <img
                    src={menu.imageURL}
                    alt="Current blog cover"
                    className="mt-2 rounded-md max-h-48"
                  />
                </div>
              )}
              {pageError && (
                <label className="label">
                  <p className="label-text-alt text-red-600">{pageError}</p>
                </label>
              )}
            </div>

            <div className="form-control mt-6">
              <button
                type="submit"
                className="btn btn-neutral text-sm"
                disabled={pageLoading}
              >
                {pageLoading ? "Updating..." : "Update Menu"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UpdateMenu;
