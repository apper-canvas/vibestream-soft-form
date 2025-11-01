import { createBrowserRouter } from "react-router-dom";
import React, { Suspense, lazy } from "react";
import Root from "@/layouts/Root";
import { getRouteConfig } from "./route.utils";
import Layout from "@/components/organisms/Layout";

const Home = lazy(() => import("@/components/pages/Home"));
const Playlists = lazy(() => import("@/components/pages/Playlists"));
const LikedSongs = lazy(() => import("@/components/pages/LikedSongs"));
const Following = lazy(() => import("@/components/pages/Following"));
const PlaylistDetail = lazy(() => import("@/components/pages/PlaylistDetail"));
const NotFound = lazy(() => import("@/components/pages/NotFound"));
const Login = lazy(() => import("@/components/pages/Login"));
const Signup = lazy(() => import("@/components/pages/Signup"));
const Callback = lazy(() => import("@/components/pages/Callback"));
const ErrorPage = lazy(() => import("@/components/pages/ErrorPage"));

import Loading from '@/components/ui/Loading';

const createRoute = ({
  path,
  index,
  element,
  access,
  children,
  ...meta
}) => {
  // Get config for this route
  let configPath;
  if (index) {
    configPath = "/";
  } else {
    configPath = path.startsWith('/') ? path : `/${path}`;
  }

  const config = getRouteConfig(configPath);
  const finalAccess = access || config?.allow;

const route = {
    ...(index ? { index: true } : { path }),
    element: element ? <Suspense fallback={<Loading />}>{element}</Suspense> : element,
    handle: {
      access: finalAccess,
      ...meta,
    },
  };

  if (children && children.length > 0) {
    route.children = children;
  }

return route;
};

const mainRoutes = [
  createRoute({
    path: "",
    index: true,
    element: <Home />
  }),
  createRoute({
    path: "playlists",
    element: <Playlists />
  }),
  createRoute({
    path: "playlists/:id",
    element: <PlaylistDetail />
  }),
  createRoute({
    path: "liked-songs",
    element: <LikedSongs />
  }),
  createRoute({
    path: "following",
    element: <Following />
  }),
  createRoute({
    path: "*",
    element: <NotFound />
  })
];

const authRoutes = [
  createRoute({
    path: "login",
    element: <Login />
  }),
  createRoute({
    path: "signup", 
    element: <Signup />
  }),
  createRoute({
    path: "callback",
    element: <Callback />
  }),
  createRoute({
    path: "error",
    element: <ErrorPage />
  })
];

const routes = [
  {
    path: "/",
    element: <Root />,
    children: [
      {
        path: "/",
        element: <Layout />,
        children: mainRoutes
      },
      ...authRoutes
    ]
  }
];

export const router = createBrowserRouter(routes);