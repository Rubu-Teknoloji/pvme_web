import React, { useEffect, useRef, useState } from "react";
import styles from "./Home.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { motion, AnimatePresence } from "framer-motion";
import WelcomePage from "../../components/pages/WelcomePage/WelcomePage";
import VideoPage from "../../components/pages/VideoPage/VideoPage";
import FinishPage from "../../components/pages/FinishPage/FinishPage";
import { fetchWebInfo } from "../../redux/webInfoSlice/webInfoSlice";
import LoadingSpinner from "../../components/Tools/LoadingSpinner/LoadingSpinner";
import ImagePage from "../../components/pages/ImagePage/ImagePage";
import ContentPage from "../../components/pages/ContentPage/ContentPage";
import QuestionsPage from "../../components/pages/QuestionsPage/QuestionsPage";

export default function Home() {
  const dispatch = useDispatch();
  const { data, loading, error, trackingCode } = useSelector(
    (state) => state.webInfo
  );
  const [step, setStep] = useState(1);
  const [videoStartTime, setVideoStartTime] = useState(null);
  const videoRef = useRef(null);

  const incomingUrl = window.location.href;

  useEffect(() => {
    if (incomingUrl) {
      dispatch(fetchWebInfo(incomingUrl));
    }
  }, [dispatch, incomingUrl]);

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
  if (error) return <p>Error: {error}</p>;
  return (
    <section className={styles.homePage}>
      {data?.template?.pages?.length > 0 && (
        <AnimatePresence mode="wait">
          {data.template.pages
            // .sort((a, b) => a.pageOrder - b.pageOrder)
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
                          pageId={mData.pageId}
                          data={data}
                          trackingCode={trackingCode}
                          webBackgoundImage={mData.bgImageUrl}
                          videoOrientation={mData.videoOrientation}
                          setStep={setStep}
                          step={step}
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
                          setStep={setStep}
                          pageId={mData.pageId}
                          trackingCode={trackingCode}
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
