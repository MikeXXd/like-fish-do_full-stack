import { createBrowserRouter } from "react-router-dom";
import Tasks from "./components/Tasks/components/Tasks.tsx";
import RootLayout from "./layouts/RootLayout.tsx";
import { Rituals } from "./components/Rituals/components/Riruals.tsx";
import { Statistics } from "./components/Statistics.tsx";
import { About } from "./components/About.tsx";

export const routes = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      { errorElement: <div>404 Not Found</div> },
      {
        children: [
          { index: true, element: <Tasks /> }, // TODO: this  is about to be changed for general homepage with most important information from all segments of the app
          { path: "tasks", element: <Tasks /> }, //TODO: this will be main url for
          {
            path: "rituals",
            element: <Rituals />
          },
          { path: "statistics", element: <Statistics /> },
          { path: "about", element: <About /> }
        ]
      }
    ]
  }
]);
