const express = require("express");
const cors = require("cors");
const morgan = require("morgan");

const healthRoutes = require("./routes/health.routes");
const taskRoutes = require("./routes/task.routes");

const {
  client,
  httpRequestsTotal,
  httpRequestDuration,
} = require("./utils/metrics");

const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

// Prometheus HTTP metrics middleware
app.use((req, res, next) => {
  const start = process.hrtime();

  res.on("finish", () => {
    const diff = process.hrtime(start);
    const durationSeconds = diff[0] + diff[1] / 1e9;

    const route = req.route?.path || req.path;
    const statusCode = res.statusCode.toString();

    httpRequestsTotal.inc({
      method: req.method,
      route,
      status_code: statusCode,
    });

    httpRequestDuration.observe(
      {
        method: req.method,
        route,
        status_code: statusCode,
      },
      durationSeconds
    );
  });

  next();
});

// Prometheus metrics endpoint
app.get("/metrics", async (req, res) => {
  res.set("Content-Type", client.register.contentType);
  res.end(await client.register.metrics());
});

app.use("/health", healthRoutes);
app.use("/tasks", taskRoutes);

module.exports = app;