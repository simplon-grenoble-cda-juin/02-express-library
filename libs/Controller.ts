import { Request, Response } from "express";
import { Flash } from "../middlewares/flash";

export abstract class Controller {
  protected request: Request;
  protected response: Response;

  constructor(request: Request, response: Response) {
    this.request = request;
    this.response = response;
  }

  protected addFlash(flash: Flash): string {
    return new URLSearchParams(
      flash as {
        type: string;
        message: string;
      }
    ).toString();
  }
}
