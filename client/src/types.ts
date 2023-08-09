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
    count: number
}
type RoomNumbers = {
    number: number
    unavailableDates: [Date]
    _id: string
}

export interface IRoom {
    _id: string
    title: string
    price: string
    maxPeople: string
    desc: string
    roomNumbers: RoomNumbers[]
}


/* interface for Search */
type Dates = {
    startDate: Date
    endDate: Date
    selection: string
}
type Options = {
    adult: number | undefined
    children: number | undefined
    room: number | undefined
}

export interface ISearchParams {
    city: string | undefined
    dates: Dates[]
    options: Options | undefined | null
}

export interface ILocationState extends ISearchParams {
    destination: string
}
/* roomNumbers: {
    number: number;
    unavailableDates: Date[];
} []; */