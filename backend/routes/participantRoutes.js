import express from "express";
import { sendParticipantEmail } from "../controllers/participantController.js";
const router = express.Router();

router.route('/send-email').post(sendParticipantEmail)

export default router
