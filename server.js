import 'dotenv/config'
import e from "express";
import { connectDB } from './config/connections';

const app = e();
const PORT = process.env.PORT;

connectDB();

app.get('/', (req, res) => {
  app.send('placeholder');
})

app.listen(PORT, () => {
  console.log('server connected to localhost:', PORT);
})
