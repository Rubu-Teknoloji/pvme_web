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
  onButtonClick
}) => {
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
                    <div className={styles.buttonVideo}>
                      <button
                        style={buttonStyle}
                        onClick={onButtonClick}
                      >
                        {buttonText}
                      </button>
                    </div>
        </div>
      </div>
    </div>
  );
};

export default ContentPage;
