import React from "react";
import Lottie from "react-lottie-player";
import loaderAnimation from "../../assets/200-NoData.json"; 

const NoData = () => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "auto",
        width: "auto",
        backgroundColor: "#fff", 
      }}
    >
      <Lottie
        loop
        animationData={loaderAnimation}
        play
        style={{ width: 500, height: 500 }}
      />
    </div>
  );
};

export default NoData;
