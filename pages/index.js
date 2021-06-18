export default function Home () {
    return (
        <div className="max-w-2xl sm:mx-auto mt-10">
            <div className="">
                <div className="flex flex-col sm:flex-row justify-between mb-4">
                    <div className="">
                        <h1 className="font-bold text-4xl text-gray-900 mb-4">Hi, I'm Nnamdi</h1>
                        <h2 className="font-semibold text-md text-gray-500 mb-4">I'm a coder, economist, and venture investor.</h2>
                        <p className="text-sm font-semibold mb-4">I write good stuff that you should read sometime. Subscribe below, and find my essays just below that.</p>
                        <p className="text-sm font-semibold mb-4 sm:mb-0">...</p>
                    </div>
                    <div className="h-60 max-w-80 sm:w-80 rounded-md bg-gray-800">
                    </div>
                </div>
                <div className="py-3 px-4 mb-4 rounded-md bg-blue-100 shadow-md">
                    <h2 className="mb-2 font-bold text-xl">Subscribe to my essays</h2>
                    <p className="mb-4 font-medium text-gray-600">Subtext TBD</p>
                    <form className="flex justify-between">
                        <input className="flex-1 transition duration-500 hover:bg-gray-100 w-80 mr-2 rounded-md px-4 py-2 focus:ring-blue-500 focus:outline-none" />
                        <button className="transition duration-500 ease-in-out w-40 rounded-md py-2 px-2 text-white font-semibold bg-blue-500 shadow-md hover:bg-blue-400 focus:outline-none">
                            Sign Up
                        </button>
                    </form>
                </div>
                <div className="flex flex-col sm:flex-row justify-between space-y-10 sm:space-x-10 sm:space-y-0">
                    <div className="font-normal text-md text-center py-6 px-6 rounded-md shadow-lg">
                        <p className="text-5xl sm:text-4xl mb-3">🚀</p>
                        <h2 className="font-bold text-2xl sm:text-xl mb-2 text-gray-900">Founders</h2>
                        <p>Here is some test text for the section descriptions</p>
                    </div>
                    <div className="font-normal text-md text-center py-6 px-6 rounded-md shadow-lg">
                        <p className="text-5xl sm:text-4xl mb-3">👨‍💻👩‍💻</p>
                        <h2 className="font-bold text-2xl sm:text-xl mb-2 text-gray-900">Developers</h2>
                        <p>Here is some test text for the section descriptions</p>
                    </div>
                    <div className="font-normal text-md text-center py-6 px-6 rounded-md shadow-lg">
                        <p className="text-5xl sm:text-4xl mb-3">💸</p>
                        <h2 className="font-bold text-2xl sm:text-xl mb-2 text-gray-900">Investors</h2>
                        <p>Here is some test text for the section descriptions</p>
                    </div>
                </div>
            </div>
        </div>
    );
}