import React from 'react'

import DialogWrapper from './_components/dialogWrapper/dialogWrapper'
import LoadingWrapper from './_components/loadingWrapper/loadingWrapper'
import Snackbar from './_components/snackbar'

import { Router, Switch } from 'react-router-dom';
import { history } from './_utils/history';

import Login from './auth/login/login';
import ForgetPassword from './auth/forgetPassword/forgetPassword';
import Role from './auth/role/role';
import Home from './home/home';
import { connectTo } from './_utils/generic'

import { MyRoute } from './_components/PrivateRoute';


import mainLayouts from './layouts/mainLayouts';
import AuthLayout from './layouts/AuthLayout';
import PageNotFound from './PageNotFound/PageNotFound';

import CityPage from './BaseInfo/CityPage/Page';
import CityRegister from './BaseInfo/CityPage/Register';
import CityUpdate from './BaseInfo/CityPage/Update';

import RegionPage from './BaseInfo/RegionPage/Page';
import RegionRegister from './BaseInfo/RegionPage/Register';
import RegionUpdate from './BaseInfo/RegionPage/Update';

import ResellerPage from './BaseInfo/ResellerPage/Page';
import ResellerRegister from './BaseInfo/ResellerPage/Register';
import ResellerUpdate from './BaseInfo/ResellerPage/Update';

import PackageCatPage from './BaseInfo/PackageCat/Page';
import PackageCatRegister from './BaseInfo/PackageCat/Register';
import PackageCatUpdate from './BaseInfo/PackageCat/Update';

export const appRoutes = [
  {
    path: '/',
    component: mainLayouts,
    children: [
      { path: '/', exact: true, component: Home, },

      { path: '/city', exact: true, component: CityPage, },
      { path: '/city/register', exact: true, component: CityRegister },
      { path: '/city/:cityId', exact: true, component: CityUpdate },

      { path: '/region', exact: true, component: RegionPage },
      { path: '/region/register', exact: true, component: RegionRegister },
      { path: '/region/:regionId', exact: true, component: RegionUpdate },

      { path: '/reseller', exact: true, component: ResellerPage },
      { path: '/reseller/register', exact: true, component: ResellerRegister },
      { path: '/reseller/:resellerId', exact: true, component: ResellerUpdate },

      { path: '/packageCat', exact: true, component: PackageCatPage },
      { path: '/packageCat/register', exact: true, component: PackageCatRegister },
      { path: '/packageCat/:resellerId', exact: true, component: PackageCatUpdate },
    ],
    canActivate: true
  },
  {
    path: '/auth',
    component: AuthLayout,
    children: [
      { path: '/auth/login', exact: true, component: Login },
      { path: '/auth/forgetpassword', exact: true, component: ForgetPassword },
      { path: '/auth/role/:roleId', exact: true, component: Role }
    ]
  },
   { path: '', component: PageNotFound }
]

class MainRoutes extends React.Component {
  render() {
    return (
      <Router history={history}>
        <>
        <Switch>{/*  فقط یک  مورد نشان داده می شود */}
            {appRoutes.map((m,mi) =>
              <MyRoute 
                key={mi}
                exact={m.exact}
                path={(m.children && "(" + m.children.map(ch => ch.path).join("|") + ")") || m.path}
                component={m.component}
                canActivate={m.canActivate}
                children={<Switch>
                  {m.children && m.children.map((child,childi) =>
                    <MyRoute
                      key={childi}
                      exact={child.exact}
                      path={(child.children && "(" + child.children.map(ch => ch.path).join("|") + ")") || child.path}
                      component={child.component} >
                    </MyRoute>)}
                </Switch>}>
              </MyRoute>
            )}
          </Switch>

          {/* برای نمایش دیالوگ اکشن صدا می زنیمو مقادیر ارسال می کنیم */}
          <DialogWrapper></DialogWrapper> 

          {/* برای نمایش لودینگ اکشن صدا می زنیمو مقادیر ارسال می کنیم */}
          <LoadingWrapper></LoadingWrapper>

          {/* برای نمایش اسنک اکشن صدا می زنیمو مقادیر ارسال می کنیم */}
          <Snackbar></Snackbar>
        </>
      </Router>
    )
  }
}

export default connectTo(
  state => ({
  }),
  {},
  (MainRoutes)
)
