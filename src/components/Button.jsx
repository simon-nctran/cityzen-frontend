import React from "react";

// Reuseable Button Component
export default function Button({ className, children, onClick, ...props }) {
  return (
    <div className={`btn ${className}`} onClick={onClick} {...props}>
      {children}
    </div>
  );
}
