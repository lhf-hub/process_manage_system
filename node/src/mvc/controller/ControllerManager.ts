import { BaseModel } from "../model/BaseModel";
import { BaseController } from "./BaseController";
import { ControllerType } from "./ControllerType";

export class ControllerManager {
    private _controllers: Map<ControllerType, BaseController>;

    public constructor() {
        this._controllers = new Map<ControllerType, BaseController>();
    }

    /**
     * 初始化所有控制器
     */
    public InitAll(): void {
        this._controllers.forEach((controller) => {
            controller.Init();
        });
    }

    /**
     * 注册控制器
     * @param controllerType 
     * @param controller 
     * @returns 
     */
    public Register(controllerType: ControllerType, controller: BaseController): void {
        if (this._controllers.has(controllerType)) {
            console.warn(`控制器{${controllerType}}已经注册过了`);
            return;
        }
        this._controllers.set(controllerType, controller);
    }

    /**
     * 注销控制器
     * @param controllerType 
     * @returns 
     */
    public UnRegister(controllerType: ControllerType): void {
        if (!this._controllers.has(controllerType)) {
            console.warn(`控制器{${controllerType}}没有被注册`);
            return;
        }
        this._controllers.delete(controllerType);
    }

    public Clear(): void // 清空控制器
    {
        this._controllers.clear();
    }

    /**
     * 执行指定控制器的事件回调
     * @param controllerType 
     * @param eventName 
     * @param args 
     */
    public ApplyEvent(controllerType: ControllerType, eventName: string, ...args: any): void {
        if (!this._controllers.has(controllerType)) {
            console.warn(`控制器{${controllerType}}没有被注册`);
            return;
        }
        this._controllers.get(controllerType)?.ApplyEvent(eventName, ...args);
    }

}