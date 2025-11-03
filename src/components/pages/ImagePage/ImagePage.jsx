import React, { useEffect, useState } from "react";
import styles from "./ImagePage.module.scss";
import CircularProgress from "../../Tools/CircularProgress/CircularProgress";
import { GrFormNextLink, GrLinkNext } from "react-icons/gr";

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


    if (!isButtonVisible) {
      const duration = pageDuration > 0 ? pageDuration : 5; 
      timer = setTimeout(() => {
        onButtonClick(); 
      }, duration * 1000); 
    }

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
              duration={pageDuration * 1000}
              size={60}
              color="#fff"
            />
          </div>
        )}
      </div>
      {/* {isButtonVisible && (
        <div className={styles.button}>
          <button style={buttonStyle} onClick={onButtonClick} className={styles.fadeDown}>
            {buttonText}
          </button>
        </div>
      )} */}
            {isButtonVisible && (
        <div className={`${styles.Applebutton} ${styles.fadeDown}`} style={buttonStyle} onClick={onButtonClick}>
          <div className={`${styles.nextBox}`} >
            <GrLinkNext />
          </div>
        </div>
      )}
    </div>
  );
};

export default ImagePage;
