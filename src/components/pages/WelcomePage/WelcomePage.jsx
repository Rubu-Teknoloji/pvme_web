import React, { useEffect, useState } from "react";
import styles from "./WelcomePage.module.scss";
import { FaPlay } from "react-icons/fa";
import CircularProgress from "../../Tools/CircularProgress/CircularProgress";

const WelcomePage = ({
  userName,
  title,
  content,
  webBackgoundImage,
  buttonText,
  buttonStyle,
  titleStyle,
  logoUrl,
  isShowLogo,
  contentStyle,
  subjectStyle,
  onButtonClick,
  isButtonVisible,
  pageDuration,
}) => {
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
      className={styles.welcomePage}
      style={{ backgroundImage: `url(${webBackgoundImage})` }}
    >
      {isShowLogo ? (
        <div className={styles.logo}>
          <img src={logoUrl} alt="logo" />
        </div>
      ) : null}
      <div className={styles.content}>
        <p style={titleStyle}>{title}</p>
        <h2 style={subjectStyle}>
          <span>{userName}</span>
        </h2>
        <div className={styles.textContent}>
          <p style={contentStyle}>{content}</p>
          {isButtonVisible && (
            <div className={styles.buttonVideo}>
              <button style={buttonStyle} onClick={onButtonClick} className={styles.fadeDown}>
                {buttonText}
              </button>
            </div>
          )}
        </div>
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
    </div>
  );
};

export default WelcomePage;
