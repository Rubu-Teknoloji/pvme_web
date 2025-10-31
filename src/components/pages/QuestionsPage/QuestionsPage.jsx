import styles from "./QuestionsPage.module.scss";
const QuestionsPage = ({
  question,
  questionStyle,
  webBackgoundImage,
  isShowLogo,
  logoUrl,
  questionColor,
  questionAnswers,
  questionAnswerStyle,
  buttonStyle,
  buttonText,
  onButtonClick,
}) => {
  console.log("soru", questionAnswers);
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
          {questionAnswers?.map((answers, answersIndex) => (
            <li key={answersIndex} style={questionAnswerStyle}>
              {answers.text}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default QuestionsPage;
