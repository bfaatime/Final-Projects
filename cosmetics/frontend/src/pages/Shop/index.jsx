import { useContext, useEffect, useState } from "react";
import { BASE_URL } from "../../constants";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom"; // For handling URL and navigation
import styles from "./index.module.scss";
import Grid from '@mui/material/Grid2';
import Rating from '@mui/material/Rating';
import { LuShoppingCart } from "react-icons/lu";
import { FaInfoCircle } from "react-icons/fa";
import { FaRegHeart } from "react-icons/fa";
import TextField from '@mui/material/TextField';
import { Helmet } from "react-helmet-async";
import { WishlistContext } from "../../context/wishlistContext";
import { Link } from "react-router-dom";
import { FaSearch } from "react-icons/fa";


const Shop = () => {
    const [clothes, setClothes] = useState([]);
    const [clothesCopy, setClothesCopy] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const { wishlist, toggleWishlist } = useContext(WishlistContext);
    const location = useLocation();
    const navigate = useNavigate();

    // Fetch clothes data
    const getClothes = async () => {
        try {
            const res = await axios(`${BASE_URL}clothes`);
            setClothes(res.data);
            setClothesCopy(res.data);
        } catch (error) {
            console.log(error);
        }
    };

    // Handle filtering based on search query
    const filteredClothes = clothes.filter((w) =>
        w.title.toLowerCase().includes(searchQuery.toLowerCase().trim())
    );

    useEffect(() => {
        // Fetch clothes data when the component mounts
        getClothes();

        // Get the search query from the URL if present
        const query = new URLSearchParams(location.search).get("search");
        if (query) {
            setSearchQuery(query); // Set the search query from the URL
        }
    }, [location.search]); // Re-run the effect when location.search changes

    // Handle sorting the clothes by price
    const handleChange = (e) => {
        let sortedClothes = null;
        if (e.target.value === "asc") {
            sortedClothes = [...clothes].sort((a, b) => a.price - b.price);
        } else if (e.target.value === "desc") {
            sortedClothes = [...clothes].sort((a, b) => b.price - a.price);
        } else {
            sortedClothes = [...clothesCopy];
        }
        setClothes([...sortedClothes]);
    };

    // Handle filtering based on categories
    const handleFilter = (category) => {
        if (category !== "all") {
            setClothes([...clothesCopy].filter((q) => q.category === category));
        } else {
            setClothes([...clothesCopy]);
        }
    };

    // Handle search input change
    const handleSearchChange = (e) => {
        const query = e.target.value;
        setSearchQuery(query);
        navigate(`/shop?search=${query}`); // Update URL with the search query
    };

    return (
        <>
            <div className={styles["shopss"]}>

                <div className={styles.container}>
                    <div style={{ margin: "1rem 0", display: "flex", justifyContent: "space-between" }}>
                        <TextField
                            id="outlined-basic"
                            label="Search"
                            variant="outlined"
                            value={searchQuery}
                            onChange={handleSearchChange}
                        />
                        <select name="" id="" onChange={handleChange}>
                            <option value="asc">ASC</option>
                            <option value="desc">DESC</option>
                            <option value="default">DEFAULT</option>
                        </select>
                    </div>

                    <div className={styles.clothess}>
                        <Grid container spacing={2}>
                            {clothes.length > 0 && filteredClothes.map((w) => (
                                <Grid size={{ xs: 12, md: 6, lg: 4 }} key={w._id}>
                                    <div className={styles["clothes"]}>
                                        <img src={w.imageUrl} alt={w.title} />
                                        <h3 className={styles.title}>{w.title}</h3>
                                        <p>
                                            {w.oldPrice ? (
                                                <span className={styles["old-price"]}>$ {w.oldPrice}</span>
                                            ) : ""} 
                                            $ {w.price}
                                        </p>
                                        <p><Rating name="half-rating" defaultValue={w.raiting} /></p>
                                        <button className={styles["cart"]}>
                                            <LuShoppingCart />
                                            Add to Cart
                                        </button>
                                        <div style={{ display: "flex", gap: "1rem" }}>
                                            <Link to={`clothes/${w._id}`}><FaInfoCircle /></Link>
                                            <FaRegHeart onClick={() => { toggleWishlist(w) }} />
                                        </div>
                                    </div>
                                </Grid>
                            ))}
                        </Grid>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Shop;
