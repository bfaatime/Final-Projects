import axios from "axios";
import styles from "./index.module.scss";
import { useEffect, useState, useContext } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { BASE_URL } from "../../constants";
import Grid from "@mui/material/Grid";
import { Container, Rating } from "@mui/material";
import { FaRegHeart, FaHeart } from "react-icons/fa";
import { LuShoppingCart } from "react-icons/lu";
import { WishlistContext } from "../../context/wishlistContext";
import { useCart } from "../../context/cartContext"; // Sepet işlemleri için
import { Link } from "react-router-dom";

const Details = () => {
  const [clothes, setClothes] = useState(null);
  const [activeTab, setActiveTab] = useState("description");
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation(); // Kullanıcının mevcut URL'sini alıyoruz
  const { wishlist, toggleWishlist } = useContext(WishlistContext);
  const { addToCart, cart } = useCart(); // Sepete ekleme işlemi için context

  // Ürünü API'den alıyoruz
  const getClothes = async () => {
    try {
      const res = await axios(`${BASE_URL}clothes/${id}`);
      setClothes(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (id) {
      getClothes();
    }
  }, [id]);

  // Sepete ürün ekleme
  const handleAddToCart = () => {
    const productInCart = cart.find((item) => item._id === clothes._id);
    if (productInCart) {
      // Eğer ürün zaten sepette varsa, miktarını arttırıyoruz
      addToCart({ ...clothes, quantity: productInCart.quantity + 1 });
    } else {
      // Eğer ürün sepette yoksa, ilk kez ekliyoruz
      addToCart({ ...clothes, quantity: 1 });
    }
  };

  // Favorilere ekleme
  const handleAddToFavorites = () => {
    toggleWishlist(clothes);
  };

  // Geri gitme fonksiyonu (önceki sayfaya yönlendirme)
  const handleBackToHome = () => {
    // location.state var ise oraya yönlendiriyoruz (önceki sayfa)
    if (location.state?.from) {
      navigate(location.state.from);
    } else {
      // Eğer state yoksa normal geri git işlemi
      navigate(-1);
    }
  };

  return (
    <>
      {clothes ? (
        <Container className={styles.detailsPage}>
          <Grid container spacing={3} className={styles.productWrapper}>
            {/* Ürün Resimleri */}
            <Grid item xs={12} md={6} className={styles.productImageGallery}>
              <img
                src={clothes.imageUrl}
                alt={clothes.title}
                className={styles.productImage}
              />
              <div className={styles.additionalImages}>
                {clothes.additionalImages?.map((img, index) => (
                  <img
                    key={index}
                    src={img}
                    alt={`Product ${index + 1}`}
                    className={styles.additionalImage}
                  />
                ))}
              </div>
            </Grid>

            {/* Ürün Detayları */}
            <Grid item xs={12} md={6} className={styles.productDetails}>
              <h3>{clothes.title}</h3>
              <div className={styles.rating}>
                <Rating value={clothes.rating} precision={0.5} readOnly />
                <span>({clothes.reviewsCount} Reviews)</span>
              </div>
              <p className={styles.price}>${clothes.price}</p>
              <div className={styles.buttons}>
                <button className={styles.addToCart} onClick={handleAddToCart}>
                  <LuShoppingCart /> Add to Cart
                </button>
                <button
                  className={styles.addToFavorites}
                  onClick={handleAddToFavorites}
                >
                  {wishlist.some((item) => item._id === clothes._id) ? (
                    <FaHeart />
                  ) : (
                    <FaRegHeart />
                  )}
                </button>
              </div>
            </Grid>
          </Grid>

          {/* Ürün Bilgileri Sekmeleri */}
          <div className={styles.productInfoTabs}>
            <div className={styles.tabs}>
              <span
                onClick={() => setActiveTab("description")}
                className={activeTab === "description" ? styles.active : ""}
              >
                Description
              </span>
              <span
                onClick={() => setActiveTab("ingredients")}
                className={activeTab === "ingredients" ? styles.active : ""}
              >
                Ingredients
              </span>
              <span
                onClick={() => setActiveTab("reviews")}
                className={activeTab === "reviews" ? styles.active : ""}
              >
                Reviews
              </span>
            </div>
            <div className={styles.tabContent}>
              {activeTab === "description" && <p>{clothes.description}</p>}
              {activeTab === "ingredients" && <p>{clothes.ingredients}</p>}
              {activeTab === "reviews" && (
                <div className={styles.customerReviews}>
                  {clothes.reviews.map((review, index) => (
                    <div key={index} className={styles.review}>
                      <strong>{review.author}</strong>
                      <Rating value={review.rating} precision={0.5} readOnly />
                      <p>{review.comment}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Geri Dön Butonu */}
          <button
            className={styles.backToHomeButton}
            onClick={handleBackToHome}
          >
            Back to Previous Page
          </button>
        </Container>
      ) : (
        <h2>No such product found!</h2>
      )}
    </>
  );
};

export default Details;
