import { PORT } from "./config/dotenv.config";
import app from "./app";
import startUserEventsConsumer from "./service/message-queue-service";

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  startUserEventsConsumer();
});