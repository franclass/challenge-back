import { OperationService, RecordService, UserService } from "../services";
import { CustomReqRes } from "../common/interfaces/custom.reqres";
import APIError from "../errors";
import { IUser } from "../common/interfaces/entities";
import axios from "axios";

export const getRecords: CustomReqRes = async (req, res, next) => {
  try {
    const { offset, filter } = req.params;
    const { user_id } = req.body;
    const limit = 10;
    const pageNumber = Number(offset) / limit;
    const records = await RecordService.getRecords(
      filter,
      Number(offset),
      limit,
      user_id
    );

    res.status(200).json({records, pageNumber, limit});
  } catch (error) {
    next(error);
  }
};

export const performOperation = async (
  operation_name: string,
  amount_a: number,
  amount_b: number | null = null
) => {
  switch (operation_name) {
    case "addition":
      return amount_a + (amount_b || 0);
    case "subtraction":
      return amount_a - (amount_b || 0);
    case "multiplication":
      return amount_a * (amount_b || 0);
    case "division":
      if (amount_b === 0) throw new Error("Division by zero is not allowed");
      return amount_a / (amount_b || 1);
    case "square_root":
      if (amount_a < 0)
        throw new Error("Square root of negative number is not allowed");
      return Math.sqrt(amount_a);
    case "random_string":
      const randomString = await generateRandomString();
      return randomString;
    default:
      throw new Error("Invalid operation_id");
  }
};

const generateRandomString = async () => {
  const response = await axios.get(
    "https://www.random.org/strings/?num=1&len=10&digits=on&upperalpha=on&loweralpha=on&unique=on&format=plain&rnd=new"
  );
  return response.data.trim();
};

export const createRecord: CustomReqRes = async (req, res, next) => {
  try {
    const { _id, amount_a, amount_b, email } = req.body;


    const operation_id = _id
    const operation: any = await OperationService.getOperation(operation_id);

    const result = await performOperation(
      operation[0].type,
      Number(amount_a),
      Number(amount_b)
    );
    const userData: IUser = await UserService.getUser({email});



    if (!userData._id) {
      throw new APIError({
        message: "No user found",
        statusCode: 200,
      });
    }

    if (userData.current_balance < operation[0].cost) {
      throw new APIError({
        message: "Not enough balance",
        statusCode: 200,
      });
    }
   

    if (!operation) {
      throw new APIError({
        message: "Operation not found",
        statusCode: 200,
      });
    }
   
    const userUpdated = await UserService.updateUser(userData._id, {
      current_balance: userData.current_balance - operation[0].cost,
    });


    if (!userUpdated) {
      throw new APIError({
        message: "Error updating user",
        statusCode: 200,
      });
    }
    const newRecord = await RecordService.createRecord({
      operation_id,
      amount_a,
      amount_b,
      user_id: userUpdated._id,
      user_balance: userUpdated.current_balance,
      operation_response: result.toString(),
    });
    res.status(200).json({ ...newRecord, status: "success" });
  } catch (error) {
    next(error);
  }
};

export const softDeleteRecord: CustomReqRes = async (req, res, next) => {
  try {
    const id = req.params.id;
    const newRecord = await RecordService.updateRecord(id, {
      deleted: true,
    });
    res.status(200).json(newRecord);
  } catch (error) {
    next(error);
  }
};
