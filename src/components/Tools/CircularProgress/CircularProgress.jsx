import React, { useEffect, useState } from "react";
import styles from "./CircularProgress.module.scss";

const CircularProgress = ({
  duration = 5000,
  size = 100,
  color = "#000",
}) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = 50;
    let elapsed = 0;

    const timer = setInterval(() => {
      elapsed += interval;
      setProgress(Math.min((elapsed / duration) * 100, 100));
      if (elapsed >= duration) clearInterval(timer);
    }, interval);

    return () => clearInterval(timer);
  }, [duration]);

  const radius = 15.9155;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (progress / 100) * circumference;
  const remainingSeconds = ((duration * (100 - progress)) / 100 / 1000).toFixed(
    1
  );

  return (
    <div className={styles.container} style={{ width: size, height: size }}>
      <svg
        className={styles.progressRing}
        width={size}
        height={size}
        viewBox="0 0 36 36"
      >
        {/* Gri arka daire */}
        <path
          className={styles.backgroundCircle}
          d="M18 2.0845
             a 15.9155 15.9155 0 0 1 0 31.831
             a 15.9155 15.9155 0 0 1 0 -31.831"
        />

        {/* Renkli ilerleme */}
        <path
          className={styles.progressCircle}
          d="M18 2.0845
             a 15.9155 15.9155 0 0 1 0 31.831
             a 15.9155 15.9155 0 0 1 0 -31.831"
          style={{
            stroke: color,
            strokeDasharray: circumference,
            strokeDashoffset: offset,
          }}
        />

        {/* Ortadaki süre */}
        <text x="18" y="20.5" className={styles.timeText}>
          {remainingSeconds}s
        </text>
      </svg>
    </div>
  );
};

export default CircularProgress;
