import { useEffect } from "react";
import CircularProgress from "../../Tools/CircularProgress/CircularProgress";
import styles from "./ContentPage.module.scss";
const ContentPage = ({
  title,
  content,
  titleStyle,
  webBackgoundImage,
  contentStyle,
  isShowLogo,
  logoUrl,
  buttonText,
  buttonStyle,
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
      className={styles.contentPage}
      style={{ backgroundImage: `url(${webBackgoundImage})` }}
    >
      {isShowLogo ? (
        <div className={styles.logo}>
          <img src={logoUrl} alt="logo" />
        </div>
      ) : null}
      <div className={styles.content}>
        <p style={titleStyle}>{title}</p>
        <div className={styles.textContent}>
          <p style={contentStyle}>{content}</p>
          {isButtonVisible && (
            <div className={styles.button}>
              <button style={buttonStyle} onClick={onButtonClick}>
                {buttonText}
              </button>
            </div>
          )}
        </div>
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
    </div>
  );
};

export default ContentPage;
