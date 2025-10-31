import React, { useEffect, useState } from "react";
import styles from "./ImagePage.module.scss";
import CircularProgress from "../../Tools/CircularProgress/CircularProgress";

const ImagePage = ({
  webBackgoundImage,
  imageOrientation,
  imageUrl,
  buttonText,
  buttonStyle,
  logoUrl,
  onButtonClick,
  pageDuration,
  isButtonVisible,
}) => {
  const isFullScreen = imageOrientation;

  useEffect(() => {
    let timer;

    // 🔹 Eğer buton görünmüyorsa (false) otomatik geçiş aktif olsun
    if (!isButtonVisible) {
      const duration = pageDuration > 0 ? pageDuration : 5; // default 5 saniye
      timer = setTimeout(() => {
        onButtonClick(); // step artıran fonksiyon
      }, duration * 1000); // 100000 değil, 1000 olmalı (saniye → ms)
    }

    // 🔹 Component unmount olduğunda timer temizlensin
    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [isButtonVisible, pageDuration, onButtonClick]);

  return (
    <div
      className={styles.imagePage}
      style={{ backgroundImage: `url(${webBackgoundImage})` }}
    >
      {isFullScreen !== 0 && (
        <div className={styles.logo}>
          <img src={logoUrl} alt="logo" />
        </div>
      )}

      <div className={isFullScreen ? styles.videoFullScreen : styles.image}>
        <img src={imageUrl} alt="horizontalVideo" />
        {!isButtonVisible && (
          <div className={styles.progress}>
            <CircularProgress
              duration={pageDuration}
              size={60}
              color="#3bd363"
            />
          </div>
        )}
      </div>
      {isButtonVisible && (
        <div className={styles.button}>
          <button style={buttonStyle} onClick={onButtonClick}>
            {buttonText}
          </button>
        </div>
      )}
    </div>
  );
};

export default ImagePage;
