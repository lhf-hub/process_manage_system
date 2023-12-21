import { Request, Response } from "express";
import { IBaseView } from "./IBaseView";
import { RequestDataBase } from "../RequestDataBase";

/**
 * 响应json数据的view继承此基类
 */
export class BaseJsonView implements IBaseView {
    protected request: Request;
    protected response: Response;
    protected requestData: RequestDataBase;
    protected json: any;
    protected responseData: any;

    public constructor(req: Request, res: Response) {
        this.request = req;
        this.response = res;
        this.Init();
    }
    
    public RenderResponseData(...data: any): void {
        throw new Error("Method not implemented.");
    }

    /**
     * 初始化，子类重写此方法，用于将request请求中的数据转换为view的数据
     */
    public Init(): void {

    }

    /**
     * 获取请求数据
     * @returns 
     */
    public GetRequestData<T extends RequestDataBase>(): T {
        return this.requestData as T;
    }

    /**
     * 向客户端响应数据
     * @param response 
     */
    public Response(): void {

    }

}