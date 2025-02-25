CREATE TABLE "advocate_specialties" (
	"advocate_id" integer NOT NULL,
	"specialty_id" integer NOT NULL,
	CONSTRAINT "advocate_specialties_advocate_id_specialty_id_pk" PRIMARY KEY("advocate_id","specialty_id")
);
--> statement-breakpoint
CREATE TABLE "specialties" (
	"id" bigserial PRIMARY KEY NOT NULL,
	"name" varchar(256) NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "specialties_name_unique" UNIQUE("name")
);
--> statement-breakpoint
ALTER TABLE "advocates" ADD COLUMN "state" text NOT NULL;--> statement-breakpoint
ALTER TABLE "advocate_specialties" ADD CONSTRAINT "advocate_specialties_advocate_id_advocates_id_fk" FOREIGN KEY ("advocate_id") REFERENCES "public"."advocates"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "advocate_specialties" ADD CONSTRAINT "advocate_specialties_specialty_id_specialties_id_fk" FOREIGN KEY ("specialty_id") REFERENCES "public"."specialties"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "advocates" DROP COLUMN "payload";