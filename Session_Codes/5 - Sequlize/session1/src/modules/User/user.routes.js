import express from 'express';
import * as UC from './user.controllers.js';

const userRouter = express.Router();
userRouter.post("/addUsers",UC.addUser);
userRouter.get("/findFemales",UC.findFemales);
userRouter.get("/findMales",UC.findMales);
userRouter.get("/findFirstMale",UC.findFirstMale);
userRouter.get("/:id",UC.findById);
userRouter.delete("/:id",UC.deleteById);
userRouter.patch("/:id/:name",UC.updateName);

export default userRouter;