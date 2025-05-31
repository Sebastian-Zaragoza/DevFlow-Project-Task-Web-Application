import { Navigate, useNavigate, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getProjectById } from "../../api/ProjectApi.ts";
import AddTaskModal from "../../components/tasks/AddModal.tsx";
import TaskList from "../../components/tasks/TaskList.tsx";
import EditTaskData from "../../components/tasks/EditTaskData.tsx";
import ModalDetails from "../../components/tasks/ModalDetails.tsx";

export default function ProjectDetailsView() {
    const navigate = useNavigate();
    const { projectId } = useParams<{ projectId: string }>();

    const { data, isError } = useQuery({
        queryKey: ["editProject", projectId],
        queryFn: () => getProjectById(projectId!),
        retry: false,
    });

    if (isError) return <Navigate to="/404" replace />;
    return (
        <div className="min-h-screen">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

                <header className="mb-8">
                    <h1 className="text-4xl font-extrabold text-gray-900">
                        {data?.projectName}
                    </h1>
                    <p className="mt-2 text-lg text-gray-600">
                        {data?.description}
                    </p>
                    <button
                        type="button"
                        onClick={() => navigate(`${location.pathname}?newTask=true`)}
                        className="inline-flex items-center mt-4 bg-blue-500 hover:bg-blue-600 text-white font-medium px-5 py-2 rounded-md shadow transition-colors"
                    >
                        Agregar tarea
                    </button>
                </header>

                <section>
                    <TaskList tasks={data?.tasks || []} />
                </section>

                <AddTaskModal />
                <EditTaskData />
                <ModalDetails />
            </div>
        </div>
    );
}