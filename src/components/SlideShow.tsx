import { Box } from "@mui/material";
import React from "react";
import "./SlideShow.scss";
import Carousel from "react-material-ui-carousel";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";
import {
  carouselPlayState,
  carouselInterval,
  imageState,
} from "../store/RecoilStore";
import { useRecoilValue } from "recoil";
import { ImageListType } from "react-images-uploading";

const SlideShow = () => {
  const images: ImageListType = useRecoilValue(imageState);
  const interval: number = useRecoilValue(carouselInterval);
  const playState: boolean = useRecoilValue(carouselPlayState);

  return (
    <Carousel
      className="carousel"
      NextIcon={<NavigateNextIcon sx={{ color: "white" }} />}
      PrevIcon={<NavigateBeforeIcon sx={{ color: "white" }} />}
      animation="slide"
      interval={interval}
      autoPlay={playState}
      stopAutoPlayOnHover={false}
    >
      {images.map((image, index) => (
        <div className="img-container">
          <img className="image" src={image.dataURL} alt="" />
        </div>
      ))}
    </Carousel>
  );
};

export default SlideShow;
