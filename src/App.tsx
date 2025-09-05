import './App.css'
import Container from "./Container/Container.tsx";
import {createBrowserRouter, RouterProvider} from "react-router";
import FormList from "./Pages/FormList.tsx";
import FormBuilder from "./Pages/FormBuilder.tsx";

function App() {
    const routes = createBrowserRouter([
        {
            path: "/",
            element: <Container/>,
            children: [
                {
                    index: true,
                    element: <FormList/>
                },
                {
                    path: "create",
                    element: <FormBuilder/>
                }
            ]
        },
    ])

    return (
        <RouterProvider router={routes}/>
    )
}

export default App