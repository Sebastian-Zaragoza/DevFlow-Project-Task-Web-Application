import {BrowserRouter, Routes, Route} from "react-router-dom"
import AppLayout from "./layouts/AppLayout.tsx";
import DashboardView from "./views/DashboardView.tsx";

export default function Router() {
    return(
        <BrowserRouter>
            <Routes>
                <Route element={<AppLayout/>}>
                    <Route path='/' element={<DashboardView/>}></Route>
                </Route>
            </Routes>
        </BrowserRouter>
    )
}