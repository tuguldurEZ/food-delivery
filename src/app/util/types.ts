export type CategoryType = {
  _id: string;
  categoryName: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
};
export type FoodType = {
  category: CategoryType;
  createdAt: string;
  updatedAt: string;
  foodName: string;
  image: string;
  ingredients: string;
  price: number;
  __v: number;
  _id: string;
};

export type User = {
  email: string;
  password: string;
  orderedFoods: string[];
  role: string;
  createdAt: string;
  updatedAt: string;
  orderFoods: [];
  __v: number;
};
export type Basket = {
  food: FoodType;
  count: number;
};
