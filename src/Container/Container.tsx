import {Outlet} from "react-router";

const Container = () => {
    return (
        <main
            className="min-h-screen flex p-2 border sm:border-transparent border-gray-300 rounded-t-4xl sm:rounded-2xl">
            <Outlet/>
        </main>
    )

}
export default Container