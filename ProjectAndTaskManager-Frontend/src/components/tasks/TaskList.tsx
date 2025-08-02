import type { Task } from "../../types";
import TaskCard from "./TaskCard.tsx";

type TaskListProps = {
  tasks: Task[];
  canEdit: boolean;
};

type GroupedTasks = {
  [key: string]: Task[];
};

const statusTranslations: { [key: string]: string } = {
  pending: "Pending",
  on_hold: "On Hold",
  in_progress: "In Progress",
  under_reviews: "Under Reviews",
  completed: "Completed",
};

const statusStyles: { [key: string]: string } = {
  pending: "border-blue-500",
  on_hold: "border-yellow-500",
  in_progress: "border-indigo-500",
  under_reviews: "border-orange-500",
  completed: "border-green-500",
};

const initialStatusGroups: GroupedTasks = {
  pending: [],
  on_hold: [],
  in_progress: [],
  under_reviews: [],
  completed: [],
};

export default function TaskList({ tasks, canEdit }: TaskListProps) {
  const groupedTasks = tasks.reduce((acc, task) => {
    const group = acc[task.status] || [];
    return { ...acc, [task.status]: [...group, task] };
  }, initialStatusGroups);

  return (
    <>
      <h2 className="text-4xl font-extrabold text-gray-900 mb-8">Tasks</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 pb-8">
        {Object.entries(groupedTasks).map(([status, tasks]) => (
          <div key={status} className="bg-white rounded-lg shadow-md">
            <h3
              className={`px-4 py-3 text-lg font-semibold text-gray-800 bg-white border-t-4 ${statusStyles[status]} rounded-t-lg`}
            >
              {statusTranslations[status]}
            </h3>
            <ul className="p-4 space-y-4">
              {tasks.length === 0 ? (
                <li className="text-center text-gray-500 py-6">
                  No tasks
                </li>
              ) : (
                tasks.map((task) => <TaskCard key={task._id} task={task} canEdit={canEdit} />)
              )}
            </ul>
          </div>
        ))}
      </div>
    </>
  );
}
