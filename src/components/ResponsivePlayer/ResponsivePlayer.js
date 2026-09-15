import React from "react";
import ReactPlayer from "react-player";
import "./responsive-player.css";

export default function ResponsivePlayer(props) {
  return (
    <>
    <p className="pdf-video-link" style={{display: "none"}}>동영상: <a href={props.url}>{props.url}</a></p>
    <div className="playerWrapper">
      <ReactPlayer
        className="reactPlayer"
        playing={false}
        controls
        url={props.url}
        width="100%"
        height="100%"
      />
    </div>
    </>
  );
}
