import React from "react";
import "./Thumbnail.css";

const Thumbnail = props => (
  <div
    className="thumbnail"
    role="img"
    style={{
      backgroundImage: `url(${props.src})`
    }}
  />
);

export default Thumbnail;
