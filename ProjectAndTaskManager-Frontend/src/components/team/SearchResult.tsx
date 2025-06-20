import type {TeamMember} from "../../types/team.ts";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import {addUserById} from "../../api/TeamApi.ts";
import {toast} from "react-toastify";
import {useParams} from "react-router-dom";
import {UserIcon} from "@heroicons/react/24/solid";

type SearchResultProps = {
    user: TeamMember
    reset: () => void;
}

function SearchResult({user, reset}: SearchResultProps) {
    const params = useParams();
    const projectId = params.projectId!;
    const query = useQueryClient();
    const {mutate} = useMutation({
        mutationFn: addUserById,
        onError: (error) => {
            toast.error(error.message);
        },
        onSuccess:(data)=>{
            toast.success(data);
            query.invalidateQueries({ queryKey: ["projectTeam", projectId] });
            query.invalidateQueries({ queryKey: ["editProject", projectId] });
            reset();
        }
    })

    const handleAddUser = () =>{
        const data = {
            projectId, id: user._id,
        }
        mutate(data)
    }

    return (
        <>
            <h2 className="mt-10 text-center text-2xl font-extrabold text-gray-900">
                Resultado de la búsqueda
            </h2>

            <div className="mt-6 max-w-xl mx-auto bg-white rounded-lg shadow-md p-6">
                <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-blue-50 rounded-full flex items-center justify-center">
                        <UserIcon className="h-6 w-6 text-blue-600" />
                    </div>
                    <div className="flex-1">
                        <p className="text-lg font-medium text-gray-800">{user.name}</p>
                        <p className="text-sm text-gray-500 break-words whitespace-normal">
                            {user.email}
                        </p>
                    </div>
                </div>

                <div className="mt-4">
                    <button
                        onClick={handleAddUser}
                        className="w-full flex justify-center items-center
                     bg-blue-600 hover:bg-blue-700 text-white
                     font-semibold py-2 rounded-md shadow
                     transition-colors"
                    >
                        Añadir
                    </button>
                </div>
            </div>
        </>
    );
}

export default SearchResult;