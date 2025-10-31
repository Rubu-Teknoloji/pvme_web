import React, { useEffect, useRef, useState } from "react";
import styles from "./Home.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { motion, AnimatePresence } from "framer-motion";
import WelcomePage from "../../components/pages/WelcomePage/WelcomePage";
import { FaPlay } from "react-icons/fa";
import VideoPage from "../../components/pages/VideoPage/VideoPage";
import FinishPage from "../../components/pages/FinishPage/FinishPage";
import {
  fetchWebInfo,
  sendVideoTracking,
} from "../../redux/webInfoSlice/webInfoSlice";
import LoadingSpinner from "../../components/Tools/LoadingSpinner/LoadingSpinner";
import { getDeviceInfo } from "../../components/Tools/DeviceInfoLogger/DeviceInfoLogger";
import mocksData from "@/mocks/data.json";
import ImagePage from "../../components/pages/ImagePage/ImagePage";
import ContentPage from "../../components/pages/ContentPage/ContentPage";
import QuestionsPage from "../../components/pages/QuestionsPage/QuestionsPage";

export default function Home() {
  const [deviceInfo, setDeviceInfo] = useState(null);
  const dispatch = useDispatch();
  const { data, loading, error } = useSelector((state) => state.webInfo);
  const [step, setStep] = useState(5);
  const [videoStartTime, setVideoStartTime] = useState(null);
  const videoRef = useRef(null);
  const [videoEndTime, setVideoEndTime] = useState(null);

  console.log("mocksData", mocksData);
  //Cihaz Bilgisi Alma İşlemi
  useEffect(() => {
    const info = getDeviceInfo();
    console.log("Home içinde cihaz bilgisi:", info);
    setDeviceInfo(info); // state'e kaydedebilirsin, backend gönderimi yok
  }, []);

  const incomingUrl = window.location.href;
  useEffect(() => {
    if (incomingUrl) {
      dispatch(fetchWebInfo(incomingUrl));
    }
  }, [dispatch, incomingUrl]);
  const [preloadedVideo, setPreloadedVideo] = useState(null);

  useEffect(() => {
    if (data?.data?.videoUrl) {
      const video = document.createElement("video");
      video.src = data.data.videoUrl;
      video.preload = "auto";
      video.load();
      setPreloadedVideo(data.data.videoUrl);
    }
  }, [data?.data?.videoUrl]);

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
    const enableSound = () => {
      if (videoRef.current) {
        videoRef.current.muted = false;
        videoRef.current.play();
      }
    };

    document.addEventListener("touchstart", enableSound, { once: true });
    return () => document.removeEventListener("touchstart", enableSound);
  }, []);

  const fadeVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
  };

  const handlePlayClick = () => {
    setStep("video");
    const now = new Date();
    setVideoStartTime(now);
    setTimeout(() => {
      videoRef.current?.play();
    }, 100);
  };

  const handleVideoEnd = () => {
    const now = new Date();

    const payload = {
      videoCode: data?.data?.trackingCode,
      videoStartTime,
      videoEndTime: now,
      watchedDuration: 0,
    };

    // Normal video bitiminde Redux ile gönder
    // dispatch(sendVideoTracking(payload));

    setStep((prev) => prev + 1);
    setVideoEndTime(now);
  };

  // Tarayıcı/sekme kapanma durumunu da yakala
  useEffect(() => {
    const handleUnload = () => {
      // ✅ Sadece video izlenirken tracking yap
      if (step !== "video" || !data?.data?.trackingCode || !videoStartTime) {
        return;
      }

      const now = new Date();
      const payload = {
        trackingCode: data.data.trackingCode,
        startDate: videoStartTime,
        endDate: now,
        watchedDuration: 0,
      };

      navigator.sendBeacon(
        "https://admin.goygoy.app/api/web/tracking",
        new Blob([JSON.stringify(payload)], { type: "application/json" })
      );
      fetch("https://admin.goygoy.app/api/web/tracking", {
        method: "POST",
        body: JSON.stringify(payload),
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

  const handleNextStep = () => {
    setStep((prev) => prev + 1);
  };
  if (loading)
    return (
      <div
        style={{
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <LoadingSpinner size={80} color="#32954e" />
      </div>
    );
  console.log("sayfa sayısı", step);
  if (error) return <p>Error: {error}</p>;
  return (
    <section className={styles.homePage}>
      {mocksData?.template?.pages?.length > 0 && (
        <AnimatePresence mode="wait">
          {mocksData.template.pages
            .sort((a, b) => a.pageOrder - b.pageOrder)
            // .filter((_, index) => index === step)
            .filter((mData) => mData.pageNumber === step)
            .map((mData) => (
              <motion.div
                key={mData.pageId}
                className={styles.content}
                initial="hidden"
                animate="visible"
                exit="exit"
                variants={fadeVariants}
                transition={{ duration: 0.5 }}
              >
                {(() => {
                  switch (mData.pageType) {
                    case 0:
                      return (
                        <WelcomePage
                          userName={mData.subjectValue}
                          isButtonVisible={mData.isButtonVisible}
                          pageDuration={mData.pageDuration}
                          title={mData.title}
                          buttonText={mData.buttonText}
                          webBackgoundImage={mData.bgImageUrl}
                          logoUrl={mData.logoUrl}
                          isShowLogo={mData.isShowLogo}
                          subjectStyle={{
                            color: mData.subjectValueColor,
                            fontSize: mData.subjectValueFontSize,
                            fontWeight: mData.subjectValueFontWeight,
                          }}
                          contentStyle={{
                            color: mData.contentColor,
                            fontSize: mData.contentFontSize,
                            fontWeight: mData.contentFontWeight,
                          }}
                          titleStyle={{
                            color: mData.titleColor,
                            fontSize: mData.titleFontSize,
                            fontWeight: mData.titleFontWeight,
                          }}
                          buttonStyle={{
                            color: mData.buttonTextColor,
                            fontSize: mData.buttonTextFontSize,
                            fontWeight: mData.buttonTextFontWeight,
                            backgroundColor: mData.buttonBgColor,
                          }}
                          content={mData.content}
                          onButtonClick={handleNextStep}
                        />
                      );
                    case 1:
                      return (
                        <VideoPage
                          webBackgoundImage={mData.bgImageUrl}
                          videoOrientation={mData.videoOrientation}
                          videoRef={videoRef}
                          handleVideoEnd={handleVideoEnd}
                          videoLink={mData.videoUrl}
                        />
                      );
                    case 2:
                      return (
                        <ImagePage
                          webBackgoundImage={mData.bgImageUrl}
                          imageOrientation={mData.imageOrientation}
                          buttonText={mData.buttonText}
                          logoUrl={mData.logoUrl}
                          isButtonVisible={mData.isButtonVisible}
                          buttonStyle={{
                            color: mData.buttonTextColor,
                            fontSize: mData.buttonTextFontSize,
                            fontWeight: mData.buttonTextFontWeight,
                            backgroundColor: mData.buttonBgColor,
                          }}
                          videoRef={videoRef}
                          handleVideoEnd={handleVideoEnd}
                          imageUrl={mData.imageUrl}
                          onButtonClick={handleNextStep}
                          pageDuration={mData.pageDuration}
                        />
                      );
                    case 3:
                      return (
                        <FinishPage
                          title={mData.title}
                          webBackgoundImage={mData.bgImageUrl}
                          logoUrl={mData.logoUrl}
                          content={mData.content}
                          isShowLogo={mData.isShowLogo}
                          titleStyle={{
                            color: mData.titleColor,
                            fontSize: mData.titleFontSize,
                            fontWeight: mData.titleFontWeight,
                          }}
                          contentStyle={{
                            color: mData.contentColor,
                            fontSize: mData.contentFontSize,
                            fontWeight: mData.contentFontWeight,
                          }}
                        />
                      );
                    case 4:
                      return (
                        <ContentPage
                          onButtonClick={handleNextStep}
                          isButtonVisible={mData.isButtonVisible}
                          pageDuration={mData.pageDuration}
                          buttonText={mData.buttonText}
                          buttonStyle={{
                            color: mData.buttonTextColor,
                            fontSize: mData.buttonTextFontSize,
                            fontWeight: mData.buttonTextFontWeight,
                            backgroundColor: mData.buttonBgColor,
                          }}
                          title={mData.title}
                          webBackgoundImage={mData.bgImageUrl}
                          logoUrl={mData.logoUrl}
                          content={mData.content}
                          isShowLogo={mData.isShowLogo}
                          titleStyle={{
                            color: mData.titleColor,
                            fontSize: mData.titleFontSize,
                            fontWeight: mData.titleFontWeight,
                          }}
                          contentStyle={{
                            color: mData.contentColor,
                            fontSize: mData.contentFontSize,
                            fontWeight: mData.contentFontWeight,
                          }}
                        />
                      );
                    case 5:
                      return (
                        <QuestionsPage
                          question={mData.question}
                          webBackgoundImage={mData.bgImageUrl}
                          logoUrl={mData.logoUrl}
                          content={mData.content}
                          isShowLogo={mData.isShowLogo}
                          questionColor={mData.questionColor}
                          questionStyle={{
                            color: mData.questionColor,
                            fontSize: mData.questionFontSize,
                            fontWeight: mData.questionFontWeight,
                          }}
                          questionAnswers={mData.questionAnswers}
                          questionAnswerStyle={{
                            backgroundColor: mData.questionAnswerColor,
                            fontSize: mData.questionAnswerFontSize,
                            fontWeight: mData.questionAnswerFontWeight,
                          }}
                          contentStyle={{
                            color: mData.contentColor,
                            fontSize: mData.contentFontSize,
                            fontWeight: mData.contentFontWeight,
                          }}
                          buttonText={mData.buttonText}
                          buttonStyle={{
                            color: mData.buttonTextColor,
                            fontSize: mData.buttonTextFontSize,
                            fontWeight: mData.buttonTextFontWeight,
                            backgroundColor: mData.buttonBgColor,
                          }}
                          onButtonClick={handleNextStep}
                        />
                      );
                    default:
                      return null;
                  }
                })()}
              </motion.div>
            ))}
        </AnimatePresence>
      )}
    </section>
  );
}
