import { Button, Typography } from "@mui/material";
import styles from "./index.module.scss";

const SuccessPage = () => {
  return (
    <div className={styles.container}>
      <div className={styles.successBox}>
        <Typography variant="h4" className={styles.title}>Success!</Typography>
        <Typography variant="h6" className={styles.message}>
          Your payment was successfully processed. Thank you for your purchase!
        </Typography>
        <Button
          variant="contained"
          color="primary"
          className={styles.button}
          onClick={() => window.location.href = "/"} // Ana sayfaya yönlendirme
        >
          Go to Homepage
        </Button>
      </div>
    </div>
  );
};

export default SuccessPage;
