import React from "react";
import { Card, CardContent, Typography } from "@mui/material"; // Import Material-UI components
import styles from "./Apod.module.css"; // Import CSS module

const Apod = ({ data }) => {
  return (
    <div className={styles.container}>
      <Card className={styles.card}>
        <CardContent>
          <Typography variant="h4" className={styles.title}>
            {data.title}
          </Typography>
          <img src={data.url} alt={data.title} className={styles.image} />
          <Typography variant="body1" className={styles.explanation}>
            {data.explanation}
          </Typography>
        </CardContent>
      </Card>
    </div>
  );
};

export default Apod;
