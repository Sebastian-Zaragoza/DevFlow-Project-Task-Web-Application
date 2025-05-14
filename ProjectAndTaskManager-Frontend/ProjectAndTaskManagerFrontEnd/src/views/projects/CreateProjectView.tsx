import {Link, useNavigate} from "react-router-dom"
import {useForm} from "react-hook-form"
import ProjectForm from "../../components/projects/ProjectForm.tsx";
import type {ProjectFormData} from "../../types";
import {createProject} from "../../api/ProjectApi.ts";
import {toast} from "react-toastify";
import {useMutation} from "@tanstack/react-query";

export default function CreateProjectView() {
    const navigate = useNavigate()
    const initialValues= {
        "projectName":"",
        "clientName":"",
        "description":""
    }
    const mutation = useMutation({
        mutationFn: createProject,
        onError:(error)=>{
            toast.error(error.message)
        },
        onSuccess:(data)=>{
            toast.success(data)
            navigate('/')
        }
    })

    const {register, handleSubmit, formState:{errors}} = useForm({defaultValues:initialValues})
    const handleForm = (formData: ProjectFormData) => {
        mutation.mutate(formData)
    }
    return (
        <>
            <div className="max-w-3xl mx-auto">
                <h1 className="text-5xl font-black">Crear Proyecto</h1>
                <p className="text-2xl font-light text-gray-500 mt-5">Completa el siguiente formulario para crear el proyecto</p>

                <nav className="my-10">
                    <Link className="bg-blue-400 hover:bg-blue-500 px-10 py-3 text-white text-xl font-bold
                cursor-pointer transition-colors" to='/'>
                        Regresar a Proyectos
                    </Link>
                </nav>
                <form className="mt-10 bg-white shadow-lg p-10 rounded-lg" onSubmit={handleSubmit(handleForm)} noValidate>
                    <ProjectForm register={register} errors={errors}/>
                    <input type="submit" value="Crear Proyecto" className="bg-blue-500 hover:bg-blue-600 w-full p-3
                    text-white uppercase font-bold cursor-pointer transition-colors"/>
                </form>
            </div>
        </>
    )
}