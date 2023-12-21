import Express from 'express';
import Cors from 'cors';
import Path from 'path';
import Open from 'open';
import DbConfig from './dbconfig/config.ts';
import Mysql from 'mysql';
import Home from './routes/home';
import { GlobalInit } from './GlobalInit.ts';
const App = Express();
const Port = 5000;
export const ConnectionPool = Mysql.createPool(DbConfig);
App.use(Cors());
App.use('/', Home);
App.use(Express.static(Path.join(__dirname, '../', 'resources', 'static')));
GlobalInit();
App.listen(Port, () => {
  console.log(`服务在${Port}端口启动`);
  Open(`http://localhost:${Port}`);
});


