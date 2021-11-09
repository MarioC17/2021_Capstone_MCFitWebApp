import React from "react";
import "./Component33.css";

function Component33(props) {
  const { overlapGroup3, typography } = props;

  return (
    <div className="component-3-3">
      <div className="overlap-group3" style={{ backgroundImage: `url(${overlapGroup3})` }}>
        <div className="typography-11 sourcesanspro-semi-bold-silver-25px">{typography}</div>
      </div>
    </div>
  );
}

export default Component33;
