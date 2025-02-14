import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, TextField, Grid, Typography } from "@mui/material";
import styles from "./index.module.scss";

const Checkout = () => {
  const navigate = useNavigate();

  // Adres ve ödeme bilgileri
  const [address, setAddress] = useState({
    firstName: "",
    lastName: "",
    addressLine1: "",
    addressLine2: "",
    city: "",
    postalCode: "",
    country: "",
    phone: "",
  });

  const [paymentInfo, setPaymentInfo] = useState({
    cardNumber: "",
    cardHolder: "",
    expiryDate: "",
    cvv: "",
    paymentMethod: "",
  });

  const [promoCode, setPromoCode] = useState("");

  // Adres formu değişiklikleri
  const handleAddressChange = (e) => {
    setAddress({
      ...address,
      [e.target.name]: e.target.value,
    });
  };

  // Ödeme formu değişiklikleri
  const handlePaymentChange = (e) => {
    setPaymentInfo({
      ...paymentInfo,
      [e.target.name]: e.target.value,
    });
  };

  // Promo kodu değişikliği
  const handlePromoChange = (e) => {
    setPromoCode(e.target.value);
  };

  // Adres tamamlandıktan sonra ödeme kısmına geçiş
  const handleNextStep = () => {
    if (Object.values(address).includes("") || Object.values(paymentInfo).includes("") || !paymentInfo.paymentMethod) {
      alert("Please complete all fields!");
    } else {
      // İleriye ödeme kısmına geçiş
      alert("Proceeding to payment...");
      navigate("/payment");
    }
  };

  return (
    <div className={styles.container}>
      <Typography variant="h4" gutterBottom>
        Checkout
      </Typography>

      <form>
        {/* Adres Bilgileri */}
        <div className={styles.section}>
          <Typography variant="h6">Address Information</Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                label="First Name"
                variant="outlined"
                fullWidth
                name="firstName"
                value={address.firstName}
                onChange={handleAddressChange}
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Last Name"
                variant="outlined"
                fullWidth
                name="lastName"
                value={address.lastName}
                onChange={handleAddressChange}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Address Line 1"
                variant="outlined"
                fullWidth
                name="addressLine1"
                value={address.addressLine1}
                onChange={handleAddressChange}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Address Line 2"
                variant="outlined"
                fullWidth
                name="addressLine2"
                value={address.addressLine2}
                onChange={handleAddressChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="City"
                variant="outlined"
                fullWidth
                name="city"
                value={address.city}
                onChange={handleAddressChange}
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Postal Code"
                variant="outlined"
                fullWidth
                name="postalCode"
                value={address.postalCode}
                onChange={handleAddressChange}
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Country"
                variant="outlined"
                fullWidth
                name="country"
                value={address.country}
                onChange={handleAddressChange}
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Phone"
                variant="outlined"
                fullWidth
                name="phone"
                value={address.phone}
                onChange={handleAddressChange}
                required
              />
            </Grid>
          </Grid>
        </div>

        {/* Ödeme Yöntemi */}
        <div className={styles.section}>
          <Typography variant="h6">Payment Information</Typography>

          <div className={styles.paymentMethods}>
            <div
              className={`${styles.paymentMethod} ${paymentInfo.paymentMethod === "visa" ? "visa" : ""}`}
              onClick={() => setPaymentInfo({ ...paymentInfo, paymentMethod: "visa" })}
            >
              <img src="https://d28wu8o6itv89t.cloudfront.net/images/Visadebitcardpng-1599584312349.png" alt="Visa" />
            </div>
            <div
              className={`${styles.paymentMethod} ${paymentInfo.paymentMethod === "mastercard" ? "mastercard" : ""}`}
              onClick={() => setPaymentInfo({ ...paymentInfo, paymentMethod: "mastercard" })}
            >
              <img src="https://upload.wikimedia.org/wikipedia/commons/a/a4/Mastercard_2019_logo.svg" alt="MasterCard" />
            </div>
          </div>

          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                label="Card Number"
                variant="outlined"
                fullWidth
                name="cardNumber"
                value={paymentInfo.cardNumber}
                onChange={handlePaymentChange}
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Card Holder"
                variant="outlined"
                fullWidth
                name="cardHolder"
                value={paymentInfo.cardHolder}
                onChange={handlePaymentChange}
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Expiry Date"
                variant="outlined"
                fullWidth
                name="expiryDate"
                value={paymentInfo.expiryDate}
                onChange={handlePaymentChange}
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="CVV"
                variant="outlined"
                fullWidth
                name="cvv"
                value={paymentInfo.cvv}
                onChange={handlePaymentChange}
                required
              />
            </Grid>
          </Grid>
        </div>

        {/* Promo Code */}
        <div className={styles.promoCode}>
          <input
            type="text"
            placeholder="Enter Promo Code"
            value={promoCode}
            onChange={handlePromoChange}
          />
          <button type="button">Apply</button>
        </div>

        {/* İleriye ödeme kısmına geçiş */}
        <Button
          variant="contained"
          color="primary"
          fullWidth
          onClick={handleNextStep}
        >
          Proceed to Payment
        </Button>
      </form>
    </div>
  );
};

export default Checkout;
    