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
import { useCart } from "../../context/cartContext";  // CartContext'i import ettik

const Shop = () => {
  const [clothes, setClothes] = useState([]);
  const [clothesCopy, setClothesCopy] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const { wishlist, toggleWishlist } = useContext(WishlistContext);
  const { addToCart, cart } = useCart();  // Sepete ürün ekleme ve sepetteki ürünleri almak için
  const location = useLocation();
  const navigate = useNavigate();

  const [message, setMessage] = useState("");

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

  // Filter clothes based on search query (brand)
  const filteredClothes = clothes.filter((w) => {
    const searchQueryLower = searchQuery.toLowerCase().trim();
    return (
      w.title.toLowerCase().includes(searchQueryLower) || // Search by title
      (w.description && w.description.toLowerCase().includes(searchQueryLower)) || // Search by description
      (w.brand && w.brand.toLowerCase().includes(searchQueryLower)) // Search by brand
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

  // Handle add to cart with quantity check
  const handleAddToCart = (product) => {
    const productInCart = cart.find((item) => item._id === product._id);
    if (productInCart) {
      if (productInCart.quantity < 5) {
        addToCart({ ...product, quantity: productInCart.quantity + 1 });
        setMessage("Item Added to Cart"); // Notification message
        setTimeout(() => setMessage(""), 2000); // Remove message after 2 seconds
      }
    } else {
      addToCart({ ...product, quantity: 1 });
      setMessage("Item Added to Cart"); // Notification message
      setTimeout(() => setMessage(""), 2000); // Remove message after 2 seconds
    }
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

        {message && <div className={styles.message}>{message}</div>} {/* Message display */}

        <div className={styles.clothesGrid}>
          <Grid container spacing={2}>
            {filteredClothes.length > 0 &&
              filteredClothes.map((w) => (
                <Grid item xs={12} sm={6} md={4} key={w._id}>
                  <div
                    className={styles.clothesCard}
                    onClick={() => navigate(`/clothes/${w._id}`)}  // Navigate fonksiyonu ile yönlendirme
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
                    <div className={styles.icons}>
                      <FaRegHeart
                        onClick={(e) => {
                          e.stopPropagation();  // Propagation'ı durdur
                          toggleWishlist(w);    // Wishlist'a ekle
                        }}
                      />
                    </div>
                    <button
                      className={styles.cart}
                      onClick={(e) => {
                        e.stopPropagation();  // Propagation'ı durdur
                        handleAddToCart(w);   // Sepete ekle
                      }}
                    >
                      <LuShoppingCart />
                      Add to Cart
                    </button>
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
