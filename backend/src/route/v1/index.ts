import express, { Router } from "express";
import authRoute from "./auth.route";
import clientRoute from "./client.route";

const router: Router = express.Router();
interface DefaultRoutes {
  path: string;
  route: Router;
}
const defaultRoutes: DefaultRoutes[] = [
  {
    path: "/auth",
    route: authRoute,
  },
  {
    path: "/client",
    route: clientRoute,
  },
];

defaultRoutes.forEach((route: DefaultRoutes) => {
  router.use(route.path, route.route);
});

export default router;
