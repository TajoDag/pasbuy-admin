import React, { Suspense, lazy, useEffect, useState } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { useSelector } from "react-redux";
import AuthLayout from "../layouts/AuthLayout";
import MainLayout from "../layouts/MainLayout";
import "../App.scss";
import { routes_url } from "./routes";
import AppNotification from "../components/AppNotification";
import AppLoading from "../components/AppLoading";
import { setAuthenticated } from "../redux/reducers/userReducer";
import { useDispatch } from "react-redux";
import AutoTranslate from "../utils/AutoTranslate";
import { LanguageProvider } from "../utils/LanguageContext";

const AppRoutes = () => {
  const loading = useSelector((state: any) => state.loading.loading);
  const notificationProps = useSelector((state: any) => state.notification);
  const isAuthenticated = localStorage.getItem("isLogin");
  const renderRoute = (route: any) => {
    if (route.isPrivate && isAuthenticated) {
      return route.element;
    }
    return <Navigate to="/login" />;
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
        {routes_url.map((route, key) => (
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
        ))}
        <Route path="/login" element={<AuthLayout />} />
        <Route path="/register" element={<AuthLayout />} />
      </Routes>
     
    </Suspense>
  );
};

export default AppRoutes;
