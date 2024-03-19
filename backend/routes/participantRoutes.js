import express from "express";
import {
  autoCall,
  sendParticipantEmail,
} from "../controllers/participantController.js";
const router = express.Router();

router.route("/send-email").post(sendParticipantEmail);
router.route("/auto-call").get(autoCall);

export default router;
