
import { ModelInfo } from "./ModelInfo";
import { ModelType } from "./ModelType";

export class ModelManager {
    private _models: Map<ModelType, ModelInfo<any>>;

    public constructor() {
        this._models = new Map<ModelType, ModelInfo<any>>();
    }

    public Register<T>(modelType: ModelType, modelInfo: ModelInfo<T>): void {
        if (this._models.has(modelType)) {
            console.warn(`数据模型{${modelType}}已经注册过了`);
            return;
        }
        this._models.set(modelType, modelInfo);
    }

    public UnRegister(modelType: ModelType): void {
        if (!this._models.has(modelType)) {
            console.warn(`数据模型{${modelType}}没有被注册`);
            return;
        }
        this._models.delete(modelType);
    }

    public GetModelInfo<T>(modelType: ModelType): ModelInfo<T> | null {
        if (!this._models.has(modelType)) {
            console.warn(`数据模型{${modelType}}没有被注册`);
            return null;
        }
        return this._models.get(modelType) ?? null;
    }
}