import ApiError from "../helper/ApiError";
import ClientModel, { IClient } from "../model/client.model";
import httpStatus from "../util/httpStatus";

const createClient = async (data: IClient) => {
  if (await ClientModel.isIdExist(data.id)) {
    throw new ApiError(httpStatus.badRequest, "ID is already exist");
  }
  return ClientModel.create(data);
};

const getAllClient = async (page = "1", limit = "10") => {
  const Page = parseInt(page) - 1;
  const Limit = parseInt(limit);
  const skip = Page * Limit;

  const total = await ClientModel.countDocuments();
  const client = await ClientModel.find().skip(skip).limit(Limit);

  return { total, client, page: Page + 1, limit: Limit };
};

export default { createClient, getAllClient };
