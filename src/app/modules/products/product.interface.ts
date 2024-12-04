export interface ProductI {
  name: string;
  price: number;
  discountPercentage: number;
  discountedPrice: number;
  description: string;
  quantity: number;
  active: boolean;
  image: string;
  isDeleted?: boolean;
  wishList?: boolean;
}
