import { MVCApp } from "../../MVCApp";
import { Action } from "../../common/Action";
import { BaseModel } from "../model/BaseModel";
import { ModelType } from "../model/ModelType";
import { BaseFileView } from "../view/BaseFileView";
import { IBaseView } from "../view/IBaseView";
import { ViewType } from "../view/ViewType";
import { ControllerType } from "./ControllerType";

/**
 * controller基类
 */
export class BaseController {
    private _events: Map<string, Action>;

    constructor() {
        this._events = new Map<string, Action>();
    }

    /**
     * 初始化
     */
    public Init(): void {
        this.InitModel();
        this.InitView();
        this.InitEvent();
    }

    /**
     * 初始化事件
     */
    public InitEvent(): void {

    }

    /**
     * 初始化数据模型
     */
    public InitModel(): void {

    }

    /**
     * 初始化视图
     */
    public InitView(): void {

    }

    /**
     * 实例化注册在本控制器的view
     * @param type 视图类型
     * @param args 构造参数，args[0]为Request，args[1]为Response
     */
    public InstantiateView<T extends IBaseView>(type: ViewType, ...args: any[]): T | null {
        if (MVCApp.ViewManager.GetViewInfo<T>(type) === null) {
            console.warn(`视图{${type}}没有被注册`);
            return null;
        }
        if (MVCApp.ViewManager.GetViewInfo<T>(type)?.Controller === this) {
            var constructor = MVCApp.ViewManager.GetViewInfo<T>(type)?.ViewConstructor;
            if (constructor) {
                return new constructor(args[0], args[1]) as T;
            }
            return null;
        }
        console.warn(`视图{${type}}的控制器不是当前控制器`);
        return null;
    }

    public InstantiateModel<T extends BaseModel>(type: ModelType): T | null {
        if (MVCApp.ModelManager.GetModelInfo<T>(type) === null) {
            console.warn(`数据模型{${this}}没有被注册`);
            return null;
        }
        if (MVCApp.ModelManager.GetModelInfo<T>(type)?.Controller === this) {
            var constructor = MVCApp.ModelManager.GetModelInfo<T>(type)?.ModelConstructor;
            if (constructor) {
                return new constructor() as T;
            }
        }
        return null;
    }

    /**
     * 注册事件
     * @param eventName 事件名
     * @param callback 回调 
     * @returns 
     */
    public Register(eventName: string, callback: Action): void {
        if (this._events.has(eventName)) {
            console.warn(`事件{${eventName}}已经注册过了`);
            return;
        }
        this._events.set(eventName, callback);
    }

    /**
     * 注销事件
     * @param eventName 事件名
     * @returns 
     */
    public UnRegister(eventName: string): void {
        if (!this._events.has(eventName)) {
            console.warn(`事件{${eventName}}没有注册过`);
            return;
        }
        this._events.delete(eventName);
    }

    public RegisterModel<T extends BaseModel>(model: T): void {

    }

    /**
     * 执行本控制器事件回调
     * @param eventName 事件名
     * @param args 参数
     */
    public ApplyEvent(eventName: string, ...args: any): void {
        if (!this._events.has(eventName)) {
            console.warn(`事件{${eventName}}没有注册过`);
            return;
        }
        this._events.get(eventName)?.Invoke(...args);
    }

    /**
     * 跨模块执行控制器事件回调
     * @param controllerType 控制器类型
     * @param eventName 事件名
     * @param args 参数
     */
    public ApplyControllerEvent(controllerType: ControllerType, eventName: string, ...args: any): void {
        MVCApp.ControllerManager.ApplyEvent(controllerType, eventName, ...args);
    }

}