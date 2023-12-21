import Express from 'express';
import Path from 'path';
const Home = Express.Router();
const FilePath = Path.join(__dirname, '../', '../', 'resources', 'static', 'index.html');
Home.get('/', (req, res) => {
  res.sendFile(FilePath);
});

export default Home;