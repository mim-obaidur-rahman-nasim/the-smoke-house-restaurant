import { Link } from "react-router-dom";
import logo from "../../assets/images/logo.svg";

const Logo = () => {
  return (
    <Link to="/">
      <img
        src={logo}
        alt="The Smoke House Restaurant"
        className="w-12 md:w-16 lg:w-16"
      />
    </Link>
  );
};

export default Logo;
