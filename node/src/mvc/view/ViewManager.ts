import { IBaseView } from "./IBaseView";
import { ViewInfo } from "./ViewInfo";
import { ViewType } from "./ViewType";

export class ViewManager {
    private _views: Map<ViewType, ViewInfo<any>>;

    public constructor() {
        this._views = new Map<ViewType, ViewInfo<any>>();
    }

    public Register<T>(viewType: ViewType, viewInfo: ViewInfo<T>): void {
        if (this._views.has(viewType)) {
            console.warn(`视图{${viewType}}已经注册过了`);
            return;
        }
        this._views.set(viewType, viewInfo);
    }

    public UnRegister(viewType: ViewType): void {
        if (!this._views.has(viewType)) {
            console.warn(`视图{${viewType}}没有被注册`);
            return;
        }
        this._views.delete(viewType);
    }

    public GetViewInfo<T>(viewType: ViewType): ViewInfo<T> | null {
        if (!this._views.has(viewType)) {
            console.warn(`视图{${viewType}}没有被注册`);
            return null;
        }
        return this._views.get(viewType) ?? null;
    }
}