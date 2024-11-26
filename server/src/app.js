import express from "express";
import cors from "cors";
import taskRoutes from "./routes/tasks.js";
import bucketRoutes from "./routes/buckets.js";
import projectRoutes from "./routes/projects.js";
import departmentRoutes from "./routes/departments.js";
import eventRoutes from "./routes/events.js";
import commentRoutes from "./routes/comments.js";
import supertokens from "supertokens-node";
import { middleware } from "supertokens-node/framework/express";
import { errorHandler } from "supertokens-node/framework/express";
import Session from "supertokens-node/recipe/session";
import EmailPassword from "supertokens-node/recipe/emailpassword";
import Dashboard from "supertokens-node/recipe/dashboard";
import { verifySession } from "supertokens-node/recipe/session/framework/express";
import UserMetadata from "supertokens-node/recipe/usermetadata";
import EmailVerification from "supertokens-node/recipe/emailverification";

supertokens.init({
    framework: "express",
    supertokens: {
        // https://try.supertokens.com is for demo purposes. Replace this with the address of your core instance (sign up on supertokens.com), or self host a core.
        connectionURI: "http://10.111.160.105:28307",
        // apiKey: <API_KEY(if configured)>,
    },
    appInfo: {
        // learn more about this on https://supertokens.com/docs/session/appinfo
        appName: "projectmanager",
        apiDomain: "http://10.111.160.105:28001",
        websiteDomain: "http://10.111.160.105:28000",
        apiBasePath: "/auth",
        websiteBasePath: "/auth",
    },
    recipeList: [
        EmailPassword.init(), // initializes signin / sign up features
        Session.init(), // initializes session features
        Dashboard.init(),
        UserMetadata.init(),
        EmailVerification.init({
            mode: "REQUIRED", // or "OPTIONAL"
          }),
    ]
});

const app = express();

app.use(express.json());
app.use(cors({
    origin: "http://10.111.160.105:28000",
    allowedHeaders: ["content-type", ...supertokens.getAllCORSHeaders()],
    credentials: true,
}));

app.use(middleware());

app.use("/tasks", taskRoutes);
app.use("/buckets", bucketRoutes);
app.use("/projects", projectRoutes);
app.use("/departments", departmentRoutes);
app.use("/events", eventRoutes);
app.use("/tasks", commentRoutes);

app.get("/get-user-info", verifySession(), async (req, res) => {
  const session = req.session;
  const userId = session.getUserId();
  
  let userInfo = await supertokens.getUser(userId)

  res.setHeader('Content-Type', 'application/json');
  res.end(JSON.stringify(userInfo));
  /**
   * 
   * userInfo contains the following info:
   * - emails
   * - id
   * - timeJoined
   * - tenantIds
   * - phone numbers
   * - third party login info
   * - all the login methods associated with this user.
   * - information about if the user's email is verified or not.
   * 
  */
})

app.use(errorHandler())

export default app;
