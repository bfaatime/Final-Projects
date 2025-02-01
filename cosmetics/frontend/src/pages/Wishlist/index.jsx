import { useContext } from "react";

import Grid from '@mui/material/Grid2';
import styles from "./index.module.scss"
import { LuShoppingCart } from "react-icons/lu";
import { FaRegHeart } from "react-icons/fa";
import { Helmet } from "react-helmet-async";
import { WishlistContext } from "../../context/wishlistContext";



const Wishlist = () => {



    const { wishlist, toggleWishlist } = useContext(WishlistContext)

 console.log(toggleWishlist);
 




    return (

        <>
            <Helmet>
                <title>Home Page</title>
                <meta name="description" content="clothes page" />
            </Helmet>
            <div>


                <div className={styles.container}>


                    <div className={styles.clothes}>
                        <Grid container spacing={2}>
                            {
                                wishlist.length > 0 && wishlist.map((w) => {
                                    return (<Grid size={{ xs: 12, md: 6, lg: 4 }} key={w._id}>
                                        <div className={styles["clothes"]}>
                                            <img src={w.imageUrl} alt={w.title} />
                                            <h3 className={styles.title}>{w.title}</h3>
                                            <button className={styles["cart"]}> <LuShoppingCart />
                                                Add to Cart</button>
                                            <div style={{ display: "flex", gap: "1rem" }}>
                                                <FaRegHeart onClick={() => { toggleWishlist(w) }} />
                                            </div>
                                        </div>
                                    </Grid>)
                                })
                            }
                        </Grid>
                    </div>

                </div>
            </div>
        </>

    )
}

export default Wishlist