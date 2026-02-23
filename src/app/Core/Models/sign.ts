export interface IReg{
    _id?: string,
    role?: string,
    name: string,
    email: string,
    password: string,
}

export interface ILogin {
    email: string,
    password: string
}

export interface ILoginRes {            // this is the Response after login
    token: string,
    message: string
}

export interface IUser {                // this is data that's token carry
    name: string,
    id: string,
    role: string
}

