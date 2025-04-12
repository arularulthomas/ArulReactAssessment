
import { Link } from "react-router-dom";

const Navbar = () => {
    return (
        <div>
            <Link to="/">Customer</Link>
            <Link to="/about">About</Link>
            <Link to="/contact">Contact</Link>
        </div>    
    );
}

export default Navbar;