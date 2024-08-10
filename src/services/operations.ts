import { OperationsModel } from "../models";
import { IOperation } from "../common/interfaces/entities";
import APIError from "../errors";
import { isValidObjectId } from "mongoose";

export const getOperation = async (_id: string|null) => {
  if (!_id) {
    const operation = await OperationsModel.Operation.find({});
    return operation;
  } else {
    const operation = await OperationsModel.Operation.find({ _id });
    if (!operation || operation.length === 0) {
      throw new APIError({
        message: "operation not found",
        statusCode: 200,
      });
    }
    return operation;
  }
};

export const createOperation = async ({ cost, type }: IOperation) => {
  const operation = await OperationsModel.Operation.create({ cost, type });
  if (!operation) {
    throw new APIError({
      message: "Error creating operation",
      statusCode: 404,
    });
  }
  return operation;
};

export const updateOperation = async (id: string, { cost, type }: IOperation) => {
  if (!isValidObjectId(id)) {
    throw new APIError({
      message: "operation Id does not exist",
      statusCode: 404,
    });
  }
  const operation = await OperationsModel.Operation.find({ _id: id });

  if (!operation || operation.length === 0) {
    throw new APIError({
      message: "Error updating operation",
      statusCode: 404,
    });
  }

  const operationUpdated = await OperationsModel.Operation.findByIdAndUpdate(
    id,
    { cost, type },
    { new: true }
  );
  return operationUpdated;
};

export const deleteOperation = async (id: string) => {
  if (!isValidObjectId(id)) {
    throw new APIError({
      message: "operation Id does not exist",
      statusCode: 404,
    });
  }
  const operationInfo = await OperationsModel.Operation.find({ _id: id });

  if (!operationInfo || operationInfo.length === 0) {
    throw new APIError({
      message: "Error updating operation",
      statusCode: 404,
    });
  }

  const operation = await OperationsModel.Operation.findByIdAndDelete(id);

  return operation;
};
