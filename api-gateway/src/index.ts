import { PORT } from "./config/dotenv.config";
import app from './app'

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});