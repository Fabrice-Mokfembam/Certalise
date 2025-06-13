import AuthLayout from "../feature/Auth/components/AuthLayout";
import Login from "../feature/Auth/pages/LoginPage";



const authRoutes = {
    path:'/auth',
    element:<AuthLayout/>,
    children:[
      {
        index:true,
        element:<Login/>
      },
    
    ]
}


export {authRoutes}