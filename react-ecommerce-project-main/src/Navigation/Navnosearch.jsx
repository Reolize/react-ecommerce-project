import { FiHeart } from "react-icons/fi";
import { AiOutlineShoppingCart, AiOutlineUserAdd } from "react-icons/ai";
import { Link } from "react-router-dom";
import "./Navnosearch.css";


const Navnosearch = () => {
  return (
    <nav>
      <div className="nav-container">
      </div>
      <div className="profile-container">
          <Link to="/cart" className="nav-icons">
              <AiOutlineShoppingCart className="nav-icons" />
          </Link>
      </div>
    </nav>
  );
};

export default Navnosearch;