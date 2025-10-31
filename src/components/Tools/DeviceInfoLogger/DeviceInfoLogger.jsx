// import React, { useEffect } from "react";

// const DeviceInfoLogger = () => {
//   useEffect(() => {
//     const userAgent = navigator.userAgent.toLowerCase();

//     // 🔹 İşletim sistemi tespiti
//     let os = "Bilinmiyor";
//     if (/windows/i.test(userAgent)) os = "Windows";
//     else if (/mac/i.test(userAgent)) os = "macOS";
//     else if (/android/i.test(userAgent)) os = "Android";
//     else if (/iphone|ipad|ipod/i.test(userAgent)) os = "iOS";
//     else if (/linux/i.test(userAgent)) os = "Linux";

//     // 🔹 Tarayıcı tespiti
//     let browser = "Bilinmiyor";
//     if (/chrome|crios/i.test(userAgent)) browser = "Chrome";
//     else if (/safari/i.test(userAgent)) browser = "Safari";
//     else if (/firefox/i.test(userAgent)) browser = "Firefox";
//     else if (/edg/i.test(userAgent)) browser = "Edge";
//     else if (/opera|opr/i.test(userAgent)) browser = "Opera";

//     // 🔹 Cihaz tipi tespiti
//     const isTablet = /tablet|ipad/i.test(userAgent);
//     const isMobile = /mobile/i.test(userAgent) && !isTablet;
//     const deviceType = isTablet ? "Tablet" : isMobile ? "Mobil" : "Masaüstü";

//     // 🔹 Bilgileri yazdır
//     console.log("🖥️ Cihaz Tipi:", deviceType);
//     console.log("💻 İşletim Sistemi:", os);
//     console.log("🌐 Tarayıcı:", browser);
//     console.log("🔍 UserAgent:", navigator.userAgent);
//   }, []);

//   return null; // Sayfada görünmez, sadece log atar
// };

// export default DeviceInfoLogger;

export const getDeviceInfo = () => {
  const userAgent = navigator.userAgent.toLowerCase();

  // İşletim sistemi
  let os = "Bilinmiyor";
  if (/windows/i.test(userAgent)) os = "Windows";
  else if (/mac/i.test(userAgent)) os = "macOS";
  else if (/android/i.test(userAgent)) os = "Android";
  else if (/iphone|ipad|ipod/i.test(userAgent)) os = "iOS";
  else if (/linux/i.test(userAgent)) os = "Linux";

  // Tarayıcı
  let browser = "Bilinmiyor";
  if (/chrome|crios/i.test(userAgent)) browser = "Chrome";
  else if (/safari/i.test(userAgent)) browser = "Safari";
  else if (/firefox/i.test(userAgent)) browser = "Firefox";
  else if (/edg/i.test(userAgent)) browser = "Edge";
  else if (/opera|opr/i.test(userAgent)) browser = "Opera";

  // Cihaz tipi
  const isTablet = /tablet|ipad/i.test(userAgent);
  const isMobile = /mobile/i.test(userAgent) && !isTablet;
  const deviceType = isTablet ? "Tablet" : isMobile ? "Mobil" : "Masaüstü";

  return {
    deviceType,
    os,
    browser,
    userAgent: navigator.userAgent,
  };
};
