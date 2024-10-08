import React from "react";
import Lottie from "react-lottie-player";
import loaderAnimation from "../../assets/201-fetch.json"; 

const Fetch201 = () => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "auto",
        width: "auto",
      }}
    >
      <Lottie
        loop
        animationData={loaderAnimation}
        play
        style={{ width: 150, height: 150 }}
      />
    </div>
  );
};

export default Fetch201;
