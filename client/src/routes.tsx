import { createBrowserRouter } from "react-router-dom";

import Account from "./components/Users/components/Account.tsx";
import LogInOut from "./components/Users/components/LogInOut.tsx";
import Signup from "./components/Users/components/Signup.tsx";
import RootLayout from "./layouts/RootLayout.tsx";
import { AboutPage } from "./pages/AboutPage.tsx";
import ErrorPage from "./pages/ErrorPage.tsx";
import { HomePage } from "./pages/HomePage.tsx";
import { MagicWordsPage } from "./pages/MagicWordsPage.tsx";
import { RitualsPage } from "./pages/RitualsPage.tsx";
import { TasksPage } from "./pages/TasksPage.tsx";
import { UsersLayout } from "./pages/UsersLayout.tsx";

export const routes = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <HomePage /> },
      { path: "tasks", element: <TasksPage /> },
      {
        path: "rituals",
        element: <RitualsPage />
      },
      { path: "magic_words", element: <MagicWordsPage /> },
      { path: "about", element: <AboutPage /> },
      {
        path: "users",
        element: <UsersLayout />,
        children: [
          { index: true, element: <Account /> },

          { path: "login", element: <LogInOut /> },
          { path: "signup", element: <Signup /> }
        ]
      }
    ]
  }
]);


