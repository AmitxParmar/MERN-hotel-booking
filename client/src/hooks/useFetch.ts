import { useEffect, useState } from "react";
import axios from 'axios';

interface FetchData<T> {
    data: T | undefined;
    loading: boolean;
    error: boolean | unknown;
    reFetch: () => Promise<void>;
}

/* fetch('/api/hotels/find/64a9b8f157fe51bfe1166f5d').then(res => res.json()).then(data => console.log(data,"api test"));
 */
const useFetch = <T>(url: string): FetchData<T> => {
    const [data, setData] = useState<T>();
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<boolean>(false);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const res = await axios.get<T>(url);
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
            const res = await axios.get<T>(url);
            setData(res.data);
            console.log(res.data, "usefetcher rs.data");
        } catch (err) {
            setError(true);
        }
        setLoading(false);
    };

    return { data, loading, error, reFetch };
};

export default useFetch;




