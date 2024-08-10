import { OperationService } from "../services";
import { CustomReqRes } from "../common/interfaces/custom.reqres";

export const getOperations: CustomReqRes = async (req, res, next) => {
  try {
    const Operations = await OperationService.getOperation(null);
    res.status(200).json(Operations);
  } catch (error) {
    next(error);
  }
};


