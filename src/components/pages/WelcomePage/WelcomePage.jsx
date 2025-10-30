import React, { useState } from "react";
import styles from "./WelcomePage.module.scss";
import { FaPlay } from "react-icons/fa";

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
  onButtonClick
}) => {
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
          <div className={styles.buttonVideo}>
            <button
              style={buttonStyle}
              onClick={onButtonClick}
            >
              {buttonText}
              <FaPlay size={15} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WelcomePage;
