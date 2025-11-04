import { useState } from "react";
import styles from "./QuestionsPage.module.scss";
import { sendQuestion } from "../../../redux/webInfoSlice/webInfoSlice";
import { useDispatch } from "react-redux";
const QuestionsPage = ({
  question,
  questionStyle,
  webBackgoundImage,
  isShowLogo,
  logoUrl,
  questionColor,
  questionAnswers,
  questionAnswerStyle,
  setStep,
  pageId,
  trackingCode
}) => {
  const [selectedAnswerId, setSelectedAnswerId] = useState(null);
    const dispatch = useDispatch();
    
const handleAnswerClick = (id) => {
  setSelectedAnswerId(id); 
     const questionData = {
        trackingCode:trackingCode,
        pageId:pageId,
        answerId:id,
    };
    dispatch(sendQuestion({ questionData: questionData }));
    setStep((prev) => prev + 1);
};
  return (
    <div
      className={styles.questionsPage}
      style={{ backgroundImage: `url(${webBackgoundImage})` }}
    >
      {isShowLogo ? (
        <div className={styles.logo}>
          <img src={logoUrl} alt="logo" />
        </div>
      ) : null}
      <div className={styles.content}>
        <div className={styles.questionContent}>
          <p style={questionStyle}>{question}</p>
        </div>
        <ul className={styles.questionAnswers}>
  {questionAnswers?.map((answers, index) => {
    const animationClass = index % 2 === 0 ? styles.fadeLeft : styles.fadeRight;
    const animationDelay = `${index * 0.2}s`;

    return (
      <li
        key={index}
        onClick={() => handleAnswerClick(answers.id)}
        className={animationClass}
        style={{ ...questionAnswerStyle, animationDelay }}
      >
        {answers.text}
      </li>
    );
  })}
</ul>

      </div>
    </div>
  );
};

export default QuestionsPage;
