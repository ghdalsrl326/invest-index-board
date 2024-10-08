import {
  IconButton,
  Divider,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  MenuItem,
  Menu,
  Dialog,
  FormControl,
  InputLabel,
  Select,
  SelectChangeEvent,
  Box,
} from "@mui/material";
import SettingsIcon from "@mui/icons-material/Settings";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import PauseIcon from "@mui/icons-material/Pause";
import StopIcon from "@mui/icons-material/Stop";
import DeleteIcon from "@mui/icons-material/Delete";
import ImageSearchIcon from "@mui/icons-material/ImageSearch";
import React, { useState } from "react";
import ImageUploading, { ImageListType } from "react-images-uploading";
import "./SlideSettings.scss";
import { useRecoilState } from "recoil";
import {
  carouselInterval,
  carouselPlayState,
  imageState,
} from "../store/RecoilStore";

const SlideSettings = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const menuOpen = Boolean(anchorEl);
  const handleMenuClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const [intervalDialogOpen, setIntervalDialogOpen] = useState<boolean>(false);
  const [interval, setInterval] = useRecoilState(carouselInterval);
  const intervalSteps = Array.from(
    { length: 10 },
    (value, i) => (i + 1) * 1000
  );
  const handleIntervalDialogOpen = () => {
    setIntervalDialogOpen(true);
  };
  const handleIntervalDialogClose = () => {
    setIntervalDialogOpen(false);
  };
  const handleIntervalChange = (event: SelectChangeEvent) => {
    setInterval(event.target.value as string);
  };

  const [playState, setPlayState] = useRecoilState(carouselPlayState);

  const handleChangePlayState = () => {
    setPlayState(!playState);
  };

  const [imageDialogOpen, setImageDialogOpen] = useState<boolean>(false);
  const handleImageDialogOpen = () => {
    setImageDialogOpen(true);
  };
  const handleImageDialogClose = () => {
    setImageDialogOpen(false);
  };
  const [images, setImages] = useRecoilState(imageState);
  const maxNumber = 50;
  const handleChangeImage = (
    imageList: ImageListType,
    addUpdateIndex: number[] | undefined
  ) => {
    // data for submit
    setImages(imageList as never[]);
    console.log(images, addUpdateIndex);
  };

  return (
    <>
      <IconButton className="btn-slidesettings" onClick={handleChangePlayState}>
        {playState ? (
          <PlayArrowIcon fontSize="small" />
        ) : (
          <PauseIcon fontSize="small" />
        )}
      </IconButton>
      <IconButton
        className="btn-slidesettings"
        aria-controls={menuOpen ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={menuOpen ? "true" : undefined}
        onClick={handleMenuClick}
      >
        <SettingsIcon fontSize="small" />
      </IconButton>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={menuOpen}
        onClose={handleMenuClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        <MenuItem onClick={handleImageDialogOpen}>
          이미지 업로드 & 삭제
        </MenuItem>
        <Dialog
          open={imageDialogOpen}
          onClose={handleImageDialogClose}
          fullWidth
        >
          <DialogTitle>{"이미지 업로드 & 삭제"}</DialogTitle>
          <DialogContent className="image-dialog-content">
            <ImageUploading
              multiple
              value={images}
              onChange={handleChangeImage}
              maxNumber={maxNumber}
            >
              {({
                imageList,
                onImageUpload,
                onImageRemoveAll,
                onImageUpdate,
                onImageRemove,
                isDragging,
                dragProps,
                errors,
              }) => (
                <>
                  {errors && (
                    <div>
                      {errors?.maxNumber && (
                        <span>
                          최대 이미지 업로드 개수 {`"${maxNumber}"`}개를
                          초과했습니다.
                        </span>
                      )}
                      {errors?.acceptType && (
                        <span>선택한 파일의 확장자는 업로드할 수 없습니다</span>
                      )}
                    </div>
                  )}
                  <Box className="uploadimage-wrapper">
                    <Button
                      style={isDragging ? { color: "red" } : undefined}
                      onClick={onImageUpload}
                      startIcon={<ImageSearchIcon />}
                      size="large"
                      {...dragProps}
                    >
                      업로드할 이미지 선택
                    </Button>
                    &nbsp;
                    <Button
                      onClick={onImageRemoveAll}
                      startIcon={<DeleteIcon />}
                      size="large"
                    >
                      전체 이미지 삭제
                    </Button>
                    <Box className="box-image-items">
                      {imageList.map((image, index) => (
                        <div key={index} className="image-items">
                          <img src={image.dataURL} alt="" width="100" />
                          <div className="image-items-btn-wrapper">
                            <Button
                              onClick={() => onImageUpdate(index)}
                              size={"medium"}
                            >
                              교체
                            </Button>
                            <Button
                              onClick={() => onImageRemove(index)}
                              size={"medium"}
                            >
                              제거
                            </Button>
                          </div>
                        </div>
                      ))}
                    </Box>
                  </Box>
                </>
              )}
            </ImageUploading>
          </DialogContent>
          <DialogActions>
            <Button
              onClick={handleImageDialogClose}
              variant="contained"
              autoFocus
              size="large"
            >
              닫기
            </Button>
          </DialogActions>
        </Dialog>
        <Divider />
        <MenuItem onClick={handleIntervalDialogOpen}>이미지 전환 간격</MenuItem>
        <Dialog
          open={intervalDialogOpen}
          onClose={handleIntervalDialogClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
            {"이미지 전환 간격(ms)"}
          </DialogTitle>
          <DialogContent
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "flex-end",
              minWidth: "20vw",
              minHeight: "8vh",
            }}
          >
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Interval</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={interval}
                label="Interval"
                onChange={handleIntervalChange}
              >
                {intervalSteps.map((intervalStep) => {
                  return (
                    <MenuItem value={intervalStep}>{intervalStep}</MenuItem>
                  );
                })}
              </Select>
            </FormControl>
          </DialogContent>
          <DialogActions>
            <Button
              onClick={handleIntervalDialogClose}
              variant="contained"
              size="large"
              autoFocus
            >
              닫기
            </Button>
          </DialogActions>
        </Dialog>
      </Menu>
    </>
  );
};

export default SlideSettings;
