import { useDispatch } from "react-redux";
import { sendFinished } from "../../../redux/webInfoSlice/webInfoSlice";
import styles from "./FinishPage.module.scss";
import { useEffect } from "react";
const FinishPage = ({
  title,
  content,
  titleStyle,
  webBackgoundImage,
  contentStyle,
  isShowLogo,
  logoUrl,
  trackingCode,
}) => {
  const dispatch = useDispatch();

  useEffect(() => {
    if (trackingCode) {
      const finishedData = { trackingCode };
      dispatch(sendFinished({ finishedData }));
    }
  }, [dispatch, trackingCode]);
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
