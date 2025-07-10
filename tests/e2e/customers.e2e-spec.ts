import { INestApplication } from "@nestjs/common";
import { Test } from "@nestjs/testing";
import request from "supertest";
import { AppModule } from "@/app.module";

describe("Customers E2E", () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleRef.createNestApplication();

    await app.init();
  });

  afterAll(async () => {
    await app.close();
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
