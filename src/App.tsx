import './App.css'
import Container from "./Container/Container.tsx";
import {createBrowserRouter, RouterProvider} from "react-router";

function App() {
    const routes = createBrowserRouter([
        {
            path: "/",
            element: <Container/>,
        }])

    return (
        <RouterProvider router={routes}/>
    )
}

export default App