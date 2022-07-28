import { Router } from "express";
import passport from "passport";
import controller from "../controllers/messageControllers.js"

const router = Router();

router.get ("/", controller.viewAllMessages);

router.get ("/view/:_id", controller.getMessageById);

router.post("/create", controller.createMessage);

router.get("/categoryName/:category", controller.viewMessageByCategory);

/**
 * Passport authentication
 */
router.use(passport.authenticate('jwt',{session: false}));

router.patch("/edit/:id", controller.editMyMessage);

router.patch("/delete/:id", controller.deleteMessage);



export default router;
