import {useLocation} from "react-router";
import {useQuery} from "@tanstack/react-query"
import {getTaskById} from "../../api/TaskApi.ts";
import {useParams} from "react-router-dom";
import EditTaskModal from "./EditTaskModal.tsx";

export default function EditTaskData() {
    const params = useParams()
    const projectId = params.projectId!

    const location = useLocation()
    const queryParams = new URLSearchParams(location.search)
    const taskId = queryParams.get("editTask")!

    const {data} = useQuery({
        queryKey: ['task', taskId],
        queryFn: () => getTaskById({projectId, taskId}),
        enabled: !!taskId
    })
    if (data) return <EditTaskModal/>
}
