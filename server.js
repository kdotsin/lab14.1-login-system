import 'dotenv/config'
import e from "express";
import { connectDB } from './config/connections.js';
import route from './route/userRoutes.js';

const app = e();
const PORT = process.env.PORT;

connectDB();

app.use(e.json());

app.use('/api', route)

app.listen(PORT, () => {
  console.log('server connected to localhost:', PORT);
})
