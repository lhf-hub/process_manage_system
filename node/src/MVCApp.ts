import { ControllerManager } from "./mvc/controller/ControllerManager";
import { ModelManager } from "./mvc/model/ModelManager";
import { ViewManager } from "./mvc/view/ViewManager";

export class MVCApp {
    public static ControllerManager: ControllerManager; // 控制器管理器
    public static ViewManager: ViewManager; // 视图管理器
    public static ModelManager: ModelManager; // 数据模型管理器


    public constructor() {
        MVCApp.ControllerManager = new ControllerManager();
        MVCApp.ViewManager = new ViewManager();
        MVCApp.ModelManager = new ModelManager();
    }
}