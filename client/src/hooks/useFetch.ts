import { useEffect, useState } from "react";
import axios from 'axios';

const useFetch = (url: string) => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const res = await axios.get(url);
                setData(res.data);
            } catch (err) {
                setError(err);
            }
        }
    })
}

