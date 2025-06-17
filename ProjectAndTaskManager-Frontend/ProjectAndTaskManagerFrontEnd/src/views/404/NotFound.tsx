
export default function NotFound() {
    return (
        <>
            <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <header className="text-center mb-8">
                    <h1 className="text-6xl font-extrabold text-gray-900 mb-4">404</h1>
                    <p className="text-lg text-gray-500">
                        Página no encontrada
                    </p>
                </header>

                <div className="bg-white rounded-lg shadow-md  p-8 text-center">
                    <p className="text-gray-700 mb-6">
                        Lo sentimos, la página que buscas no existe o ha sido movida.
                    </p>
                    <a
                        href="/"
                        className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-md shadow transition-colors"
                    >
                        Volver al inicio
                    </a>
                </div>
            </div>
        </>
    );

}
