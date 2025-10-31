import React, { useState } from "react";
import styles from "./VideoPage.module.scss";

const VideoPage = ({
  webBackgoundImage,
  videoOrientation,
  videoRef,
  handleVideoEnd,
  videoLink,
}) => {
  const isFullScreen = videoOrientation;

  return (
    <div
      className={styles.videoPage}
      style={{ backgroundImage: `url(${webBackgoundImage})` }}
    >
      {isFullScreen == 0 && (
        <div className={styles.horizontalVideo}>
          <img src="/horizontalVideo.png" alt="horizontalVideo" />
          <p>Videoyu tam ekranda izlemek için telefonunuzu çeviriniz.</p>
        </div>
      )}

      <div className={isFullScreen ? styles.videoFullScreen : styles.video}>
        <video
          src={videoLink}
          ref={videoRef}
          onEnded={handleVideoEnd}
          controls
          preload="auto"
          autoPlay
          playsInline
          style={
            isFullScreen
              ? { width: "100vw", height: "100vh", objectFit: "cover" }
              : {}
          }
        ></video>
      </div>
    </div>
  );
};

export default VideoPage;
