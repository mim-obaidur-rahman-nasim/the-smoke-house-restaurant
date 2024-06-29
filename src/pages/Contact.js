import { Link } from "react-router-dom";
import logo from "../assets/images/logo.svg";

const Contact = () => {
  return (
    <div className="h-screen flex flex-col justify-center items-center">
      <Link to="/">
        <img src={logo} alt="The Smoke House Restaurant" className="w-32" />
      </Link>
      <h1 className="font-bold text-2xl mt-2">The Smoke House Restaurant</h1>

      <div className="mt-6 text-center -tracking-wider">
        <p>Address: B/523 Upashahar, Rajshahi</p>
        <p>Contact: +8801 533 706 103 (WhatsApp)</p>
        <p>Email: 202311032.cse.vu@gmail.com</p>
      </div>
    </div>
  );
};

export default Contact;
