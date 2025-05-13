import { useQuery } from "@tanstack/react-query"
import { getAuthuser } from "../lib/api"


const useAuthUser = () => {
    // TANSTACK QUERY
    const authUser = useQuery({
        queryKey: ["authUser"],
        queryFn: getAuthuser,
        retry: false        //   sends request one time auth check
    });

    return { isLoading: authUser.isLoading, authUser: authUser.data?.user }
}

export default useAuthUser