export interface Message {
    id?: string;
    idSender: string;
    idReceiver: string;
    message: string;
    date: Date;
    picture: Blob;
  }