import { useQuery } from "@tanstack/react-query";
import { getUserFriends } from "../lib/api";
import FriendCard from "../components/FriendCard";
import NoFriendsFound from "../components/NoFriendsFound";

const FriendsPage = () => {
    const { data: friends = [], isLoading } = useQuery({
        queryKey: ["friends"],
        queryFn: getUserFriends,
    });

    return (
        <div className="p-4 sm:p-6 lg:p-8">
            <div className="container mx-auto max-w-4xl space-y-8">
                <h1 className="text-2xl sm:text-3xl font-bold tracking-tight mb-6">Your Friends</h1>
                {isLoading ? (
                    <div className="flex justify-center py-12">
                        <span className="loading loading-spinner loading-lg"></span>
                    </div>
                ) : friends.length === 0 ? (
                    <NoFriendsFound />
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        {friends.map((friend) => (
                            <FriendCard key={friend._id} friend={friend} />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default FriendsPage