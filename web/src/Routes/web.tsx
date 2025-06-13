
import { ProtectedRoute } from "../feature/Auth/components/ProtectedRoute";
import Create from "../feature/Create/pages/";
import CertificateDetail from "../feature/Create/pages/CertificateDetail";
import EditBirthCertificate from "../feature/Create/pages/Edit";
import Digitalise from "../feature/Digitalise/pages";
import Profile from "../feature/profile/pages";
import WebLayout from "../feature/Web/components/WebLayout";
import AuditLog from "../feature/Web/pages/AuditLog";
import Dashboard from "../feature/Web/pages/Dashboard";
import SearchArchives from "../feature/Web/pages/Search";


const webRoutes = {
    path:'/',
    element:
    <ProtectedRoute>
      <WebLayout/>
    </ProtectedRoute>
    ,
    children:[
      {
        index:true,
        element:<Dashboard/>
      },
      {
        path:'/digitalise',
        element:<Digitalise/>
      },
      {
        path:'/create',
        element:<Create/>
      },
      {
        path:'/editbirthcerticate/:id',
        element:<EditBirthCertificate/>
      },
      {
        path:'/birthcertificatedetail/:id',
        element:<CertificateDetail/>
      },
      {
        path:'/search',
        element:<SearchArchives/>
      },
      {
        path:'/audit-log',
        element:<AuditLog/>
      },
      {
        path:'/profile/:username',
        element:<Profile/>
      }
    ]
}


export {webRoutes}