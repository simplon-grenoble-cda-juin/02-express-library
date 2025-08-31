import { Request, Response, NextFunction } from "express";

export enum FlashEnum {
  SUCCESS = "success",
  ERROR = "error",
  WARNING = "warning",
  INFO = "info",
}

export interface Flash {
  type: FlashEnum;
  message: string;
}

export function flashFromQuery(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const type = req.query.type as FlashEnum | undefined;
  const message = req.query.message as string | undefined;

  let flash: Flash | null = null;
  if (type && message) {
    flash = { type, message };
  }

  res.locals.flash = flash;
  next();
}
