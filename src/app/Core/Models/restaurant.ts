export interface IRestaurant{
    _id : string,
    name : string,
    desc: string,
    phone: string,
    address: string,
    img: string,
    category: string
}

export interface IRestaurantsRes{       // To All Restaurants
    page: number,
    limit: number,
    totalPages: number,
    totalResult: number,
    result: IRestaurant[]
}

export interface IRestaurantRes{        // To one Restaurant
    message: string,
    data: IRestaurant
}

export interface IRestaurantRelatedRes{
    message: string,
    data: IRestaurant[]
}

export interface IPaginatedResult<T> {
  page: number;
  limit: number;
  totalPages: number;
  totalResult: number;
  result: T[];
}