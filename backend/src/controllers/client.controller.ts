import { Response } from "express";
import asyncHandler from "../helper/asyncHandler";
import commonResponse from "../helper/commonResponse";
import clientService from "../services/client.service";
import { ProtectedRequest } from "../types/app-request";
import httpStatus from "../util/httpStatus";

const createClient = asyncHandler(
  async (req: ProtectedRequest, res: Response) => {
    const client = await clientService.createClient(req.body);
    return commonResponse(
      res,
      "Client Created Successfully",
      client,
      httpStatus.created
    );
  }
);

export default {
  createClient,
};
