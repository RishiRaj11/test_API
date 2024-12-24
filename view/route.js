import { Router } from "express";
// import { signUpHandler,loginHandler } from "../controller/userController.js";
// import { getAllMovies } from "../controller/moviesController.js";
import {groupController,deleteGroupController,postController,groupDetailsController,getGroupDetailsById } from "../controller/groupController.js"
const router=Router();

//endpints
// router.post("/signup",signUpHandler)
// router.post("/login",loginHandler)
// router.get("/getmovies",getAllMovies)
router.get("/dms-group-details/getAllGroupPersonNumber",groupController);
router.delete('/api/groups/:id',deleteGroupController);
router.post("/dms-group-details/save",postController)
router.post("/group/management/createdNewGroup",groupDetailsController)
router.get("/dms-group-details/getBy/:dmsGroupDetailsId",getGroupDetailsById );

export default router;