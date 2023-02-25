import ApiError from "../helper/ApiError";
import ClientModel, { IClient } from "../model/client.model";
import httpStatus from "../util/httpStatus";

const createClient = async (data: IClient) => {
  if (await ClientModel.isIdExist(data.id)) {
    throw new ApiError(httpStatus.badRequest, "ID is already exist");
  }
  return ClientModel.create(data);
};

export default { createClient };
