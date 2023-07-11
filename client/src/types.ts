export interface IUser {
    _id: string
    username: string
    email: string
    country: string
    img: string
    city: string
    phone: string
    password: string
    isAdmin: boolean
}

export interface IHotel {
    _id: string
    name: string
    type: string
    city: string
    address: string
    distance: string
    photos: [string]
    title: string
    desc: string
    rating: number
    rooms: [string]
    cheapestPrice: number
    featured: boolean
    count:number
}

export interface IRoom {
    _id: string
    title: string
    price: string
    maxPeople: string
    desc: string
    roomNumbers: [
        {
            number: number
            unavailableDates: [Date]
        },
    ],
}
/* roomNumbers: {
    number: number;
    unavailableDates: Date[];
} []; */