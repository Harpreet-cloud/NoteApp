import dotenv from "dotenv";
dotenv.config();
import { connect } from "./connect.js"; // will connect to mongoDB
import app from "./server.js"; // importing app instance from server.js

//for later use 
// import { createJWT } from "./modules/auth.js";

// console.log(createJWT({ id: "2", username: "al" }));

connect(process.env.DB_CONN)
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log(`Server running on http://localhost:${process.env.PORT}`);
    });
  })
  .catch((e) => console.error(e));

