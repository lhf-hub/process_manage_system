import { MVCApp } from "./MVCApp";
import { ControllerType } from "./mvc/controller/ControllerType";

export function GlobalInit() {
    // 初始化MVCApp
    new MVCApp();
    // 注册控制器

    // 初始化控制器
    MVCApp.ControllerManager.InitAll();
}
