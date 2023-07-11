export interface IUser {
    username: string,
    email: string,
    country: string,
    img: string
    city: string,
    phone: string
    password: string
    isAdmin: boolean
}

export interface IHotel {
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
}

export interface IRoom {
    title: string
    price: string
    maxPeople: string
    desc: string
    roomNumbers: [
        {
            number: number,
            unavailableDates: [Date]
        },
    ],
}
/* roomNumbers: {
    number: number;
    unavailableDates: Date[];
} []; */