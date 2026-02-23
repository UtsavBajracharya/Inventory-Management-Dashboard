import { Router } from "express";
import { getDashboardData } from "../controllers/dashboardController.js";
const router = Router();
router.get("/", getDashboardData);
export default router;
//# sourceMappingURL=dashboardRoutes.js.map