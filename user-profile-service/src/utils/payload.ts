export interface UserProfilePayload{
    firstName?:string
    lastName?:string
    phone?:string
}

export interface UserAddressPayload{
    street?:string
    city?:string
    state?:string
    postalCode?:string
}

export interface GeoAddress {
  street: string;
  city: string;
  state: string;
  postalCode: string;
}