import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import ProjectForm from "../../components/projects/ProjectForm.tsx";
import type { ProjectFormData } from "../../types";
import { createProject } from "../../api/ProjectApi.ts";
import { toast } from "react-toastify";
import { useMutation } from "@tanstack/react-query";

export default function CreateProjectView() {
  const navigate = useNavigate();
  const initialValues: ProjectFormData = {
    projectName: "",
    clientName: "",
    description: "",
  };

  const mutation = useMutation({
    mutationFn: createProject,
    onError: (error) => {
      toast.error(error.message);
    },
    onSuccess: (msg) => {
      toast.success(msg);
      navigate("/");
    },
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ProjectFormData>({ defaultValues: initialValues });

  const onSubmit = (formData: ProjectFormData) => {
    mutation.mutate(formData);
  };

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <header className="mb-8">
        <h1 className="text-4xl font-extrabold text-gray-900">
          Create Project
        </h1>
        <p className="mt-2 text-lg text-gray-500">
          Complete the following form to create the project
        </p>
        <Link
          to="/"
          className="inline-block mt-4 bg-blue-500 hover:bg-blue-600 text-white font-medium px-5 py-2 rounded-md shadow transition-colors"
        >
          Back to Projects
        </Link>
      </header>

      <form
        onSubmit={handleSubmit(onSubmit)}
        noValidate
        className="bg-white rounded-lg shadow-md border-l-4 border-blue-600 p-8 space-y-6"
      >
        <ProjectForm register={register} errors={errors} />

        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-md shadow focus:outline-none transition-colors"
        >
          Create Project
        </button>
      </form>
    </div>
  );
}
