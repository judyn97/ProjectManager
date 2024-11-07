import express from "express";
import cors from "cors";
import taskRoutes from "./routes/tasks.js";
import bucketRoutes from "./routes/buckets.js";
import projectRoutes from "./routes/projects.js";
import departmentRoutes from "./routes/departments.js";
import eventRoutes from "./routes/events.js";
import commentRoutes from "./routes/comments.js";

const app = express();

app.use(express.json());
app.use(cors());

app.use("/tasks", taskRoutes);
app.use("/buckets", bucketRoutes);
app.use("/projects", projectRoutes);
app.use("/departments", departmentRoutes);
app.use("/events", eventRoutes);
app.use("/comments", commentRoutes);

export default app;
