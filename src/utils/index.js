import {imageList} from "./imageList";

export const findImage = name => imageList.find(image => image.name === name).src;