export interface Post {
  id?: string;
  idUser: string;
  message: string;
  image: Blob;
  domain: string;
  date: Date;
}
