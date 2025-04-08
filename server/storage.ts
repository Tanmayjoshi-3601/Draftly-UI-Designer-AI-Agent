import { designs, type Design, type InsertDesign, type GeneratedDesignResponse } from "@shared/schema";
import { users, type User, type InsertUser } from "@shared/schema";

export interface IStorage {
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  getAllDesigns(): Promise<Design[]>;
  getDesign(id: number): Promise<Design | undefined>;
  createDesign(design: InsertDesign & { createdAt: string }): Promise<Design>;
  generateDesign(prompt: string, options?: any): Promise<GeneratedDesignResponse>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private designsStore: Map<number, Design>;
  private userIdCounter: number;
  private designIdCounter: number;

  constructor() {
    this.users = new Map();
    this.designsStore = new Map();
    this.userIdCounter = 1;
    this.designIdCounter = 1;
  }

  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.userIdCounter++;
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  async getAllDesigns(): Promise<Design[]> {
    return Array.from(this.designsStore.values());
  }

  async getDesign(id: number): Promise<Design | undefined> {
    return this.designsStore.get(id);
  }

  async createDesign(design: InsertDesign & { createdAt: string }): Promise<Design> {
    const id = this.designIdCounter++;
    
    // Create a properly typed Design object
    const newDesign = {
      id, 
      name: design.name,
      userId: null as number | null, 
      prompt: design.prompt,
      generatedDesign: design.generatedDesign ?? null,
      createdAt: design.createdAt
    };
    
    this.designsStore.set(id, newDesign);
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

export const storage = new MemStorage();
