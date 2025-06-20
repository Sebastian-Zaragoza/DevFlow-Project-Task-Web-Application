import { Link, Navigate, useNavigate, useParams, useLocation } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getProjectById } from "../../api/ProjectApi.ts";
import AddTaskModal from "../../components/tasks/AddModal.tsx";
import TaskList from "../../components/tasks/TaskList.tsx";
import EditTaskData from "../../components/tasks/EditTaskData.tsx";
import ModalDetails from "../../components/tasks/ModalDetails.tsx";
import { useAuth } from "../../hooks/useAuth.ts";
import { isManager } from "../../utils/policies.ts";
import type {Task, TaskStatus, ProjectWithTasks} from "../../types";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
import {useMemo} from "react";

export default function ProjectDetailsView() {
  const navigate = useNavigate();
  const location = useLocation();
  const { projectId } = useParams<{ projectId: string }>();
  const { data: user } = useAuth();

  const {
    data: project,
    isError,
    isLoading,
  } = useQuery<ProjectWithTasks>({
    queryKey: ["editProject", projectId],
    queryFn: () => getProjectById(projectId!),
    retry: false,
    enabled: !!projectId,
  });

  const canEdit = useMemo(
      () => project?.manager === user?._id,
      [project, user]
  );

  if (isError) return <Navigate to="/404" replace />;
  if (isLoading || !project || !user) return ;

  const percentMap: Record<TaskStatus, number> = {
    pendiente:    0,
    en_espera:   25,
    en_progreso: 50,
    en_revision: 75,
    completado: 100,
  };

  const percentages = project.tasks.map((t: Task) => percentMap[t.status] ?? 0);
  const projectPercent = percentages.length
      ? Math.round(
          percentages.reduce((sum, pct) => sum + pct, 0) / percentages.length
      )
      : 0;

  const chartData =
      projectPercent === 100
          ? [{ name: "Completado", value: 100 }]
          : [
            { name: "Completado", value: projectPercent },
            { name: "Restante",   value: 100 - projectPercent },
          ];

  return (
      <div className="min-h-screen ">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <header className="mb-8 flex flex-col md:flex-row md:items-center md:justify-between">
            <div className="flex-1">
              <h1 className="text-4xl font-extrabold text-gray-900">
                {project.projectName}
              </h1>
              <p className="mt-2 text-lg text-gray-600">
                {project.description || "(Sin descripción)"}
              </p>

              {isManager(project.manager, user._id) && (
                  <div className="mt-4 flex flex-col sm:flex-row sm:items-center sm:justify-start gap-3">
                    <button
                        type="button"
                        onClick={() => navigate(`${location.pathname}?newTask=true`)}
                        className="w-full sm:w-auto inline-flex justify-center items-center
               bg-blue-500 hover:bg-blue-600 text-white font-medium
               px-5 py-2 rounded-md shadow transition-colors"
                    >
                      Agregar tarea
                    </button>

                    <Link
                        to="team"
                        className="w-full sm:w-auto inline-flex justify-center items-center
               bg-blue-500 hover:bg-blue-600 text-white font-medium
               px-5 py-2 rounded-md shadow transition-colors text-center"
                    >
                      Colaboradores
                    </Link>
                  </div>

              )}
            </div>

            <div className="mt-6 md:mt-0 bg-white rounded-lg shadow-md p-6 flex flex-col items-center w-full md:w-1/3">
              <h3 className="text-xl font-semibold text-gray-900 pb-2 w-full text-center">
                Progreso del proyecto
              </h3>
              <div className="w-40 h-40 relative">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                        data={chartData}
                        dataKey="value"
                        startAngle={90}
                        endAngle={-270}
                        innerRadius="60%"
                        outerRadius="100%"
                        isAnimationActive={true}
                        animationDuration={800}
                        animationEasing="ease-out"
                    >
                      <Cell fill="#2563EB" />
                      {projectPercent < 100 && <Cell fill="#E5E7EB" />}
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
                <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-2xl font-bold text-gray-700">
                  {projectPercent}%
                </span>
                </div>
              </div>
            </div>
          </header>

          <section>
            <TaskList tasks={project.tasks} canEdit={canEdit} />
          </section>
          <AddTaskModal />
          <EditTaskData />
          <ModalDetails />
        </div>
      </div>
  );
}
