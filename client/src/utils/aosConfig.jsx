// src/utils/aosConfig.js
import AOS from "aos";
import "aos/dist/aos.css";

export const initAOS = () => {
  AOS.init({
    duration: 1000, // animation duration in ms
    easing: "ease-in-out",
    once: true, // only animate once
    offset: 100, // trigger point
  });
};
