-- DropForeignKey
ALTER TABLE "projects" DROP CONSTRAINT "projects_organization_id_fkey";

-- DropForeignKey
ALTER TABLE "projects" DROP CONSTRAINT "projects_owner_id_fkey";

-- AddForeignKey
ALTER TABLE "projects" ADD CONSTRAINT "projects_organization_id_fkey" FOREIGN KEY ("organization_id") REFERENCES "organizations"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "projects" ADD CONSTRAINT "projects_owner_id_fkey" FOREIGN KEY ("owner_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
