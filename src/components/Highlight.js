import React from "react";

export const Highlight = ({ children, color }) => (
  <span
    style={{
      backgroundColor: color ?? "#25c2a0",
      borderRadius: "2px",
      color: "#fff",
      padding: "0.2rem",
    }}
  >
    {children}
  </span>
);
