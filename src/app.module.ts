// src/app.module.ts
import { Module } from "@nestjs/common";
import { CustomerModule } from "./modules/customer/customer.module";
import { MongooseModule } from "@nestjs/mongoose";

@Module({
  imports: [
    // Connect to MongoDB database
    MongooseModule.forRoot(
      process.env.MONGO_URI || "mongodb://localhost:27017/crud-nestjs"
    ),
    CustomerModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
