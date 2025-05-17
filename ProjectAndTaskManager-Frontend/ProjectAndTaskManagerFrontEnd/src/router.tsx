import {BrowserRouter, Routes, Route} from "react-router-dom"
import AppLayout from "./layouts/AppLayout.tsx";
import DashboardView from "./views/DashboardView.tsx";
import CreateProjectView from "./views/projects/CreateProjectView.tsx";
import EditProjectView from "./views/projects/EditProjectView.tsx";
import ProjectDetailsView from "./views/projects/ProjectDetailsView.tsx";

export default function Router() {
    return(
        <BrowserRouter>
            <Routes>
                <Route element={<AppLayout/>}>
                    <Route path='/' element={<DashboardView/>} index></Route>
                    <Route path='/projects/create' element={<CreateProjectView/>}></Route>
                    <Route path='/projects/:projectId/edit' element={<EditProjectView/>}></Route>
                    <Route path='/projects/:projectId' element={<ProjectDetailsView/>}></Route>
                </Route>
            </Routes>
        </BrowserRouter>
    )
}