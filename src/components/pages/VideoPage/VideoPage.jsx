import React, { useEffect, useRef, useState } from "react";
import styles from "./VideoPage.module.scss";
import { useDispatch } from "react-redux";
import { sendVideoTracking } from "../../../redux/webInfoSlice/webInfoSlice";

const VideoPage = ({
  webBackgoundImage,
  videoOrientation,
  videoLink,
  pageId,
  trackingCode,
  step,
  setStep,
  pageType,
  data,
}) => {
  const isFullScreen = videoOrientation;
  const dispatch = useDispatch();
  const [videoStartTime, setVideoStartTime] = useState(null);
  const [preloadedVideo, setPreloadedVideo] = useState(null);
  const videoRef = useRef(null);
  const [isMuted, setIsMuted] = useState(false); // 🔹 Yeni state
  const [showSoundButton, setShowSoundButton] = useState(false);

  // 🔸 iPhone tespiti
  useEffect(() => {
    const isIOS =
      /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
    setIsMuted(isIOS); // iPhone ise muted = true
    setShowSoundButton(isIOS);
  }, []);

  const formatTurkishDate = (date) => {
    if (!date) return null;
    return date.toLocaleString("tr-TR", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });
  };
  // Video başladığında çağrılacak
  const handleVideoStart = () => {
    if (!videoStartTime) {
      setVideoStartTime(new Date()); // StartDate al
    }
  };
  // Video bittiğinde çağrılacak
  const handleVideoEnd = () => {
    const now = new Date(); // EndDate

    const trackingData = {
      trackingCode: trackingCode,
      pageId: pageId,
      startDate: formatTurkishDate(videoStartTime),
      endDate: formatTurkishDate(now),
    };

    dispatch(sendVideoTracking({ trackingData: trackingData }));
    setStep((prev) => prev + 1);
  };

  useEffect(() => {
    if (videoLink) {
      const video = document.createElement("video");
      video.src = videoLink;
      video.preload = "auto";
      video.load();
      setPreloadedVideo(videoLink);
    }
  }, [videoLink]);

  useEffect(() => {
    const handleOrientationChange = () => {
      if (
        window.screen.orientation?.type?.startsWith("landscape") &&
        videoRef.current
      ) {
        if (videoRef.current.requestFullscreen) {
          videoRef.current.requestFullscreen();
        } else if (videoRef.current.webkitEnterFullscreen) {
          videoRef.current.webkitEnterFullscreen();
        }
      }
    };

    window.addEventListener("orientationchange", handleOrientationChange);

    return () => {
      window.removeEventListener("orientationchange", handleOrientationChange);
    };
  }, []);
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleVolumeChange = () => {
      // 🔊 Ses aktifse (muted değil ve volume > 0)
      if (!video.muted && video.volume > 0) {
        setShowSoundButton(false);
        setIsMuted(false);
      }
      // 🔇 Ses kapalıysa (muted true veya volume 0)
      else {
        setShowSoundButton(true);
        setIsMuted(true);
      }
    };

    video.addEventListener("volumechange", handleVolumeChange);

    return () => {
      video.removeEventListener("volumechange", handleVolumeChange);
    };
  }, []);

  // Tarayıcı/sekme kapanma durumunu da yakala
  useEffect(() => {
    const handleUnload = () => {
      // ✅ Sadece video izlenirken tracking yap
      if (pageType !== 1 || trackingCode || !videoStartTime) {
        return;
      }
      const now = new Date();
      const trackingData = {
        trackingCode: trackingCode,
        pageId: pageId,
        startDate: videoStartTime,
        endDate: now,
      };

      navigator.sendBeacon(
        "https://admin.pvme.net/api/pvme/tracking",
        new Blob([JSON.stringify(trackingData)], { type: "application/json" })
      );
      fetch("https://admin.pvme.net/api/pvme/tracking", {
        method: "POST",
        body: JSON.stringify(trackingData),
        headers: { "Content-Type": "application/json" },
        keepalive: true,
      });
    };
    window.addEventListener("beforeunload", handleUnload);
    window.addEventListener("pagehide", handleUnload);

    return () => {
      window.removeEventListener("beforeunload", handleUnload);
      window.removeEventListener("pagehide", handleUnload);
    };
  }, [data, videoStartTime, step]);

  // Ses açma butonuna tıklayınca
  const handleUnmute = () => {
    if (videoRef.current) {
      videoRef.current.muted = false;
      videoRef.current.play();
      setShowSoundButton(false); // Butonu gizle
    }
  };
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
          onPlay={handleVideoStart}
          onEnded={handleVideoEnd}
          controls
          preload="auto"
          muted={isMuted}
          autoPlay
          playsInline
          webkit-playsinline="true"
          style={
            isFullScreen
              ? {
                  width: "100vw",
                  height: "100vh",
                  objectFit: "contain",
                  backgroundColor: "black",
                }
              : {}
          }
        ></video>
        {/* Ses açma butonu */}
        {showSoundButton && (
          <button
            onClick={handleUnmute}
            style={{
              position: "absolute",
              bottom: "100px",
              right: "10px",
              background: "rgba(0,0,0,0.5)",
              color: "white",
              border: "none",
              borderRadius: "50%",
              width: "75px",
              height: "75px",
              fontSize: "35px",
              cursor: "pointer",
            }}
          >
            {isMuted ? "🔇" : "🔊"}
          </button>
        )}
      </div>
    </div>
  );
};

export default VideoPage;
