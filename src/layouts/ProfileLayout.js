import { Link, Outlet, useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const ProfileLayout = () => {
  const navigate = useNavigate();
  const { logout } = useAuth();

  const handleLogOut = async () => {
    await logout();
    navigate("/", { replace: true });
  };

  return (
    <div className="drawer drawer-mobile lg:drawer-open">
      <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />

      <div className="drawer-content flex flex-col">
        <label
          htmlFor="my-drawer-2"
          className="drawer-button lg:hidden bg-gray-100 pl-4 py-4 uppercase text-sm font-bold -tracking-widest"
        >
          menu
        </label>
        <main>
          <Outlet />
        </main>
      </div>

      <div className="drawer-side">
        <label htmlFor="my-drawer-2" className="drawer-overlay"></label>
        <ul className="menu w-68 bg-white text-base-content h-screen flex justify-between py-12">
          <div>
            <li>
              <Link to={"/"}>Home</Link>
            </li>
            <li>
              <Link to="history">Purchase History</Link>
            </li>
            <li>
              <Link to="change-password">Change Password</Link>
            </li>
          </div>
          <div>
            <li>
              <button
                onClick={handleLogOut}
                className="btn bg-red-600 btn-sm text-white hover:bg-red-700"
              >
                Logout
              </button>
            </li>
          </div>
        </ul>
      </div>
    </div>
  );
};

export default ProfileLayout;
