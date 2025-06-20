import {Outlet} from "react-router-dom";
import Tabs from "../components/profile/Tabs.tsx";

export default function ProfileLayout() {
    return (
        <>
            <Tabs/>
            <Outlet/>
        </>
    );
}
