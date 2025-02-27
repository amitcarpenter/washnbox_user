


export type ServiceItems = {
    name: string;
    price: number;
}

export type Services = {
    id:number,
    type:string
    services:ServiceItems[]
}

export type ProfileDataType = {
    name?:string;
    shop_name?:string;
    upi_id?:string;
    address?:string;
    email?:string;
    phone?:string;
    services?:Services[]
}

