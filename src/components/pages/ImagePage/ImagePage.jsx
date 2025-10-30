import React, { useEffect, useState } from "react";
import styles from "./ImagePage.module.scss";
import { FaPlay } from "react-icons/fa";

const ImagePage = ({
  webBackgoundImage,
  imageOrientation,
  videoRef,
  handleVideoEnd,
  imageUrl,
  buttonText,
  buttonStyle,
  logoUrl,
  onButtonClick,
  pageDuration
}) => {
  const isFullScreen = imageOrientation;

  
  useEffect(() => {
    let timer;
    // Buton görünmez ise otomatik step artışı
    if (isFullScreen === 0) {
      const duration = pageDuration > 0 ? pageDuration : 5; // default 5 saniye
      timer = setTimeout(() => {
        onButtonClick(); // step artıran fonksiyon
      }, duration * 1000);
    }

    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [isFullScreen, pageDuration, onButtonClick]);

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
        {/* <video
          src={videoLink}
          ref={videoRef}
          onEnded={handleVideoEnd}
          controls
          preload="auto"
          autoPlay
          playsInline
          style={isFullScreen ? { width: '100vw', height: '100vh', objectFit: 'cover' } : {}}
        ></video> */}
      </div>
      {isFullScreen !== 0 && (
        <div className={styles.button}>
          <button style={buttonStyle} onClick={onButtonClick}>
            {buttonText}
            <FaPlay size={15} />
          </button>
        </div>
      )}
    </div>
  );
};

export default ImagePage;
