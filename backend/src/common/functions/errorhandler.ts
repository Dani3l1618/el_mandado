import { NextFunction, Request, Response } from 'express';
import { ResponseDTO } from 'src/models/response.model';

export const errorHanlder = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const errorResponse: ResponseDTO<any> = {
    message: err.message,
    status: 500,
    response: err
  };
  res.status(500).send(errorResponse);
};
