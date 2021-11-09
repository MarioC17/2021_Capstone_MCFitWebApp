import React from "react";
import "./Component43.css";

function Component43(props) {
  const { overlapGroup4, typography } = props;

  return (
    <div className="component-4-3">
      <div className="overlap-group4" style={{ backgroundImage: `url(${overlapGroup4})` }}>
        <div className="typography-12 sourcesanspro-semi-bold-silver-25px">{typography}</div>
      </div>
    </div>
  );
}

export default Component43;
