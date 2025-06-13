import { createBrowserRouter,RouterProvider } from "react-router-dom"
import { webRoutes } from "./Routes/web"
import { authRoutes } from "./Routes/Auth"




const router = createBrowserRouter([webRoutes,authRoutes])

function App() {
  return <RouterProvider router={router}/>
}

export default App
