export class RequestDataBase {
    protected headers: Map<string, string>; // 请求头
    protected params: Map<string, any>; // 请求参数
    public constructor() {
        this.params = new Map<string, any>();
    }

    public Init(): void {

    }

    public GetParam<T>(key: string): T | null {
        if (!this.params.has(key)) {
            console.warn(`参数{${key}}不存在`);
            return null;
        }
        return this.params.get(key) as T;
    }

    protected SetParam(key: string): void {
        if (this.params.has(key)) {
            console.warn(`参数{${key}}已经存在`);
            return;
        }
        this.params.set(key, null);
    }

    protected SetParams(...params: string[]): void {
        params.forEach((param) => {
            this.SetParam(param);
        });
    }

    public SetParamValue<T>(key: string, value: T): void {
        if (!this.params.has(key)) {
            console.warn(`参数{${key}}不存在`);
            return;
        }
        this.params.set(key, value);
    }

    public SetParamValues<T>(...params: { key: string, value: T }[]): void {
        params.forEach((param) => {
            this.SetParamValue(param.key, param.value);
        });
    }

    public RemoveParam(key: string): void {
        if (!this.params.has(key)) {
            console.warn(`参数{${key}}不存在`);
            return;
        }
        this.params.delete(key);
    }

    public ClearParams(): void {
        this.params.clear();
    }

    public GetHeader<T>(key: string): T | null {
        if (!this.headers.has(key)) {
            console.warn(`请求头{${key}}不存在`);
            return null;
        }
        return this.headers.get(key) as T;
    }

    protected SetHeader(key: string): void {
        if (this.headers.has(key)) {
            console.warn(`请求头{${key}}已经存在`);
            return;
        }
        this.headers.set(key, "");
    }

    public SetHeaderValue(key: string, value: string): void {
        if (!this.headers.has(key)) {
            console.warn(`请求头{${key}}不存在`);
            return;
        }
        this.headers.set(key, value);
    }

    protected RemoveHeader(key: string): void {
        if (!this.headers.has(key)) {
            console.warn(`请求头{${key}}不存在`);
            return;
        }
        this.headers.delete(key);
    }
}