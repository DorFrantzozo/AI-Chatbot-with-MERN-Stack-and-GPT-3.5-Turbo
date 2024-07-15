import app from "./app.js";
import { connectToDb } from "./db/connections.js";

const PORT = process.env.PORT || 5000;
connectToDb()
  .then(() =>
    app.listen(PORT, () =>
      console.log(`Server running on port ${PORT}` + "Connect to Db")
    )
  )
  .catch((error) => console.log(error));
