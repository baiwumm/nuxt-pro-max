ALTER TABLE "menu" DROP CONSTRAINT "menu_to_unique";--> statement-breakpoint
ALTER TABLE "menu" ADD CONSTRAINT "menu_parent_to_unique" UNIQUE("parent_id","to");