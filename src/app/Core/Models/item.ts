export interface IItem {
  _id: string;
  name: string;
  desc: string;
  img: string;
  price: number;
  restuarantId: string; 
}

export interface IItemsRes {
  page: number;
  limit: number;
  totalPages: number;
  totalResult: number;
  data: IItem[];
}

export interface IItemRes {
  message: string;
  data: IItem;
}

