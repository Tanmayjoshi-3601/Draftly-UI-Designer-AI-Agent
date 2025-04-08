import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertDesignSchema } from "@shared/schema";
import z from "zod";

export async function registerRoutes(app: Express): Promise<Server> {
  // API endpoints
  app.get("/api/designs", async (req, res) => {
    try {
      const designs = await storage.getAllDesigns();
      res.json(designs);
    } catch (error) {
      console.error("Error fetching designs:", error);
      res.status(500).json({ message: "Failed to fetch designs" });
    }
  });

  app.get("/api/designs/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ message: "Invalid design ID" });
      }

      const design = await storage.getDesign(id);
      if (!design) {
        return res.status(404).json({ message: "Design not found" });
      }

      res.json(design);
    } catch (error) {
      console.error("Error fetching design:", error);
      res.status(500).json({ message: "Failed to fetch design" });
    }
  });

  app.post("/api/designs", async (req, res) => {
    try {
      const validatedData = insertDesignSchema.parse(req.body);
      const newDesign = await storage.createDesign({
        ...validatedData,
        createdAt: new Date().toISOString(),
      });
      res.status(201).json(newDesign);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid design data", errors: error.errors });
      }
      console.error("Error creating design:", error);
      res.status(500).json({ message: "Failed to create design" });
    }
  });

  app.post("/api/generate", async (req, res) => {
    try {
      const { prompt, options } = req.body;
      
      if (!prompt) {
        return res.status(400).json({ message: "Prompt is required" });
      }
      
      // Call our OpenAI implementation through the storage layer
      const generatedDesign = await storage.generateDesign(prompt, options);
      res.json(generatedDesign);
    } catch (error: any) {
      console.error("Error generating design:", error);
      res.status(500).json({ 
        message: "Failed to generate design", 
        error: error.message || 'Unknown error'
      });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
