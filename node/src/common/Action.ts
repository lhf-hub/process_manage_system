export class Action {
    private _action: (...args: any) => void;
    public constructor(action: (...args: any) => void) {
        this._action = action;
    }
    public Invoke(...args: any): void {
        this._action(...args);
    }
}