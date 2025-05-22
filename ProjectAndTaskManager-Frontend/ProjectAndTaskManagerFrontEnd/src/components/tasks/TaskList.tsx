import type {Task} from "../../types";
import TaskCard from "./TaskCard.tsx";

type TaskListProps = {
    tasks: Task[]
}

type GroupedTasks = {
    [key: string]:Task[]
}

const statusTranslations :{[key:string]:string}= {
    pendiente: 'Pendiente',
    en_espera: 'En Espera',
    en_progreso: 'En Progreso',
    en_revision: 'En Revisión',
    completado: 'Completado',
}

const statusStyles :{[key:string]:string}= {
    pendiente: 'border-t-slate-500',
    en_espera: 'border-t-red-500',
    en_progreso: 'border-t-blue-500',
    en_revision: 'border-t-amber-500',
    completado: 'border-t-emerald-500',
}

const initialStatusGroups : GroupedTasks = {
    pendiente: [],
    en_espera: [],
    en_progreso: [],
    en_revision: [],
    completado: [],
}

export default function TaskList({tasks}: TaskListProps) {
    /**
     * Iterate through all items in tasks
     * Initialize the accumulator and the current element
     * Check if the accumulator has anything, if true, clone it
     * If false, remain it as empty
     * Add the task
     * Return an object and the tasks related
     * **/
    const groupedTasks = tasks.reduce((acc, task) => {
        let currentGroup = acc[task.status] ? [...acc[task.status]] : [];
        currentGroup = [...currentGroup, task]
        return { ...acc, [task.status]: currentGroup };
    }, initialStatusGroups)
    return (
        <>
            <h2 className="text-5xl font-black my-10">Tareas</h2>

            <div className='flex gap-5 overflow-x-scroll 2xl:overflow-auto pb-32'>
                {Object.entries(groupedTasks).map(([status, tasks]) => (
                    <div key={status} className='min-w-[300px] 2xl:min-w-0 2xl:w-1/5'>
                        <h3 className={`capitalize text-xl font-light border border-slate-300 bg-white p-3 border-t-8 ${statusStyles[status]}`}>{statusTranslations[status]}</h3>
                        <ul className='mt-5 space-y-5'>
                            {tasks.length === 0 ? (
                                <li className="text-gray-500 text-center pt-3">No Hay tareas</li>
                            ) : (
                                tasks.map(task => <TaskCard key={task._id} task={task} />)
                            )}
                        </ul>
                    </div>
                ))}
            </div>
        </>
    );
}
