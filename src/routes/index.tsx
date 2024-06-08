import React, { Suspense } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { useSelector } from "react-redux";
import AuthLayout from "../layouts/AuthLayout";
import MainLayout from "../layouts/MainLayout";
import "../App.scss";
import { routes_url } from "./routes";
import AppNotification from "../components/AppNotification";
import AppLoading from "../components/AppLoading";
import Chats from "../modules/Chats";

type IsAuthenticated = boolean;
const AppRoutes = () => {
  const loading = useSelector((state: any) => state.loading.loading);
  const notificationProps = useSelector((state: any) => state.notification);
  const isAuthenticatedStr = localStorage.getItem("isLogin");
  const isAuthenticated: IsAuthenticated = isAuthenticatedStr
    ? JSON.parse(isAuthenticatedStr)
    : null;

  const renderRoute = (route: any) => {
    if (route.isPrivate && isAuthenticated) {
      return route.element;
    }
    if (!route.isPrivate) {
      return route.element;
    }
    return <Navigate to="/login" />;
  };

  const renderRoutes = (routes: any) => {
    return routes.map((route: any, key: any) => {
      if (route.children) {
        return route.children.map((child: any, childKey: any) => (
          <Route
            key={`${key}-${childKey}`}
            path={child.path}
            element={
              <MainLayout>
                <Suspense fallback={<h1>Loading...</h1>}>
                  {renderRoute(child)}
                </Suspense>
              </MainLayout>
            }
          />
        ));
      } else {
        return (
          <Route
            key={key}
            path={route.path}
            element={
              <MainLayout>
                <Suspense fallback={<h1>Loading...</h1>}>
                  {renderRoute(route)}
                </Suspense>
              </MainLayout>
            }
          />
        );
      }
    });
  };

  return (
    <Suspense fallback={<h1>Loading....</h1>}>
      {notificationProps && <AppNotification {...notificationProps} />}
      {loading && <AppLoading />}
      <Routes>
        {isAuthenticated ? (
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
        ) : (
          <Route path="/" element={<Navigate to="/login" replace />} />
        )}
        {renderRoutes(routes_url)}
        <Route path="/login" element={<AuthLayout />} />
        <Route path="/register" element={<AuthLayout />} />
        {isAuthenticated && <Route path="/chats" element={<Chats />} />}
      </Routes>
    </Suspense>
  );
};

export default AppRoutes;
