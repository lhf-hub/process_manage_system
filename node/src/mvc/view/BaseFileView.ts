import { Request, Response } from "express";
import { IBaseView } from "./IBaseView";
import { RequestDataBase } from "../RequestDataBase";

export class BaseFileView implements IBaseView {
    protected request: Request;
    protected response: Response;
    protected requestData: RequestDataBase;
    protected file: Buffer;
    protected responseData: any;

    public constructor(req: Request, res: Response) {
        this.request = req;
        this.response = res;
        this.Init();
    }

    /**
     * 生成响应数据
     * @param data 
     */
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
    public GetRequestData<T extends RequestDataBase>() {
        return this.requestData as T;
    }

    /**
     * 向客户端响应数据
     */
    public Response(): void {

    }

}