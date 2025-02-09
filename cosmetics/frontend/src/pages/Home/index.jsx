import { useState, useEffect, useContext } from "react";
import { BASE_URL } from "../../constants";
import axios from "axios";
import styles from "./index.module.scss";
import Grid from '@mui/material/Grid';
import Rating from '@mui/material/Rating';
import { LuShoppingCart } from "react-icons/lu";
import { MdFavorite } from "react-icons/md";
import { WishlistContext } from "../../context/wishlistContext";
import { Link } from "react-router-dom";

// Static card images and data
const images = [
  {
    src: "https://www.sephora.com/contentimages/2025-01-23-q1-fragrance-mbc-site-home-page-RWD-hero-banner-crossworld-gifts-us-image-only-release.jpg?imwidth=545",
    title: "Valentine's Day Gifts",
    text: "The best beauty picks—perfect to give or get.",
    link: "gifts", // category for search query
  },
  {
    src: "https://www.sephora.com/contentimages/2025-2-8-gisou-honey-gloss-ceramide-therapy-hair-mask-site-desktop-home-page-rwd-marketing-banner-1200x800-en-us-can-2834.jpg?imwidth=545",
    title: "New Gisou Hair Mask",
    text: "Hydrate dry, damaged strands with this honey-infused formula.",
    link: "hair", // category for search query
  },
  {
    src: "https://www.sephora.com/contentimages/2025-2-1-rare-beauty-soft-pinch-liquid-contour-site-desktop-home-page-rwd-hero-banner-1200x800-en-us-can.jpg?imwidth=545",
    title: "New Rare Beauty by Selena Gomez",
    text: "The latest beauty from the hottest brands.",
    link: "rare", // category for search query
  },
];

const Home = () => {
  const [clothes, setClothes] = useState([]);
  const { wishlist, toggleWishlist } = useContext(WishlistContext);

  const getClothes = async () => {
    try {
      const res = await axios(`${BASE_URL}clothes`);
      setClothes(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getClothes();
  }, []);

  return (
    <>
      {/* STATIC CARDS */}
      <div className={styles.cardContainer}>
        <Grid container spacing={2} justifyContent="center">
          {images.map((image, i) => (
            <Grid item xs={12} sm={6} md={4} key={i}>
              <div className={styles.card}>
                <img src={image.src} alt={image.title} />
                <div className={styles.cardText}>
                  <h3>{image.title}</h3>
                  <p>{image.text}</p>
                  <Link 
                    to={`/shop?search=${image.link}`} 
                    className={styles.shopNow}
                  >
                    SHOP NOW ▸
                  </Link>
                </div>
              </div>
            </Grid>
          ))}
        </Grid>
      </div>

      {/* PRODUCTS */}
      <div className={styles.productContainer}>
        <Grid container spacing={2} justifyContent="center">
          {clothes.length > 0 &&
            clothes.map((w) => (
              <Grid item xs={12} sm={6} md={4} key={w._id}>
                <div className={styles.productCard}>
                  <Link to={`clothes/${w._id}`} className={styles.cardContent}>
                    <div className={styles.cardImageLink}>
                      <img src={w.imageUrl} alt={w.title} />
                    </div>
                    <h3 className={styles.title}>{w.title}</h3>
                    <p>
                      {w.oldPrice && <span className={styles.oldPrice}>$ {w.oldPrice}</span>} 
                      $ {w.price}
                    </p>
                    <p><Rating name="half-rating" defaultValue={w.rating} /></p>
                    <button className={styles.cart}><LuShoppingCart /> Add to Cart</button>
                    <div className={styles.wishlistIcon}>
                      <MdFavorite
                        onClick={() => { toggleWishlist(w) }}
                        className={wishlist.some((item) => item._id === w._id) ? styles.favActive : ''} />
                    </div>
                  </Link>
                </div>
              </Grid>
            ))}
        </Grid>
      </div>
    </>
  );
};

export default Home;
