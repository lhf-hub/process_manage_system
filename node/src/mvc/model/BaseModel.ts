import { BaseController } from "../controller/BaseController";
import { Query, GetConnection } from "../../common/Query";
import { ConnectionPool } from "../..";

/**
 * Model基类
 */
export class BaseModel {
    protected tableName: string; // 表名
    protected primaryKey: string; // 主键
    protected fields: Map<string, any>; // 字段
    public Controller: BaseController;

    public constructor() {
        this.Init();
    }

    /**
     * 初始化，设置表名，字段，主键，在子类中重写
     */
    public Init(): void {
        this.fields = new Map<string, any>();
    }

    protected InitField(...fieldsName: string[]): void {
        fieldsName.forEach((fieldName) => {
            if (this.fields.has(fieldName)) {
                console.warn(`字段{${fieldName}}已经存在`);
                return;
            }
            this.fields.set(fieldName, null);
        });
    }

    public SetFieldValue(fieldName: string, value: any): void {
        if (!this.fields.has(fieldName)) {
            console.warn(`字段{${fieldName}}不存在`);
            return;
        }
        this.fields.set(fieldName, value);
    }

    public SetAllFieldValue(...fields: { key: string, value: any }[]): void {
        fields.forEach((field) => {
            this.SetFieldValue(field.key, field.value);
        })
    }

    public GetFieldValue(fieldName: string): any {
        if (!this.fields.has(fieldName)) {
            console.warn(`字段{${fieldName}}不存在`);
            return null;
        }
        return this.fields.get(fieldName);
    }

    public async Insert(): Promise<boolean> {
        var sql: string = `INSERT INTO ${this.tableName} VALUES(`;
        var fields: any[] = [];
        this.fields.forEach((value, key) => {
            sql += `?,`;
            fields.push(value);
        });
        sql = sql.slice(0, sql.length - 1);
        sql += `)`;
        try {
            var result = await Query(await GetConnection(ConnectionPool), sql, fields);
            return result.affectedRows > 0;
        } catch (error) {
            console.error(error);
            return false;
        }
    }

    public async Update(): Promise<boolean> {
        var sql: string = `UPDATE ${this.tableName} SET `;
        var fields: any[] = [];
        this.fields.forEach((value, key) => {
            sql += `${key} = ?,`;
            fields.push(value);
        });
        sql = sql.slice(0, sql.length - 1);
        sql += ` WHERE ${this.primaryKey} = ?`;
        fields.push(this.fields.get(this.primaryKey));
        try {
            var result = await Query(await GetConnection(ConnectionPool), sql, fields);
            return result.affectedRows > 0;
        } catch (error) {
            console.error(error);
            return false;
        }
    }

    public async Delete(): Promise<boolean> {
        var sql: string = `DELETE FROM ${this.tableName} WHERE ${this.primaryKey} = ?`;
        var fields: any[] = [];
        fields.push(this.fields.get(this.primaryKey));
        try {
            var result = await Query(await GetConnection(ConnectionPool), sql, fields);
            return result.affectedRows > 0;
        } catch (error) {
            console.error(error);
            return false;
        }
    }

    public async Find(): Promise<BaseModel | null> {
        var sql: string = `SELECT * FROM ${this.tableName} WHERE ${this.primaryKey} = ?`;
        var fields: any[] = [];
        fields.push(this.fields.get(this.primaryKey));
        try {
            var result = await Query(await GetConnection(ConnectionPool), sql, fields);
            if (result.length > 0) {
                var tempFields: { key: string, value: any }[] = [];
                Object.keys(result[0] as Object).forEach((key) => {
                    tempFields.push({ key: key, value: result[0][key] });
                });
                this.SetAllFieldValue(...tempFields);
                return this;
            }
            return null;
        } catch (error) {
            console.error(error);
            return null;
        }
    }


}