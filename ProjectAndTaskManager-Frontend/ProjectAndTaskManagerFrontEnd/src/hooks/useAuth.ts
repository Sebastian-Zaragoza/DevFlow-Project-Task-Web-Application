import {useQuery} from "@tanstack/react-query";
import {getUser} from "../api/AuthApi.ts";

export const useAuth = () => {
    const {data, isError} = useQuery({
        queryKey: ['user'],
        queryFn: getUser,
        retry: 1,
        refetchOnWindowFocus: false,
    })
    return {data, isError}
}