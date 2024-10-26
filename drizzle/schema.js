import { pgTable, serial, text, timestamp, uuid } from 'drizzle-orm/pg-core';

export const users = pgTable('users', {
  id: serial('id').primaryKey(),
  userId: uuid('user_id').notNull(),
  plan: text('plan').default('free').notNull(),
  signupDate: timestamp('signup_date').defaultNow(),
});

export const hashtags = pgTable('hashtags', {
  id: serial('id').primaryKey(),
  userId: uuid('user_id').notNull(),
  keyword: text('keyword').notNull(),
  hashtags: text('hashtags').notNull(),
  createdAt: timestamp('created_at').defaultNow(),
});