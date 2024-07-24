import { createBrowserRouter } from "react-router-dom";

import RootLayout from "./layouts/RootLayout.tsx";
import ErrorPage from "./pages/ErrorPage.tsx";
import { HomePage } from "./pages/HomePage.tsx";
import { TasksPage } from "./pages/TasksPage.tsx";
import { RitualsPage } from "./pages/RitualsPage.tsx";
import { MagicWordsPage } from "./pages/MagicWordsPage.tsx";
import { AboutPage } from "./pages/AboutPage.tsx";

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
      { path: "about", element: <AboutPage /> }
    ]
  }
]);
