import mainLayouts from "./layouts/mainLayouts";
import CityPage from "./BaseInfo/CityPage/CityPage";
import CityRegister from "./BaseInfo/CityPage/CityRegister";
import CityUpdate from "./BaseInfo/CityPage/CityUpdate";
import RegionPage from "./BaseInfo/RegionPage/RegionPage";
import { PrivateRoute } from "./_components/PrivateRoute";
import AuthLayout from "./layouts/AuthLayout";
import login from "./auth/login/login";
import forgetPassword from "./auth/forgetPassword/forgetPassword";
import PageNotFound from "./PageNotFound/PageNotFound";
import Role from "./auth/role/role";
import RegionRegister from "./BaseInfo/RegionPage/RegionRegister";
import RegionUpdate from "./BaseInfo/RegionPage/RegionUpdate";
import Home from './home/home';

export const appRoutes = [
    {
      path: '/',
      component: mainLayouts,
      children: [
        { path: '/',exact:true, component: Home, },

        { path: '/city',exact:true, component: CityPage, },
        { path: '/city/register',exact:true, component: CityRegister },
        { path: '/city/:cityId',exact:true, component: CityUpdate },
  
        { path: '/region',exact:true, component: RegionPage },
        { path: '/region/register',exact:true, component: RegionRegister },
        { path: '/region/:regionId',exact:true, component: RegionUpdate },
      ],
      CanActivate: PrivateRoute 
    },
    {
      path: '/auth',
      component: AuthLayout,
      children: [
        { path: '/login',exact:true, component: login },
        { path: '/forgetpassword',exact:true, component: forgetPassword },
        { path: '/role/:roleId',exact:true, component:Role }
      ]
    },
    { path: '**', component: PageNotFound }
  ]