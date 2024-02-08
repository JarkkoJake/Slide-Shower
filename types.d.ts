interface slideImage {
  imageURI: string;
  duration: number;
};

interface slideShow {
  name: string;
  images: slideImage[];
};
