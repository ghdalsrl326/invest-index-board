import { makeAutoObservable } from "mobx";
import { ImageListType } from "react-images-uploading";

class Store {
  imageList: ImageListType = [];

  constructor() {
    makeAutoObservable(this);
  }

  setImageList = (imageList: ImageListType) => {
    this.imageList = imageList;
  };

  handleChangeImage = (
    imageList: ImageListType,
    addUpdateIndex: number[] | undefined
  ) => {
    // data for submit
    console.log(imageList, addUpdateIndex);
    this.setImageList(imageList);
  };
}

const AppStore = new Store();
export default AppStore;
