export interface Message {
    id: string;
    idSender: string|undefined;
    idReceiver: string|undefined;
    message: string|undefined;
    date: Date;
  }