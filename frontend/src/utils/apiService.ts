import apiClient from "./apiClient";

export interface ApiResponse<T> {
  status: number;
  message: string;
  data: T;
}

export interface LoginRequest {
  username: string;
  password: string;
}

export interface RegisterRequest {
  firstName: string;
  lastName: string;
  username: string;
  password: string;
  email: string;
  phone: string;
}

export interface ForgotPasswordRequest {
  emailOrPhone: string;
}

export interface TransactionDto {
  id: number;
  date: string;
  type: string;
  amount: number;
  item: string;
  mode: string;
  notes: string;
}

export interface CreateTransactionRequest {
  date: string;
  type: string;
  amount: number;
  item: string;
  mode: string;
  notes: string;
}

export interface DebtCreditDto {
  id: number;
  date: string;
  person: string;
  type: string;
  amount: number;
  mode: string;
  notes: string;
}

export interface CreateDebtCreditRequest {
  date: string;
  person: string;
  type: string;
  amount: number;
  mode: string;
  notes: string;
}

export const userApi = {
  login(payload: LoginRequest) {
    return apiClient.post<LoginRequest, string>("/users/login", payload);
  },
  register(payload: RegisterRequest) {
    return apiClient.post<RegisterRequest, string>("/users/register", payload);
  },
  forgotPassword(payload: ForgotPasswordRequest) {
    return apiClient.post<ForgotPasswordRequest, string>(
      "/users/forgot-password",
      payload,
    );
  },
};

export const transactionApi = {
  getAllTransactions() {
    return apiClient.get<ApiResponse<TransactionDto[]>>("/transactions");
  },
  createTransaction(payload: CreateTransactionRequest) {
    return apiClient.post<CreateTransactionRequest, ApiResponse<TransactionDto>>(
      "/transactions",
      payload,
    );
  },
};

export const debtCreditApi = {
  getAllDebtCreditRecords() {
    return apiClient.get<ApiResponse<DebtCreditDto[]>>("/debt-credit");
  },
  createDebtCreditRecord(payload: CreateDebtCreditRequest) {
    console.log("Creating Debt/Credit Record with payload:", payload);
    return apiClient.post<CreateDebtCreditRequest, ApiResponse<DebtCreditDto>>(
      "/debt-credit",
      payload,
    );
  },
};

export default userApi;
