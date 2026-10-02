export interface UnsplashPicture {
  id: string;
  alt_description: string | null;
  urls: {
    small: string;
    regular: string;
    full: string;
  };
}
