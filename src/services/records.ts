import { RecordsModel, UserModel } from "../models";

import APIError from "../errors";
import { IRecord, IUser } from "../common/interfaces/entities";
import { isValidObjectId } from "mongoose";
import mongoose from "mongoose";

export const getRecords = async (
  filter: string,
  offset: number,
  limit: number,
  user_id: string
) => {
 
  const userData: IUser | null = await UserModel.User.findOne({ _id: user_id });

  if (!userData) {
    throw new APIError({
      message: "No user found",
      statusCode: 200,
    });
  } 

    if (userData._id){

      const user_id = new mongoose.Types.ObjectId(userData._id.toString());
      const aggregationPipeline = [];

      if (filter !== "null") {
        console.log("filter", filter);
         
          aggregationPipeline.push({
              $match: {
                  $or: [

                      { amount_a: filter.toString() },
                      { amount_b: filter.toString() },
                      { operation_response: filter.toString() },
                     
                  ],
                  deleted: false,
                  user_id: user_id,
              },
          });
      }
      else{
          aggregationPipeline.push({
              $match: {
                  deleted: false,
                  user_id: user_id,
              },
          });
      }

      aggregationPipeline.push({
        $lookup: {
            from: 'operations',         
            localField: 'operation_id',  
            foreignField: '_id',         
            as: 'operation'              
        }
      });

    
      aggregationPipeline.push({
        $lookup: {
            from: 'users',              
            localField: 'user_id',       
            foreignField: '_id',         
            as: 'user'                   
        }
      });
      
      aggregationPipeline.push(
          { $skip: offset },
          { $limit: limit }
      );

   

      const records = await RecordsModel.Record.aggregate(aggregationPipeline);
      
      if (!records || records.length === 0) {
        throw new APIError({
          message: "No records found",
          statusCode: 200,
        });
      }
      return records;
    }
    else {
      throw new APIError({
        message: "No valid user ID",
        statusCode: 200,
      });
    }
};

export const createRecord = async ({
  operation_id,
  user_id,
  amount_a,
  amount_b,
  user_balance,
  operation_response,
}: IRecord) => {
  const records = await RecordsModel.Record.create({
    operation_id,
    user_id,
    amount_a,
    amount_b,
    user_balance,
    operation_response,
  });
  if (!records) {
    throw new APIError({
      message: "Error creating record",
      statusCode: 404,
    });
  }
  return records;
};

export const updateRecord = async (id: string, { deleted }: IRecord) => {
  if (!isValidObjectId(id)) {
    throw new APIError({
      message: "record Id does not exist",
      statusCode: 404,
    });
  }
  const record = await RecordsModel.Record.find({ _id: id });

  if (!record || record.length === 0) {
    throw new APIError({
      message: "Error updating record",
      statusCode: 404,
    });
  }
  const recordUpdated = await RecordsModel.Record.findByIdAndUpdate(
    id,
    { deleted },
    { new: true }
  );

  return recordUpdated;
};

export const deleteRecord = async (id: string) => {
  if (!isValidObjectId(id)) {
    throw new APIError({
      message: "record Id does not exist",
      statusCode: 404,
    });
  }

  const records = await RecordsModel.Record.findByIdAndDelete(id);
  if (!records) {
    throw new APIError({
      message: "Error deleting record",
      statusCode: 404,
    });
  }
  return records;
};
