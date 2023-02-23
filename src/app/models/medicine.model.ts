export interface Medicine {
  id?: string;
  name: string;
  description: string;
  image: string;
}

export interface MedicineBox {
  id?: string;
  idReceiver: string;
  name: string;
  description: string;
  image: string;
}
