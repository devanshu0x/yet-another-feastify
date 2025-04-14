// Look for a better way to replace this

import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const ScrollToSection = () => {
  const { hash } = useLocation(); // Get the current hash from URL

  useEffect(() => {
    if (hash) {
      const section = document.querySelector(hash);
      if (section) {
        section.scrollIntoView({ behavior: "smooth" }); // Smooth scrolling
      }
    }
  }, [hash]); // Run when hash changes

  return null;
};

export default ScrollToSection;
