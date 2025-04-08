import { designs, type Design, type InsertDesign, type GeneratedDesignResponse } from "@shared/schema";
import { users, type User, type InsertUser } from "@shared/schema";
import { db } from "./db";
import { eq } from "drizzle-orm";

export interface IStorage {
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  getAllDesigns(): Promise<Design[]>;
  getDesign(id: number): Promise<Design | undefined>;
  createDesign(design: InsertDesign & { createdAt: string }): Promise<Design>;
  generateDesign(prompt: string, options?: any): Promise<GeneratedDesignResponse>;
}

export class DatabaseStorage implements IStorage {
  async getUser(id: number): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user || undefined;
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.username, username));
    return user || undefined;
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const [user] = await db
      .insert(users)
      .values(insertUser)
      .returning();
    return user;
  }

  async getAllDesigns(): Promise<Design[]> {
    return db.select().from(designs);
  }

  async getDesign(id: number): Promise<Design | undefined> {
    const [design] = await db.select().from(designs).where(eq(designs.id, id));
    return design || undefined;
  }

  async createDesign(design: InsertDesign & { createdAt: string }): Promise<Design> {
    // Ensure the design has the required structure
    const designData = {
      name: design.name,
      userId: null as number | null, 
      prompt: design.prompt,
      generatedDesign: design.generatedDesign ?? null,
      createdAt: design.createdAt
    };
    
    const [newDesign] = await db
      .insert(designs)
      .values(designData)
      .returning();
    
    return newDesign;
  }

  async generateDesign(prompt: string, options?: any): Promise<GeneratedDesignResponse> {
    // Import and use the OpenAI service
    const { generateDesign } = await import('./openai');
    
    try {
      // Generate the design using OpenAI
      return await generateDesign(prompt, options);
    } catch (error: any) {
      console.error("Error in generateDesign:", error);
      
      // Provide a fallback in case of API errors
      throw new Error(`Failed to generate design using OpenAI API: ${error.message || 'Unknown error'}`);
    }
  }
}

export const storage = new DatabaseStorage();
