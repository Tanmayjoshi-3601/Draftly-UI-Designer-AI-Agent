import express from "express";
import { registerRoutes } from "./server/routes";

// Create Express application
const app = express();

// Register routes and start server
async function startServer() {
  const PORT = process.env.PORT || 3000;
  
  // Register API routes
  await registerRoutes(app);
  
  // Serve frontend assets
  app.use(express.static("dist"));
  
  // Handle SPA routing - send all remaining requests to index.html
  app.get("*", (_req, res) => {
    res.sendFile("index.html", { root: "dist" });
  });
  
  // Start listening
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}

startServer().catch(console.error);

export default app;
