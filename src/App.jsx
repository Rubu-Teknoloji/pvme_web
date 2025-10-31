import Home from "./pages/Home/Home"
import styles from './App.module.scss';
import 'aos/dist/aos.css';
import { useEffect } from "react";

function App() {
  useEffect(() => {
    const setFullHeight = () => {
      const vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty("--vh", `${vh}px`);
    };

    setFullHeight();
    window.addEventListener("resize", setFullHeight);

    // Cleanup
    return () => window.removeEventListener("resize", setFullHeight);
  }, []);
  return (
    <div className={styles.app}>
      <Home/>
    </div>
  )
}

export default App
