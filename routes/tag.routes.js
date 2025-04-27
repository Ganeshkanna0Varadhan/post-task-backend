import { Router } from "express";
import { createTag, deleteTag, getAllTag } from "../controller/tag.controller.js";

const tagRouter = Router();

tagRouter.post('/', createTag);
tagRouter.get('/', getAllTag);
tagRouter.delete("/:id", deleteTag)

export default tagRouter;