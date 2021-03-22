import { Router } from 'express';

import categoriesRoute from "./categories.route";
import specificationsRoute from "./specifications.route";

const router = Router();

router.use('/categories', categoriesRoute);
router.use('/specifications', specificationsRoute);

export default router;
