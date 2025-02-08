import React from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../../context/cartContext"; // CartContext'ten sepete erişim
import { Button, Grid, Card, CardContent, Typography, IconButton } from "@mui/material";
import { MdDelete } from "react-icons/md"; // Ürün silme ikonu

import styles from "./index.module.scss"; // SCSS dosyasını ekleyebilirsiniz

const Basket = () => {
  const { cart, removeFromCart, totalPrice, clearCart } = useCart(); // Sepet verilerine erişim
  const navigate = useNavigate();

  const handleCheckout = () => {
    if (cart.length === 0) {
      alert("Sepetinizde ürün bulunmuyor!");
    } else {
      // Burada ödeme işlemleri yapılabilir, örneğin ödeme sayfasına yönlendirme yapılabilir.
      navigate("/checkout");
    }
  };

  return (
    <div className={styles.container}>
      <Typography variant="h4" gutterBottom>
        Your Basket
      </Typography>

      <Grid container spacing={2}>
        {cart.length === 0 ? (
          <Typography variant="h6" color="text.secondary">
            Sepetiniz boş.
          </Typography>
        ) : (
          cart.map((product) => (
            <Grid item xs={12} sm={6} md={4} key={product._id}>
              <Card>
                <CardContent>
                  <div className={styles.cardContent}>
                    <img src={product.imageUrl} alt={product.title} className={styles.productImage} />
                    <div>
                      <Typography variant="h6">{product.title}</Typography>
                      <Typography variant="body2" color="text.secondary">
                        $ {product.price}
                      </Typography>
                    </div>
                    <IconButton
                      color="error"
                      onClick={() => removeFromCart(product._id)}
                      className={styles.removeButton}
                    >
                      <MdDelete />
                    </IconButton>
                  </div>
                </CardContent>
              </Card>
            </Grid>
          ))
        )}
      </Grid>

      {cart.length > 0 && (
        <div className={styles.totalPrice}>
          <Typography variant="h6">Total Price: $ {totalPrice}</Typography>
          <div>
            <Button
              variant="contained"
              color="primary"
              onClick={handleCheckout}
              className={styles.checkoutButton}
            >
              Proceed to Checkout
            </Button>
            <Button
              variant="outlined"
              color="secondary"
              onClick={clearCart}
              className={styles.clearButton}
            >
              Clear Cart
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Basket;
