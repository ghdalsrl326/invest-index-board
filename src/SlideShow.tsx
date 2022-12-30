import { Box } from "@mui/material";
import React from "react";
import "./SlideShow.scss";
import Carousel from "react-material-ui-carousel";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";

const SlideShow = () => {
  return (
    <Carousel
      className="carousel"
      NextIcon={<NavigateNextIcon sx={{ color: "white" }} />}
      PrevIcon={<NavigateBeforeIcon sx={{ color: "white" }} />}
    >
      <div className="img-container">
        <img className="image" src="https://picsum.photos/500/300" alt="test" />
      </div>
    </Carousel>
  );
};

export default SlideShow;
