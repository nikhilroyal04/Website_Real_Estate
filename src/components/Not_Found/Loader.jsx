import React from "react";
import Lottie from "react-lottie-player";
import loaderAnimation from "../../assets/200-loader.json"; // Update the path if necessary

const Loader = () => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "auto",
        width: "auto",
        backgroundColor: "#fff", // Optional: Set a background color if needed
      }}
    >
      <Lottie
        loop
        animationData={loaderAnimation}
        play
        style={{ width: 500, height: 500 }} // Adjust the size as needed
      />
    </div>
  );
};

export default Loader;
