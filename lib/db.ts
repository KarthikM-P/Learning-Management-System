import { MongoClient, ObjectId } from "mongodb"

// This would come from environment variables in a real app
const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost:27017"
const MONGODB_DB = process.env.MONGODB_DB || "learning_management_system"

let cachedClient: MongoClient | null = null
let cachedDb: any = null

export async function connectToDatabase() {
  // If we already have a connection, use it
  if (cachedClient && cachedDb) {
    return { client: cachedClient, db: cachedDb }
  }

  // If no connection, create a new one
  const client = new MongoClient(MONGODB_URI)

  await client.connect()
  const db = client.db(MONGODB_DB)

  // Cache the connection
  cachedClient = client
  cachedDb = db

  return { client, db }
}

// Course functions
export async function getCourses() {
  const { db } = await connectToDatabase()
  return db.collection("courses").find({}).toArray()
}

export async function getCourseById(id: string) {
  const { db } = await connectToDatabase()
  return db.collection("courses").findOne({ _id: new ObjectId(id) })
}

export async function createCourse(courseData: any) {
  const { db } = await connectToDatabase()
  return db.collection("courses").insertOne(courseData)
}

// User functions
export async function getUserById(id: string) {
  const { db } = await connectToDatabase()
  return db.collection("users").findOne({ _id: new ObjectId(id) })
}

export async function getStudents() {
  const { db } = await connectToDatabase()
  return db.collection("users").find({ role: "student" }).toArray()
}

// Assignment functions
export async function getAssignmentsByCourseId(courseId: string) {
  const { db } = await connectToDatabase()
  return db
    .collection("assignments")
    .find({ courseId: new ObjectId(courseId) })
    .toArray()
}

export async function submitAssignment(assignmentData: any) {
  const { db } = await connectToDatabase()
  return db.collection("assignments_submissions").insertOne(assignmentData)
}

// Chat functions
export async function getChatMessages(courseId: string) {
  const { db } = await connectToDatabase()
  return db
    .collection("chat_messages")
    .find({ courseId: new ObjectId(courseId) })
    .sort({ createdAt: 1 })
    .toArray()
}

export async function sendChatMessage(messageData: any) {
  const { db } = await connectToDatabase()
  return db.collection("chat_messages").insertOne({
    ...messageData,
    createdAt: new Date(),
  })
}

