export interface product {
  id: number;
  images: string;
  price: number;
  description: string;
  name: string;
  number_of_likes: number;
  rate: number;
  stock: number;
  flash_sale_time: Date;
  flash_sale_percent: number;
  number_of_rate: number;
  id_shop?: number;
}
