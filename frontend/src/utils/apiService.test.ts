import { describe, expect, it, vi } from "vitest";
import apiClient from "./apiClient";
import {
  debtCreditApi,
  transactionApi,
  userApi,
  type CreateDebtCreditRequest,
  type CreateTransactionRequest,
  type LoginRequest,
  type RegisterRequest,
} from "./apiService";

vi.mock("./apiClient", () => ({
  default: {
    get: vi.fn(),
    post: vi.fn(),
  },
}));

const mockedApiClient = vi.mocked(apiClient);

describe("apiService", () => {
  it("calls user login with correct endpoint and payload", async () => {
    const payload: LoginRequest = { username: "demo", password: "secret" };
    mockedApiClient.post.mockResolvedValue("ok");

    await userApi.login(payload);

    expect(mockedApiClient.post).toHaveBeenCalledWith("/users/login", payload);
  });

  it("calls user register with correct endpoint and payload", async () => {
    const payload: RegisterRequest = {
      firstName: "A",
      lastName: "B",
      username: "ab",
      password: "Secret123",
      email: "a@b.com",
      phone: "9876543210",
    };
    mockedApiClient.post.mockResolvedValue("ok");

    await userApi.register(payload);

    expect(mockedApiClient.post).toHaveBeenCalledWith(
      "/users/register",
      payload,
    );
  });

  it("calls transactions APIs with correct endpoints", async () => {
    const payload: CreateTransactionRequest = {
      date: "2026-01-01",
      type: "expense",
      amount: 100,
      item: "Food",
      mode: "cash",
      notes: "",
    };
    mockedApiClient.get.mockResolvedValue({ status: 200, message: "ok", data: [] });
    mockedApiClient.post.mockResolvedValue({
      status: 200,
      message: "created",
      data: { id: 1, ...payload },
    });

    await transactionApi.getAllTransactions();
    await transactionApi.createTransaction(payload);

    expect(mockedApiClient.get).toHaveBeenCalledWith("/transactions");
    expect(mockedApiClient.post).toHaveBeenCalledWith("/transactions", payload);
  });

  it("calls debt-credit APIs with correct endpoints", async () => {
    const payload: CreateDebtCreditRequest = {
      date: "2026-01-01",
      person: "John",
      type: "debt",
      amount: 300,
      mode: "upi",
      notes: "",
    };
    mockedApiClient.get.mockResolvedValue({ status: 200, message: "ok", data: [] });
    mockedApiClient.post.mockResolvedValue({
      status: 200,
      message: "created",
      data: { id: 1, ...payload },
    });

    await debtCreditApi.getAllDebtCreditRecords();
    await debtCreditApi.createDebtCreditRecord(payload);

    expect(mockedApiClient.get).toHaveBeenCalledWith("/debt-credit");
    expect(mockedApiClient.post).toHaveBeenCalledWith("/debt-credit", payload);
  });
});
