import Home from "../pages/Home";
import Challenges from "../pages/Challenges";

const routes = [
  {
    path: "/",
    component: Home,
    exact: true,
  },
  {
  path: "/challenges",
  component: "Challenges",
  exact: true,
},

];

export default routes;
