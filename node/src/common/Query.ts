import Mysql, { PoolConnection } from 'mysql';
export function GetConnection(pool: Mysql.Pool): Promise<PoolConnection> {
    return new Promise((resolve, reject) => {
        pool.getConnection((err, connection) => {
            if (err) {
                reject(err);
            } else {
                resolve(connection);
            }
        });
    });
}

export function Query(connection: PoolConnection, sql: string, values?: any[]): Promise<any> {
    return new Promise((resolve, reject) => {
        connection.query(sql, values, (err, result) => {
            connection.release();
            if (err) {
                reject(err);
            } else {
                resolve(result);
            }
        })
    });
}