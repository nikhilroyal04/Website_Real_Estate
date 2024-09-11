import React from "react";
import { Image } from "@chakra-ui/react";
import LogoImage from "../../assets/images/Logo.png";
import { useNavigate } from "react-router-dom";

const Logo = () => {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate("/");
  };
  return (
    <Image
      src={LogoImage}
      alt="Logo of the website"
      width="200px"
      height="35px"
      objectFit="contain"
      onClick={handleClick}
      cursor="pointer"
    />
  );
};

export default Logo;
