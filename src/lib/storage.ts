import { TableClient } from "@azure/data-tables";
import { randomBytes } from "crypto";
import type { ContactFormData } from "@/lib/contact";

const TABLE_NAME = "ContactSubmissions";

let tableClient: TableClient | null = null;

function getTableClient(): TableClient | null {
  if (tableClient) return tableClient;

  const connectionString = process.env.STORAGE_ACCOUNT_CONNECTION;
  if (!connectionString) {
    console.warn(
      "[storage] STORAGE_ACCOUNT_CONNECTION not set - skipping Table Storage persistence.",
    );
    return null;
  }

  tableClient = TableClient.fromConnectionString(connectionString, TABLE_NAME);
  return tableClient;
}

export async function saveContactSubmission(
  data: ContactFormData,
  ipHash: string,
): Promise<void> {
  const client = getTableClient();
  if (!client) return;

  const now = new Date();
  const random = randomBytes(4).toString("hex");
  const rowKey = `${now.getTime()}-${random}`;

  try {
    await client.createEntity({
      partitionKey: "contact",
      rowKey,
      name: data.name,
      email: data.email,
      company: data.company ?? "",
      reason: data.reason ?? "",
      message: data.message,
      ipHash,
      createdAt: now.toISOString(),
    });
  } catch (err) {
    console.error("[storage] Failed to save contact submission:", err);
    // Re-throw so the caller is aware, but the API route can decide how to handle it
    throw err;
  }
}
