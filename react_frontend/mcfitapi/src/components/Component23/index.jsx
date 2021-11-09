import React from "react";
import "./Component23.css";

function Component23(props) {
  const { overlapGroup5, typography } = props;

  return (
    <div className="component-2-3">
      <div className="overlap-group5" style={{ backgroundImage: `url(${overlapGroup5})` }}>
        <div className="typography-13 sourcesanspro-semi-bold-silver-25px">{typography}</div>
      </div>
    </div>
  );
}

export default Component23;
