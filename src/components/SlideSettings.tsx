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
  const [interval, setInterval] = useState<string>("10");
  const handleIntervalDialogOpen = () => {
    setIntervalDialogOpen(true);
  };
  const handleIntervalDialogClose = () => {
    setIntervalDialogOpen(false);
  };
  const handleIntervalChange = (event: SelectChangeEvent) => {
    setInterval(event.target.value as string);
  };

  const [imageDialogOpen, setImageDialogOpen] = useState<boolean>(false);
  const handleImageDialogOpen = () => {
    setImageDialogOpen(true);
  };
  const handleImageDialogClose = () => {
    setImageDialogOpen(false);
  };
  const [images, setImages] = useState<ImageListType>([]);
  const maxNumber = 69;
  const handleChangeImage = (
    imageList: ImageListType,
    addUpdateIndex: number[] | undefined
  ) => {
    // data for submit
    console.log(imageList, addUpdateIndex);
    setImages(imageList);
  };

  return (
    <>
      <IconButton className="btn-slidesettings">
        <PlayArrowIcon fontSize="small" />
      </IconButton>
      <IconButton className="btn-slidesettings">
        <PauseIcon fontSize="small" />
      </IconButton>
      <IconButton className="btn-slidesettings">
        <StopIcon fontSize="small" />
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
              }) => (
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
              )}
            </ImageUploading>
          </DialogContent>
          <DialogActions>
            <Button
              onClick={handleImageDialogClose}
              variant="outlined"
              size="large"
            >
              취소
            </Button>
            <Button
              onClick={handleImageDialogClose}
              variant="contained"
              autoFocus
              size="large"
            >
              적용
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
                <MenuItem value={10}>10</MenuItem>
                <MenuItem value={20}>20</MenuItem>
                <MenuItem value={30}>30</MenuItem>
                <MenuItem value={40}>40</MenuItem>
                <MenuItem value={50}>50</MenuItem>
              </Select>
            </FormControl>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleIntervalDialogClose}>취소</Button>
            <Button onClick={handleIntervalDialogClose} autoFocus>
              적용
            </Button>
          </DialogActions>
        </Dialog>
      </Menu>
    </>
  );
};

export default SlideSettings;
