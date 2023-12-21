import { Response } from "express";

export interface IBaseView {
    Init(): void;
    RenderResponseData(...data: any): void;
    Response(response: Response): void;
}