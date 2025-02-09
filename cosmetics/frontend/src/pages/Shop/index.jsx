import { useContext, useEffect, useState } from "react";
import { BASE_URL } from "../../constants";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import styles from "./index.module.scss";
import Grid from "@mui/material/Grid";
import Rating from "@mui/material/Rating";
import { LuShoppingCart } from "react-icons/lu";
import { FaRegHeart } from "react-icons/fa";
import TextField from "@mui/material/TextField";
import { WishlistContext } from "../../context/wishlistContext";

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

  useEffect(() => {
    getClothes();
    const query = new URLSearchParams(location.search).get("search");
    if (query) {
      setSearchQuery(query); // Set search query from URL
    }
  }, [location.search]);

  // Filter clothes based on search query
  const filteredClothes = clothes.filter((w) => {
    const searchQueryLower = searchQuery.toLowerCase().trim();
    return (
      w.title.toLowerCase().includes(searchQueryLower) || // Search by title
      (w.description && w.description.toLowerCase().includes(searchQueryLower)) // Search by description
    );
  });

  // Price sorting
  const handleChange = (e) => {
    let sortedClothes;
    if (e.target.value === "asc") {
      sortedClothes = [...clothes].sort((a, b) => a.price - b.price);
    } else if (e.target.value === "desc") {
      sortedClothes = [...clothes].sort((a, b) => b.price - a.price);
    } else {
      sortedClothes = [...clothesCopy];
    }
    setClothes(sortedClothes);
  };

  return (
    <div className={styles.shop}>
      <div className={styles.container}>
        <div className={styles.searchFilter}>
          <TextField
            id="outlined-basic"
            label="Search"
            variant="outlined"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <select onChange={handleChange}>
            <option value="asc">Price Low to High</option>
            <option value="desc">Price High to Low</option>
            <option value="default">Default</option>
          </select>
        </div>

        <div className={styles.clothesGrid}>
          <Grid container spacing={2}>
            {filteredClothes.length > 0 &&
              filteredClothes.map((w) => (
                <Grid item xs={12} sm={6} md={4} key={w._id}>
                  <div
                    className={styles.clothesCard}
                    onClick={() => navigate(`/clothes/${w._id}`)}
                  >
                    <img src={w.imageUrl} alt={w.title} />
                    <h3 className={styles.title}>{w.title}</h3>
                    <p>
                      {w.oldPrice && (
                        <span className={styles.oldPrice}>$ {w.oldPrice}</span>
                      )}
                      $ {w.price}
                    </p>
                    <Rating name="rating" defaultValue={w.rating} />
                    <button className={styles.cart}>
                      <LuShoppingCart />
                      Add to Cart
                    </button>
                    <FaRegHeart onClick={() => toggleWishlist(w)} />
                  </div>
                </Grid>
              ))}
          </Grid>
        </div>
      </div>
    </div>
  );
};

export default Shop;
