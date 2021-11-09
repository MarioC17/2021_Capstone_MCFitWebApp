import React from "react";
import "./Component13.css";

function Component13(props) {
  const { overlapGroup6, typography } = props;

  return (
    <div className="component-1-3">
      <div className="overlap-group6" style={{ backgroundImage: `url(${overlapGroup6})` }}>
        <div className="typography-14">{typography}</div>
      </div>
    </div>
  );
}

export default Component13;
