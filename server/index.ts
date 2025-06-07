import path from "node:path";
import os from "node:os";
import express from "express";
import cluster from "cluster";

import { config } from "./config";
import teamsRoutes from "./routes/teams";
import weatherRoutes from "./routes/weather";

const numCPUs = os.cpus().length;
const isDev = config.env !== "production"; // TODO: consider checking for a test environment

// multi-process to utilize all CPU cores
if (!isDev && cluster.isMaster) {
  console.error(`Node cluster master ${process.pid} is running`);

  // fork workers
  for (let i = 0; i < numCPUs; i += 1) {
    cluster.fork();
  }

  cluster.on("exit", (worker, code, signal) => {
    console.error(
      `Node cluster worker ${worker.process.pid} exited: code ${code}, signal ${signal}`,
    );
  });
} else {
  const app = express();

  // priority serve any static files (should be import.meta.dirname these days)
  app.use(express.static(path.resolve(__dirname, "..", "client", "build")));

  // register API routes
  app.use("/api/teams", teamsRoutes);
  app.use("/api/weather", weatherRoutes);

  // all remaining requests return the React app, so it can handle routing
  app.get("*", (request, response) => {
    // should be import.meta.dirname these days
    response.sendFile(
      path.resolve(__dirname, "..", "client", "build", "index.html"),
    );
  });

  app.listen(config.port, () => {
    console.error(
      `Node ${
        isDev ? "dev server" : `cluster worker ${process.pid}`
      }: listening on port ${config.port}`,
    );
  });
}
