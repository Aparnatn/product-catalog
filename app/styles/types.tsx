export interface Product {
    id: number;
    title: string;
    description: string;
    category: string;
    price: number;
    image: string;
    quantity: number;
    rating: {
      rate: number;
      count: number;
    };
  }
  