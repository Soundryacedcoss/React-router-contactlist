import { createContext, useState } from "react";
import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Contact } from "./components/Contact";
import { Sidebar } from "./components/Sidebar";
import { Edit } from "./components/Edit";
export const dataContext = createContext();
const router = createBrowserRouter([
  {
    path: "/",
    element: <Sidebar />,
    children: [
      {
        path: "/Contact",
        element: <Contact />,
      },
      { path: "/Contact/Edit", element: <Edit /> },
    ],
  },
]);
function App() {
  const [data, setData] = useState([]);
  return (
    <div className="">
      <dataContext.Provider value={{ data, setData }}>
        <RouterProvider router={router} />
      </dataContext.Provider>
    </div>
  );
}

export default App;
