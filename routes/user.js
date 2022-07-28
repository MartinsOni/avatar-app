import { Router } from "express";
import passport from "passport";
import controllers from "../controllers/userControllers.js";


const router = Router();

router.get("/", controllers.allUser)

router.post("/register", controllers.registerUser)

router.post("/login", controllers.login)

router.get('/logout', controllers.logout)

router.use(passport.authenticate('jwt',{session:false}));

router.get ("/profile", controllers.getProfile)

export default router;
