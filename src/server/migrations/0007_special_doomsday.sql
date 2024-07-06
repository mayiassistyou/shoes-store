ALTER TABLE "authenticator" RENAME COLUMN "credentialID" TO "credential_id";--> statement-breakpoint
ALTER TABLE "authenticator" RENAME COLUMN "userId" TO "user_id";--> statement-breakpoint
ALTER TABLE "authenticator" RENAME COLUMN "credential_publicKey" TO "credential_public_key";--> statement-breakpoint
ALTER TABLE "authenticator" DROP CONSTRAINT "authenticator_credentialID_unique";--> statement-breakpoint
ALTER TABLE "authenticator" DROP CONSTRAINT "authenticator_userId_user_id_fk";
--> statement-breakpoint
ALTER TABLE "authenticator" DROP CONSTRAINT "authenticator_userId_credentialID_pk";--> statement-breakpoint
ALTER TABLE "authenticator" ADD CONSTRAINT "authenticator_user_id_credential_id_pk" PRIMARY KEY("user_id","credential_id");--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "authenticator" ADD CONSTRAINT "authenticator_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
ALTER TABLE "authenticator" ADD CONSTRAINT "authenticator_credential_id_unique" UNIQUE("credential_id");