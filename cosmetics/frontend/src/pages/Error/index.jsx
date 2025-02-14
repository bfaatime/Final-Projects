import { Button, Typography } from "@mui/material";
import styles from "./index.module.scss";

const ErrorPage = () => {
  return (
    <div className={styles.container}>
      <div className={styles.errorBox}>
        <Typography variant="h4" className={styles.title}>Oops, Something Went Wrong</Typography>
        <Typography variant="h6" className={styles.message}>
          We encountered an issue while processing your payment. Please try again.
        </Typography>
        <Button
          variant="contained"
          color="secondary"
          className={styles.button}
          onClick={() => window.location.href = "/checkout"} // Ödeme sayfasına yönlendirme
        >
          Try Again
        </Button>
      </div>
    </div>
  );
};

export default ErrorPage;
