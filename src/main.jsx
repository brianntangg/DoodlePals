import { StrictMode } from "react";
import "./main.sass";
import { createRoot } from "react-dom/client";
import { initializeApp } from "firebase/app";
import Providers from "./providers/Providers.jsx";
import {
  createBrowserRouter,
  Navigate,
  Outlet,
  RouterProvider,
} from "react-router-dom";
import { Box, Flex } from "@chakra-ui/react";
import ProtectedRoute from "./routes/ProtectedRoute.jsx";
import LogInPage from "./pages/LogInPage.jsx";
import AuthRoute from "./routes/AuthRoute.jsx";
import LogOutPage from "./pages/LogOutPage.jsx";
import SignUpPage from "./pages/SignUpPage.jsx";
import NavBar from "./components/NavBar.jsx";
import DoodlesPage from "./pages/DoodlesPage.jsx";
import DoodlePage from "./pages/DoodlePage.jsx";
import NewDoodlePage from "./pages/NewDoodlePage.jsx";
import CommunityDoodlesPage from "./pages/CommunityDoodlesPage.jsx";

const firebaseConfig = {
  apiKey: "AIzaSyDZG6IVe8PHhbehLi5ge2TsFUoavM1ecU4",
  authDomain: "doodlepals-4414d.firebaseapp.com",
  projectId: "doodlepals-4414d",
  storageBucket: "doodlepals-4414d.firebasestorage.app",
  messagingSenderId: "401995860492",
  appId: "1:401995860492:web:abc0cfd7797b141a283c29",
};

initializeApp(firebaseConfig);

const router = createBrowserRouter([
  {
    element: (
      <Flex h="100vh" flexDir="column" align="stretch">
        <NavBar />
        <Box flexGrow={1} flexShrink={1} flexBasis="auto" overflowY="auto">
          <Outlet />
        </Box>
      </Flex>
    ),
    children: [
      {
        path: "/",
        element: <Navigate to="/doodles" replace />,
      },
      {
        path: "/doodles",
        element: (
          <ProtectedRoute>
            <DoodlesPage />
          </ProtectedRoute>
        ),
      },
      {
        path: "/new",
        element: (
          <ProtectedRoute>
            <NewDoodlePage />
          </ProtectedRoute>
        ),
      },
      {
        path: "/community",
        element: (
            <ProtectedRoute>
              <CommunityDoodlesPage />
            </ProtectedRoute>
        ),
      },
      {
        path: "/doodle/:id",
        element: (
          <ProtectedRoute>
            <DoodlePage />
          </ProtectedRoute>
        ),
      },
      {
        path: "/login",
        element: (
          <AuthRoute>
            <LogInPage />
          </AuthRoute>
        ),
      },
      {
        path: "/signup",
        element: (
          <AuthRoute>
            <SignUpPage />
          </AuthRoute>
        ),
      },
      {
        path: "/logout",
        element: <LogOutPage />,
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Providers>
      <RouterProvider router={router} />
    </Providers>
  </StrictMode>,
);
