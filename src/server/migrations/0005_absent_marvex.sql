ALTER TABLE "account" RENAME COLUMN "providerAccountId" TO "provider_account_id";--> statement-breakpoint
ALTER TABLE "authenticator" RENAME COLUMN "providerAccountId" TO "provider_accountId";--> statement-breakpoint
ALTER TABLE "authenticator" RENAME COLUMN "credentialPublicKey" TO "credential_publicKey";--> statement-breakpoint
ALTER TABLE "authenticator" RENAME COLUMN "credentialDeviceType" TO "credential_device_type";--> statement-breakpoint
ALTER TABLE "authenticator" RENAME COLUMN "credentialBackedUp" TO "credential_backed_up";--> statement-breakpoint
ALTER TABLE "brands" RENAME COLUMN "created" TO "created_at";--> statement-breakpoint
ALTER TABLE "brands" RENAME COLUMN "updated" TO "updated_at";--> statement-breakpoint
ALTER TABLE "products" RENAME COLUMN "created" TO "created_at";--> statement-breakpoint
ALTER TABLE "products" RENAME COLUMN "updated" TO "updated_at";--> statement-breakpoint
ALTER TABLE "session" RENAME COLUMN "sessionToken" TO "session_token";--> statement-breakpoint
ALTER TABLE "sizes" RENAME COLUMN "created" TO "created_at";--> statement-breakpoint
ALTER TABLE "sizes" RENAME COLUMN "updated" TO "updated_at";--> statement-breakpoint
ALTER TABLE "user" RENAME COLUMN "emailVerified" TO "email_verified";--> statement-breakpoint
ALTER TABLE "user" RENAME COLUMN "customerID" TO "customer_id";--> statement-breakpoint
ALTER TABLE "account" DROP CONSTRAINT "account_provider_providerAccountId_pk";--> statement-breakpoint
ALTER TABLE "account" ADD CONSTRAINT "account_provider_provider_account_id_pk" PRIMARY KEY("provider","provider_account_id");