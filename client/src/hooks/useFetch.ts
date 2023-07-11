import { useEffect, useState } from "react";
import axios from 'axios';
import { IHotel, IRoom, IUser } from "@/types";

interface FetchData<T> {
    data: IHotel | IUser | IRoom;
    loading: boolean;
    error: boolean | T;
    reFetch: () => Promise<void>;
}

const useFetch = <T>(url: string): FetchData<IHotel | IUser | IRoom> => {
    const [data, setData] = useState<IHotel | IUser | IRoom>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<boolean>(false);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const res = await axios.get<T[]>(url)
                setData(res.data);
            } catch (err) {
                setError(true);
            }
            setLoading(false);
        };
        void fetchData();
    }, [url]);

    // refetch
    const reFetch = async () => {
        setLoading(true);
        try {
            const res = await axios.get<T[]>(url);
            setData(res.data)
            console.log(res.data,"usefetcher rs.data")
        } catch (err) {
            setError(true)
        }
        setLoading(false);
    };

    return { data, loading, error, reFetch };

}

export default useFetch;

