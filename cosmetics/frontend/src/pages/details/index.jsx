import axios from "axios";
import styles from "./index.module.scss";
import { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom"; // Import useNavigate for routing
import { BASE_URL } from "../../constants";
import Grid from '@mui/material/Grid';
import { Container } from "@mui/material";
import { FaRegHeart } from "react-icons/fa";
import { LuShoppingCart } from "react-icons/lu";
import { WishlistContext } from "../../context/wishlistContext"; // Wishlist context
import { Link } from "react-router-dom"; // For product details link

const Details = () => {
    const [clothes, setClothes] = useState(null);
    const { id } = useParams();
    const navigate = useNavigate(); // Hook to navigate to another page
    const { wishlist, toggleWishlist } = useContext(WishlistContext); // Using context for wishlist

    const getClothes = async () => {
        try {
            const res = await axios(`${BASE_URL}clothes/${id}`);
            setClothes(res.data);
            console.log(res.data);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        if (id) {
            getClothes();
        }
    }, [id]);

    // Handle Add to Cart
    const handleAddToCart = () => {
        console.log("Added to Cart");
        // Add logic for adding to cart
    };

    // Handle Add to Favorites
    const handleAddToFavorites = () => {
        toggleWishlist(clothes); // Add/remove product to/from wishlist
        console.log("Added to Favorites");
    };

    // Handle Back to Previous Page (go back to where the user came from)
    const handleBackToHome = () => {
        navigate(-1); // Go back to the previous page in the browser history
    };

    return (
        <>
            {clothes ? (
                <Container>
                    <Grid container spacing={2}>
                        {/* Image Gallery Section */}
                        <Grid item xs={12} md={6}>
                            <div className={styles.productImageGallery}>
                                {/* Main product image */}
                                <img
                                    src={clothes.imageUrl}
                                    alt={clothes.title}
                                    width={400}
                                    className={styles.productImage}
                                />

                                {/* Additional images for the product */}
                                <div className={styles.additionalImages}>
                                    {clothes.additionalImages?.map((img, index) => (
                                        <img
                                            key={index}
                                            src={img}
                                            alt={`Product Image ${index + 1}`}
                                            className={styles.additionalImage}
                                        />
                                    ))}
                                </div>
                            </div>
                        </Grid>

                        {/* Product Details Section */}
                        <Grid item xs={12} md={6} className={styles.productDetails}>
                            <h3>{clothes.title}</h3>
                            <p>{clothes.description}</p>
                            <p className={styles.price}>$ {clothes.price}</p>

                            {/* Buttons */}
                            <div className={styles.buttons}>
                                <button className={styles.addToCart} onClick={handleAddToCart}>
                                    <LuShoppingCart /> Add to Cart
                                </button>
                                <button className={styles.addToFavorites} onClick={handleAddToFavorites}>
                                    <FaRegHeart /> Add to Favorites
                                </button>
                            </div>
                        </Grid>
                    </Grid>

                    {/* Back to Previous Page Button */}
                    <button className={styles.backToHomeButton} onClick={handleBackToHome}>
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
