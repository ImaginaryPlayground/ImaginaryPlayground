import React from "react";

const InputError = ({ text, style }) => {
  return (
    <div
      style={{
        fontFamily: "IBM Plex Sans KR, sans-serif",
        color: "#d32f2f",
        ...style,
      }}
    >
      {text}
    </div>
  );
};

export default InputError;
