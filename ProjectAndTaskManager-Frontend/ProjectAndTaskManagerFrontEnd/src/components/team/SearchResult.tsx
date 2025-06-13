import type {TeamMember} from "../../types/team.ts";
import {useMutation} from "@tanstack/react-query";
import {addUserById} from "../../api/TeamApi.ts";
import {toast} from "react-toastify";
import {useParams} from "react-router-dom";

type SearchResultProps = {
    user: TeamMember
    reset: () => void;
}

function SearchResult({user, reset}: SearchResultProps) {
    const params = useParams();
    const projectId = params.projectId!;
    const {mutate} = useMutation({
        mutationFn: addUserById,
        onError: (error) => {
            toast.error(error.message);
        },
        onSuccess:(data)=>{
            toast.success(data);
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
            <p className="mt-10 text-center font-bold">Resultado de la búsqueda</p>
            <div className="flex justify-between items-center">
                <p>Nombre del usuario: <b>{user.name}</b></p>
                <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg shadow transition-colors disabled:opacity-60"
                onClick={handleAddUser}
                >Añadir al proyecto</button>
            </div>
        </>
    );
}

export default SearchResult;