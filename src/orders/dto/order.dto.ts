export type Order = {
  id: string;
  client: string;
  table: string;
  paymethod: string;
};

export type Product = {
  order_id: string;
  id: string;
  name: string;
  price: string;
  quantity: number;
};
