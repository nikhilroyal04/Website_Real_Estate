import React from "react";
import Lottie from "react-lottie-player";
import loaderAnimation from "../../assets/200-loader.json"; 

const Loader = () => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "auto",
        width: "auto",
        backgroundColor: "#fff", 
        marginBottom: "50px",
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

export default Loader;
