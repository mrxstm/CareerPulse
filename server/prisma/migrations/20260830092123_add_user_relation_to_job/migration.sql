-- AddForeignKey
ALTER TABLE "JobDescription" ADD CONSTRAINT "JobDescription_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
