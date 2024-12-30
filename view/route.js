import { Router } from "express";
// import { signUpHandler,loginHandler } from "../controller/userController.js";
// import { getAllMovies } from "../controller/moviesController.js";
import {groupController,deleteGroupController,postController,groupDetailsController,getGroupDetailsById } from "../controller/groupController.js"
import { getAllDocumentsRecords } from "../controller/docController.js";
import { notificationController } from "../controller/notificationController.js";
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
router.get("/dms-documents",getAllDocumentsRecords);
router.get("/upload/document/getNotificationForApprover/:startDate?/:endDate?/:status?/:submittedtopersonno?",notificationController)

export default router;