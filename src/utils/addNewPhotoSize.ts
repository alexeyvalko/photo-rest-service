import { PhotoBasic } from 'src/types/unsplash/photos';

export const addNewPhotoSize = (
  photos: PhotoBasic[],
  sizeName: string,
  size: number,
): PhotoBasic[] => {
  const SMALL_SIZE = 'w=400';
  const NEW_SIZE = `w=${size}`;
  const resultsWithNewSize = photos.map((photo) => {
    const smallSizeURlArray = photo.urls.small.split('&');
    const isCanCreateNewSize =
      smallSizeURlArray.lastIndexOf(SMALL_SIZE) === smallSizeURlArray.length - 1;
    if (isCanCreateNewSize) {
      smallSizeURlArray.splice(-1, 1, NEW_SIZE);
      photo.urls[sizeName] = smallSizeURlArray.join('&');
    } else {
      photo.urls[sizeName] = photo.urls.regular;
    }
    return photo;
  });

  return resultsWithNewSize;
};
