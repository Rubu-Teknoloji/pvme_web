import styles from "./FinishPage.module.scss";
const FinishPage = ({
  title,
  content,
  titleStyle,
  webBackgoundImage,
  contentStyle,
  isShowLogo,
  logoUrl,
}) => {
  return (
    <div
      className={styles.finishPage}
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
        </div>
      </div>
    </div>
  );
};

export default FinishPage;
