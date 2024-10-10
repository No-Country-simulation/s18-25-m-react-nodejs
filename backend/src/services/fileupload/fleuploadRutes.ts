import { Router } from "express";
import FileUpload from "./fileupload";

const fuRouter = Router();

fuRouter.post("/fileupload", FileUpload);

export default fuRouter;
