import {Link} from "react-router-dom"
import ProjectForm from "./ProjectForm.tsx"
import type {Project, ProjectFormData} from "../../types"
import {useForm} from "react-hook-form"
import {useMutation, useQueryClient} from "@tanstack/react-query"
import {updateProject} from "../../api/ProjectApi.ts"
import {toast} from "react-toastify"
import {useNavigate} from "react-router-dom"

type EditProjectFormProps = {
    data:ProjectFormData
    projectId:Project["_id"]
}

export default function EditProjectForm({data, projectId}: EditProjectFormProps, ) {
    const initialValues: ProjectFormData = {
        "projectName":data.projectName,
        "clientName":data.clientName,
        "description":data.description
    }
    const {register, handleSubmit, formState:{errors}} = useForm({defaultValues:initialValues})
    const queryClient = useQueryClient()
    const navigate = useNavigate()
    const {mutate} = useMutation({
        mutationFn: updateProject,
        onError: (error)=>{
            toast.error(error.message)
        },
        onSuccess: (data)=>{
            queryClient.invalidateQueries({queryKey:['projects']})
            queryClient.invalidateQueries({queryKey:['editProject', projectId]})
            toast.success(data)
            navigate('/')
        }
    })
    const handleForm = (formData: ProjectFormData) =>{
        const data = {
            formData, projectId
        }
        mutate(data)
    }
    return (
        <>
            <div className="max-w-3xl mx-auto">
                <h1 className="text-5xl font-black">Editar Proyecto</h1>
                <p className="text-2xl font-light text-gray-500 mt-5">Edita la información del proyecto</p>

                <nav className="my-10">
                    <Link className="bg-blue-400 hover:bg-blue-500 px-10 py-3 text-white text-xl font-bold
                cursor-pointer transition-colors" to='/'>
                        Regresar a Proyectos
                    </Link>
                </nav>
                <form className="mt-10 bg-white shadow-lg p-10 rounded-lg" onSubmit={handleSubmit(handleForm)} noValidate>
                    <ProjectForm
                        register={register}
                        errors={errors}
                    />
                    <input type="submit" value="Guardar cambios" className="bg-blue-600 hover:bg-blue-700 w-full p-3
                    text-white uppercase font-bold cursor-pointer transition-colors"/>
                </form>
            </div>
        </>
    )
}