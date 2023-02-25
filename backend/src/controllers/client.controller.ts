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

const getAllClients = asyncHandler(
  async (req: ProtectedRequest, res: Response) => {
    const { page, limit } = req.query;

    const clients = await clientService.getAllClient(
      page as string,
      limit as string
    );
    return commonResponse(res, "Clients Retrieved Successfully", clients);
  }
);

export default {
  createClient,
  getAllClients,
};
