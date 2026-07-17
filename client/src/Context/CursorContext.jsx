import React, { createContext, useContext, useState } from "react";

const CursorContext = createContext();

export const CursorProvider = ({ children }) => {
  // Variants: "default", "text" (Difference), "card" (Glass), "button" (Solid)
  const [cursorVariant, setCursorVariant] = useState("default");
  const [cursorText, setCursorText] = useState(""); 

  // 1. Standard Text Hover (Inverts colors)
  const textEnter = () => setCursorVariant("text");
  const textLeave = () => setCursorVariant("default");
  
  // 2. Cards/Projects (Glass Bubble with optional text like "VIEW")
  const cardEnter = (text = "") => {
    // Filter out "SCROLL" if it's passed from old components
    if (text === "SCROLL") {
        setCursorVariant("default"); 
        setCursorText("");
        return;
    }
    setCursorText(text);
    setCursorVariant("card");
  };
  
  const cardLeave = () => {
    setCursorText("");
    setCursorVariant("default");
  };

  // 3. New Button Effect (Solid Green Circle)
  const buttonEnter = () => setCursorVariant("button");
  const buttonLeave = () => setCursorVariant("default");

  return (
    <CursorContext.Provider value={{ 
      cursorVariant, 
      cursorText, 
      textEnter, 
      textLeave, 
      cardEnter, 
      cardLeave,
      buttonEnter,
      buttonLeave
    }}>
      {children}
    </CursorContext.Provider>
  );
};

export const useCursor = () => useContext(CursorContext);