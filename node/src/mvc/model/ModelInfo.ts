import { BaseController } from "../controller/BaseController";
import { ModelType } from "./ModelType";

export class ModelInfo<T> {
    public ModelType: ModelType;
    public Controller: BaseController;
    public ModelConstructor: { new(): T };

    public constructor(modelType: ModelType, controller: BaseController, modelConstructor: { new(): T }) {
        this.ModelType = modelType;
        this.Controller = controller;
        this.ModelConstructor = modelConstructor;
    }
}