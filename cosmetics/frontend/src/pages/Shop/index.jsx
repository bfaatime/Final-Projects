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

  // Kullanıcının giriş yapıp yapmadığını kontrol eden fonksiyon
  const isAuthenticated = () => {
    return !!localStorage.getItem("userToken"); // Token varsa giriş yapmış demektir
  };

  // Ürünleri getir
  const getClothes = async () => {
    try {
      const res = await axios(`${BASE_URL}clothes`);
      setClothes(res.data);
      setClothesCopy(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  // Arama sorgusuna göre filtreleme
  const filteredClothes = clothes.filter((w) =>
    w.title.toLowerCase().includes(searchQuery.toLowerCase().trim())
  );

  useEffect(() => {
    getClothes();
    const query = new URLSearchParams(location.search).get("search");
    if (query) {
      setSearchQuery(query);
    }
  }, [location.search]);

  // Fiyat sıralaması
  const handleChange = (e) => {
    let sortedClothes;
    if (e.target.value === "asc") {
      sortedClothes = [...clothes].sort((a, b) => a.price - b.price);
    } else if (e.target.value === "desc") {
      sortedClothes = [...clothes].sort((a, b) => b.price - a.price);
    } else {
      sortedClothes = [...clothesCopy];
    }
    setClothes([...sortedClothes]);
  };

  // Arama değişikliklerini yönetme
  const handleSearchChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    navigate(`/shop?search=${query}`);
  };

  // Favori butonuna basıldığında çalışacak fonksiyon
  const handleWishlistClick = (e, item) => {
    e.stopPropagation(); // Kartın tıklanmasını engelle
    if (!isAuthenticated()) {
      navigate("/login"); // Giriş yapılmamışsa login sayfasına yönlendir
    } else {
      toggleWishlist(item); // Kullanıcı giriş yapmışsa wishlist'e ekle
    }
  };

  return (
    <>
      <div className={styles.shop}>
        <div className={styles.container}>
          <div className={styles.searchFilter}>
            <TextField
              id="outlined-basic"
              label="Search"
              variant="outlined"
              value={searchQuery}
              onChange={handleSearchChange}
            />
            <select onChange={handleChange}>
              <option value="asc">Price Low to High</option>
              <option value="desc">Price High to Low</option>
              <option value="default">Default</option>
            </select>
          </div>

          <div className={styles.clothesGrid}>
            <Grid container spacing={2}>
              {clothes.length > 0 &&
                filteredClothes.map((w) => (
                  <Grid item xs={12} sm={6} md={4} key={w._id}>
                    <div
                      className={styles.clothesCard}
                      onClick={() => navigate(`/clothes/${w._id}`)}
                    >
                      <img src={w.imageUrl} alt={w.title} />
                      <h3 className={styles.title}>{w.title}</h3>
                      <p>
                        {w.oldPrice ? (
                          <span className={styles.oldPrice}>$ {w.oldPrice}</span>
                        ) : (
                          ""
                        )}
                        $ {w.price}
                      </p>
                      <Rating name="rating" defaultValue={w.rating} />
                      <button
                        className={styles.cart}
                        onClick={(e) => e.stopPropagation()} // Kart tıklamasını engelle
                      >
                        <LuShoppingCart />
                        Add to Cart
                      </button>
                      <FaRegHeart
                        onClick={(e) => handleWishlistClick(e, w)}
                      />
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
