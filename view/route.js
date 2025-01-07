import { Router } from "express";
// import { signUpHandler,loginHandler } from "../controller/userController.js";
// import { getAllMovies } from "../controller/moviesController.js";
import {groupController,deleteGroupController,postController,groupDetailsController,getGroupDetailsById } from "../controller/groupController.js"
import { getAllDocumentsRecords } from "../controller/docController.js";
import { notificationController } from "../controller/notificationController.js";
import { createGroupController } from "../controller/createGroupController.js";
import { getAllUserController } from "../controller/getAllUserController.js";
import { userGroupMappingController } from "../controller/userGroupMappingController.js";
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
router.post("/dms-group-details/createGroup",createGroupController);
router.get("/dms-group-details/getAllUser",getAllUserController);
router.get("/dms-group-details/getGroupWithUserDetailsByGroupId/:dmsGroupDetailsId",userGroupMappingController);

export default router;