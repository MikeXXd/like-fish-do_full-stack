import { createBrowserRouter } from "react-router-dom";
import Tasks from "./components/Tasks/components/Tasks.tsx";
import RootLayout from "./layouts/RootLayout.tsx";
import { Rituals } from "./components/Rituals/components/Riruals.tsx";
import { About } from "./components/About.tsx";
import HomePage from "./components/HomePage/components/HomePage.tsx";
import { MagicWords } from "./components/MagicWords/components/MagicWords.tsx";

export const routes = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      { errorElement: <div>404 Not Found</div> },
      {
        children: [
          { index: true, element: <HomePage /> },
          { path: "tasks", element: <Tasks /> },
          {
            path: "rituals",
            element: <Rituals />
          },
          { path: "magic_words", element: <MagicWords /> },
          { path: "about", element: <About /> }
        ]
      }
    ]
  }
]);
