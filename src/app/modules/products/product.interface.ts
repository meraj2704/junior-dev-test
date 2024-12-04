export interface ProductI {
  name: string;
  price: number;
  description: string;
  quantity: number;
  active: boolean;
  image: string;
  isDeleted?: boolean;
}
