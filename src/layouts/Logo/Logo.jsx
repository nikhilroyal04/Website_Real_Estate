import React from "react";
import { Image } from "@chakra-ui/react";
import LogoImage from "../../assets/images/Logo.png";

const Logo = () => {
  return (
    <Image
      src={LogoImage}
      alt="Logo of the website"
      width="200px"
      height="35px"
      objectFit="contain"
    />
  );
};

export default Logo;
