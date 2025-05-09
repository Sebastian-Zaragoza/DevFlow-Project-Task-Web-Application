import {Link} from "react-router-dom"
export default function DashboardView() {
    return (
        <>
            <h1 className="text-5xl font-black">Mis proyectos</h1>
            <p className="text-2xl font-light text-gray-500 mt-5">Maneja y administra tus proyectos</p>

            <nav className="my-10">
                <Link className="bg-blue-400 hover:bg-blue-500 px-10 py-3 text-white text-xl font-bold
            cursor-pointer transition-colors" to='/projects/create'>
                    Crear Proyecto
                </Link>
            </nav>

        </>
    )
}
