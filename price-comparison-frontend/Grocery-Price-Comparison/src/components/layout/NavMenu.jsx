import { Link } from 'react-router-dom';

const NavMenu = () => {
    return (
        <div className="nav-menu">
            <Link className="link" to="/">
                Home
            </Link>
            <Link className="link" to="/about">
                About
            </Link>
            <Link className="link" to="/comparison">
                Comparison Tool
            </Link>
            <Link className="link" to="/cart">
                Cart
            </Link>
            <Link className="link" to="/shopping-list/1">
                Shopping List
            </Link>
            <Link className="link" to="/recipes">
                Recipes
            </Link>
            <Link className="link" to="/contact">
                Contact
            </Link>
        </div>
    );
};

export default NavMenu;
