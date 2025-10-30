// LoadingSpinner.jsx
import React from "react";
// import './LoadingSpinner.css';
import styles from './LoadingSpinner.module.scss';


const LoadingSpinner = ({ size = 60, color = "#4f46e5" }) => {
  return (
    <div className={styles.spinnerContainer}>
      <div
        className={styles.spinner}
        style={{ width: size, height: size, borderColor: `${color} transparent ${color} transparent`,display:"flex",alignItems:"center",justifyContent:"center"}}
      >
      </div>
    </div>
  );
};

export default LoadingSpinner;
