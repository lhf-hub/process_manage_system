import { Request, Response } from "express";
import { BaseController } from "../controller/BaseController";
import { ViewType } from "./ViewType";

export class ViewInfo<T> {
    public ViewType: ViewType;
    public Controller: BaseController;
    public ViewConstructor: { new(req: Request, res: Response): T };

    public constructor(viewType: ViewType, controller: BaseController, viewConstructor: { new(req: Request, res: Response): T }) {
        this.ViewType = viewType;
        this.Controller = controller;
        this.ViewConstructor = viewConstructor;
    }
}