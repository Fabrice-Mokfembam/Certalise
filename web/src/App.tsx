import { createBrowserRouter,RouterProvider } from "react-router-dom"
import { webRoutes } from "./Routes/web"


const router = createBrowserRouter([webRoutes])

function App() {
  return <RouterProvider router={router}/>
}

export default App
