import { NavLink, useNavigate } from "react-router-dom";
import styles from "./index.module.scss";
import { MdFavoriteBorder } from "react-icons/md";
import { FaSearch } from "react-icons/fa";
import { CiShoppingBasket } from "react-icons/ci";
import { SlUserFemale } from "react-icons/sl";
import { useState } from "react";

const Header = () => {
    const [searchQuery, setSearchQuery] = useState("");
    const navigate = useNavigate();

    // Handle form submission and redirect to the shop page or results
    const handleSearchSubmit = (e) => {
        e.preventDefault();
        if (searchQuery.trim() !== "") {
            // Redirect to the shop page with the search query in the URL
            navigate(`/shop?search=${searchQuery}`);
        } else {
            navigate("/shop");  // Default to shop page if no search query
        }
    };

    return (
        <header className={styles.header}>
            <div className="container">
                <div className={styles.navbar}>
                    {/* Logo on the left */}
                    <h2 className={styles.logo}>Fatia</h2>

                    {/* Search form centered */}
                    <form className={styles.searchForm} onSubmit={handleSearchSubmit}>
                        <input
                            type="text"
                            placeholder="Search..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                        <button type="submit">
                            <FaSearch />
                        </button>
                    </form>

                    {/* Icons on the right */}
                    <div className={styles.icons}>
                        <NavLink to={"/wishlist"} className="favorites">
                            <MdFavoriteBorder size={25} />
                        </NavLink>
                        <NavLink to={"/account"}>
                            <SlUserFemale size={25} />
                        </NavLink>
                        <NavLink to={"/cart"}>
                            <CiShoppingBasket size={25} />
                        </NavLink>
                    </div>
                </div>

                {/* Second navbar for categories */}
                <nav className={styles.navbarSecond}>
                    <ul className={styles.navLinksSecond}>
                        <li><NavLink to={"/"}>Home</NavLink></li>
                        <li><NavLink to={"/shop"}>Shop</NavLink></li>
                        <li><NavLink to={"/brands"}>Brands</NavLink></li>
                        <li><NavLink to={"/skincare"}>Skincare</NavLink></li>
                        <li><NavLink to={"/fragrance"}>Fragrance</NavLink></li>
                        <li><NavLink to={"/hair"}>Hair</NavLink></li>
                        <li><NavLink to={"/gifts"}>Gifts</NavLink></li>
                        <li><NavLink to={"/sale"}>Sale</NavLink></li>
                        <li><NavLink to={"/bestsellers"}>Bestsellers</NavLink></li>
                    </ul>
                </nav>
            </div>
        </header>
    );
};

export default Header;
