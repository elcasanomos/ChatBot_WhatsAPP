import { sql } from 'drizzle-orm';
import { check, customType, index, integer, jsonb, numeric, pgTable, text, timestamp, uniqueIndex, uuid, varchar } from 'drizzle-orm/pg-core';

// Match dimensions to the embedding deployment before creating the migration.
const vector = customType<{ data: number[]; driverData: string }>({
  dataType: () => 'vector(1536)',
  toDriver: (value) => JSON.stringify(value),
  fromDriver: (value) => JSON.parse(value) as number[],
});
const timestamps = {
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow().notNull(),
};

export const products = pgTable('products', {
  id: uuid('id').defaultRandom().primaryKey(),
  sku: varchar('sku', { length: 64 }).notNull(),
  name: text('name').notNull(),
  description: text('description').notNull(),
  category: text('category').notNull(),
  price: numeric('price', { precision: 12, scale: 2 }).notNull(),
  currency: varchar('currency', { length: 3 }).default('BOB').notNull(),
  stock: integer('stock').default(0).notNull(),
  status: text('status', { enum: ['active', 'archived'] }).default('active').notNull(),
  imageUrl: text('image_url'),
  attributes: jsonb('attributes').$type<Record<string, string>>().default({}).notNull(),
  ...timestamps,
}, (t) => [
  uniqueIndex('products_sku_unique').on(t.sku),
  index('products_category_idx').on(t.category),
  check('products_price_nonnegative', sql`${t.price} >= 0`),
  check('products_stock_nonnegative', sql`${t.stock} >= 0`),
  check('products_status_valid', sql`${t.status} in ('active', 'archived')`),
]);

export const conversations = pgTable('conversations', {
  id: uuid('id').defaultRandom().primaryKey(),
  whatsappUserId: text('whatsapp_user_id').notNull(),
  phoneNumberId: text('phone_number_id').notNull(),
  mode: text('mode', { enum: ['bot', 'human'] }).default('bot').notNull(),
  handoffReason: text('handoff_reason'),
  lastInboundAt: timestamp('last_inbound_at', { withTimezone: true }),
  ...timestamps,
}, (t) => [
  uniqueIndex('conversations_participant_unique').on(t.phoneNumberId, t.whatsappUserId),
  check('conversations_mode_valid', sql`${t.mode} in ('bot', 'human')`),
]);

export const messages = pgTable('messages', {
  id: uuid('id').defaultRandom().primaryKey(),
  conversationId: uuid('conversation_id').references(() => conversations.id, { onDelete: 'cascade' }).notNull(),
  metaMessageId: text('meta_message_id'),
  role: text('role', { enum: ['user', 'assistant', 'tool'] }).notNull(),
  content: text('content').notNull(),
  toolCallId: text('tool_call_id'),
  toolCalls: jsonb('tool_calls').$type<unknown[]>(),
  deliveryStatus: text('delivery_status'),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
}, (t) => [
  uniqueIndex('messages_meta_id_unique').on(t.metaMessageId),
  index('messages_conversation_time_idx').on(t.conversationId, t.createdAt),
  check('messages_role_valid', sql`${t.role} in ('user', 'assistant', 'tool')`),
]);

export const faqs = pgTable('faqs', {
  id: uuid('id').defaultRandom().primaryKey(),
  question: text('question').notNull(),
  answer: text('answer').notNull(),
  category: text('category').notNull(),
  embedding: vector('embedding'),
  embeddingModel: text('embedding_model'),
  ...timestamps,
});
