import express, { Router } from "express";
import clientController from "../../controllers/client.controller";
import { isLoggedIn } from "../../middleware/auth";
import validate from "../../middleware/validate";
import clientValidation from "../../validations/client.validation";

const router: Router = express.Router();

router.post(
  "/",
  isLoggedIn,
  validate(clientValidation.createClient),
  clientController.createClient
);
router.get("/", isLoggedIn, clientController.getAllClients);

export default router;
