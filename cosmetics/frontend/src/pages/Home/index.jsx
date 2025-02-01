import { useContext, useEffect, useState } from "react";
import { BASE_URL } from "../../constants";
import axios from "axios";

import styles from "./index.module.scss";
import Grid from '@mui/material/Grid2';
import Rating from '@mui/material/Rating';

import { LuShoppingCart } from "react-icons/lu";
import { MdFavorite } from "react-icons/md";
import TextField from '@mui/material/TextField';
import { Helmet } from "react-helmet-async";
import { WishlistContext } from "../../context/wishlistContext";
import { Link } from "react-router-dom";

// Slider için eklenen state
const images = [
    {
        src: "https://www.sephora.com/contentimages/2025-01-23-q1-fragrance-mbc-site-home-page-RWD-hero-banner-crossworld-gifts-us-image-only-release.jpg?imwidth=545",
        title: "Valentine's Day Gifts",
        text: "The best beauty picks—perfect to give or get.",
        link: "#fragrance",
    },
    {
        src: "https://www.sephora.com/contentimages/2025-01-26-january-hair-scalp-site-desktop-mobile-app-rwd-hero-banner-V1-us-2835-image-only.jpg?imwidth=545",
        title: "Hair Thinning Happens",
        text: "Let's do something about it with these effective picks.",
        link: "#haircare",
    },
    {
        src: "https://www.sephora.com/contentimages/2025-2-8-gisou-honey-gloss-ceramide-therapy-hair-mask-site-desktop-home-page-rwd-marketing-banner-1200x800-en-us-can-2834.jpg?imwidth=545",
        title: "New Gisou Hair Mask",
        text: "Hydrate dry, damaged strands with this honey-infused formula.",
        link: "#gisou",
    },
    {
        src: "https://www.sephora.com/contentimages/2025-01-19-slotting-just-arrived-v3-site-rwd-home-page-hero-banner-english-US-CAN-handoff_01.jpg?imwidth=545",
        title: "In With The New",
        text: "The latest beauty from the hottest brands.",
        link: "#new",
    },
];

const Home = () => {
    const [clothes, setClothes] = useState([]);
    const [clothesCopy, setClothesCopy] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [index, setIndex] = useState(0);

    const { wishlist, toggleWishlist } = useContext(WishlistContext);

    const getClothes = async () => {
        try {
            const res = await axios(`${BASE_URL}clothes`);
            setClothes(res.data);
            setClothesCopy(res.data);
        } catch (error) {
            console.log(error);
        }
    };

    const filteredClothes = clothes.filter((w) =>
        w.title.toLowerCase().includes(searchQuery.toLowerCase().trim())
    );

    useEffect(() => {
        getClothes();
    }, []);

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

    const handleFilter = (category) => {
        if (category !== "all") {
            setClothes([...clothesCopy].filter((q) => q.category === category));
        } else {
            setClothes([...clothesCopy]);
        }
    };

    const nextSlide = () => {
        if (index < images.length - 2) setIndex(index + 2);
    };

    const prevSlide = () => {
        if (index > 0) setIndex(index - 2);
    };

    return (
        <>
            <Helmet>
                <title>Home Page</title>
                <meta name="description" content="clothes page" />
            </Helmet>

            {/* SLIDER */}
            <div className={styles.sliderContainer}>
                <div className={styles.sliderWrapper}>
                    <div className={styles.slider}>
                        {images.slice(index, index + 2).map((image, i) => (
                            <div key={i} className={styles.imageItem}>
                                <img src={image.src} alt={image.title} />
                                <div className={styles.textOverlay}>
                                    <h2>{image.title}</h2>
                                    <p>{image.text}</p>
                                    <a href={image.link}>SHOP NOW ▸</a>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                <div className={styles.buttons}>
                    <button onClick={prevSlide} disabled={index === 0}>‹</button>
                    <button onClick={nextSlide} disabled={index >= images.length - 2}>›</button>
                </div>
            </div>

            {/* ÜRÜNLER */}
            <div className={styles.container}>
                <div  style={{ margin: "1rem 0", display: "flex", justifyContent: "space-between" }}>
                    <TextField
                        id="outlined-basic"
                        label="Search"
                        variant="outlined"
                        onChange={(e) => { setSearchQuery(e.target.value) }}
                    />
                    <select name="" id="" onChange={handleChange}>
                        <option value="asc">ASC</option>
                        <option value="desc">DESC</option>
                        <option value="default">DEFAULT</option>
                    </select>
                </div>
                <div className={styles.clothess}>
                    <Grid container spacing={2}>
                        {clothes.length > 0 &&
                            filteredClothes.map((w) => (
                                <Grid size={{ xs: 12, md: 6, lg: 4 }} key={w._id}>
                                    <div className={styles["clothes"]}>
                                        {/* Card'ın tamamı tıklanabilir */}
                                        <Link to={`clothes/${w._id}`} className={styles["cardContent"]}>
                                            <div className={styles["cardImageLink"]}>
                                                <img src={w.imageUrl} alt={w.title} />
                                            </div>
                                            <h3 className={styles.title}>{w.title}</h3>
                                            <p> {w.oldPrice ? <span className={styles["old-price"]}>$ {w.oldPrice}</span> : ""} $ {w.price}</p>
                                            <p><Rating name="half-rating" defaultValue={w.raiting} /></p>
                                            <button className={styles["cart"]}> <LuShoppingCart />
                                                Add to Cart
                                            </button>
                                            <div style={{ display: "flex", gap: "1rem" }}>
                                                <MdFavorite
                                                  onClick={() => { toggleWishlist(w) }}
                                                  className={wishlist.some((item) => item._id === w._id) ? styles.favActive : ''}
                                                  style={{ position: "absolute", top: "10px", right: "10px" }} // Favori ikonu sağ üst köşeye yerleştirildi
                                                />
                                            </div>
                                        </Link>
                                    </div>
                                </Grid>
                            ))}
                    </Grid>
                </div>
            </div>
        </>
    );
};

export default Home;
