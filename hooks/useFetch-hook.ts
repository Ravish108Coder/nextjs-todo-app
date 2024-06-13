import { type TodoItem } from "@/app/page";
import { useEffect, useState } from "react";

export const useFetch = (url: string): [TodoItem[], boolean, any] => {
    const [data, setData] = useState<TodoItem[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<any>(null);

    useEffect(() => {
        const controller = new AbortController();
        const signal = controller.signal;

        const fetchData = async () => {
            setLoading(true);
            try {
                const response = await fetch(url, { signal });
                if (!response.ok) {
                    throw new Error(`Error: ${response.status} ${response.statusText}`);
                }
                const data = await response.json();
                setData(data);
            } catch (error: any) {
                if (error.name !== 'AbortError') {
                    setError(error.message ? error.message : 'An unknown error occurred');
                }
            } finally {
                setLoading(false);
            }
        };

        fetchData();

        return () => {
            controller.abort();
        };
    }, [url]);

    return [data, loading, error];
};
