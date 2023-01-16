import { PhotoBasic } from 'src/types/unsplash/photos';

interface newPhotoLinkType {
  sizeName: string;
  size: number;
}

export const addNewPhotoSize = (
  photos: PhotoBasic[],
  options: newPhotoLinkType[],
): PhotoBasic[] => {
  const resultsWithNewSizes = photos.map((photo) => {
    options.forEach(({ size, sizeName }) => {
      const NEW_SIZE = `q=80&w=${size}`;
      photo.urls[sizeName] = `${photo.urls.raw}?${NEW_SIZE}`;
    });
    return photo;
  });

  return resultsWithNewSizes;
};
