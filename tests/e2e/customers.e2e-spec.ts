// I give Jest more time for setup + in-memory server startup
jest.setTimeout(30000);

import { INestApplication } from "@nestjs/common";
import { Test } from "@nestjs/testing";
import request from "supertest";
import { AppModule } from "@/app.module";
import { setupDatabase, teardownDatabase } from "./setup/e2e.setup";

describe("Customers E2E", () => {
  let app: INestApplication;

  beforeAll(async () => {
    // 1) I start in-memory MongoDB and set env var
    await setupDatabase();

    // 2) Now compile Nest with correct MONGO_URI
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleRef.createNestApplication();

    // 3) Run Nest application and MongoDB
    await app.init();
  });

  afterAll(async () => {
    // 4)
    // I Close Nest app only if initialized
    if (app) {
      await app.close();
    }
    // and stop in-memory MongoDB
    await teardownDatabase();
  });

  it("/POST /customer should create a new customer", async () => {
    const payload = {
      firstName: "Test",
      lastName: "User",
      dateOfBirth: "1990-01-01",
      phoneNumber: "+447911123456",
      email: "test.user@example.com",
      bankAccountNumber: "GB33BUKB20201555555555",
    }; // as Customer

    // ------------------Send POST --------------------
    const response = await request(app.getHttpServer())
      .post("/customers")
      .send(payload)
      .expect(201);

    // Assert that the response body is the created customer
    expect(response.body).toMatchObject({
      email: payload.email,
    });

    // ------------------Send GET --------------------
    const getRes = await request(app.getHttpServer())
      .get("/customers")
      .expect(200);

    expect(Array.isArray(getRes.body)).toBe(true);
    expect(getRes.body.length).toBe(1);
  });

  it("/GET /customers should return array of all customers", async () => {
    // Act
    const response = await request(app.getHttpServer())
      .get("/customers")
      .expect(200);

    // Assert that the response body is an array
    expect(Array.isArray(response.body)).toBe(true);
  });
});
