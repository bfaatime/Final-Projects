import React, { useContext, useEffect, useState } from 'react';
import { useAuth } from '../../context/authContext'; // AuthContext'i import et
import { BASE_URL } from '../../constants';
import axios from 'axios';
import { Helmet } from 'react-helmet-async';
import { WishlistContext } from '../../context/wishlistContext';
import { Link, useNavigate } from 'react-router-dom';
import { Grid, TextField, Rating, Box, Card, CardContent, CardMedia, Typography } from '@mui/material';
import { LuShoppingCart } from 'react-icons/lu';
import { MdFavorite } from 'react-icons/md';
import styles from './index.module.scss';

const Home = () => {
  const { isAuthenticated } = useAuth(); // Burada isAuthenticated'ı alıyoruz
  const [clothes, setClothes] = useState([]);
  const [clothesCopy, setClothesCopy] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const { wishlist, toggleWishlist } = useContext(WishlistContext);
  const navigate = useNavigate();

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
    if (e.target.value === 'asc') {
      sortedClothes = [...clothes].sort((a, b) => a.price - b.price);
    } else if (e.target.value === 'desc') {
      sortedClothes = [...clothes].sort((a, b) => b.price - a.price);
    } else {
      sortedClothes = [...clothesCopy];
    }
    setClothes([...sortedClothes]);
  };

  const handleClick = (category) => {
    navigate(`/products?category=${category.replace(' & ', '%20%26%20')}`);
  };

  const ImgBox = ({ src, category }) => {
    return (
      <CardMedia
        component="img"
        alt="category image"
        height="100%"
        image={src}
        sx={{ cursor: 'pointer' }}
        onClick={() => handleClick(category)}
      />
    );
  };

  return (
    <>
      <Helmet>
        <title>Home Page</title>
        <meta name="description" content="clothes page" />
      </Helmet>

      {/* Card'lar en üstte */}
      <div className={styles.section1}>
        <Box>
          <Grid container spacing={4} padding={{ xs: 2, sm: 4, md: 10 }} justifyContent="center">
            {/* Buradaki içerik */}
          </Grid>
        </Box>
      </div>

      {/* Ürünler alt kısımda */}
      <div className={styles.container}>
        <div style={{ margin: '1rem 0', display: 'flex', justifyContent: 'space-between' }}>
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
                <Grid item xs={12} sm={6} md={4} key={w._id}>
                  <div className={styles["clothes"]}>
                    {/* Card'ın tamamı tıklanabilir */}
                    <Link to={`clothes/${w._id}`} className={styles["cardContent"]}>
                      <div className={styles["cardImageLink"]}>
                        <img src={w.imageUrl} alt={w.title} />
                      </div>
                      <h3 className={styles.title}>{w.title}</h3>
                      <p>{w.oldPrice ? <span className={styles["old-price"]}>$ {w.oldPrice}</span> : ""} $ {w.price}</p>
                      <p><Rating name="half-rating" defaultValue={w.raiting} /></p>
                      <button className={styles["cart"]}> <LuShoppingCart />
                        Add to Cart
                      </button>
                      <div style={{ display: 'flex', gap: '1rem' }}>
                        <MdFavorite
                          onClick={() => { toggleWishlist(w) }}
                          className={wishlist.some((item) => item._id === w._id) ? styles.favActive : ''}
                          style={{ position: 'absolute', top: '10px', right: '10px' }} 
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
