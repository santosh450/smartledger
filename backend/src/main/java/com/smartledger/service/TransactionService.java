package com.smartledger.service;

import com.smartledger.dto.DashboardResponse;
import com.smartledger.model.Transaction;
import com.smartledger.repository.TransactionRepository;
import com.smartledger.repository.projection.MonthlySummaryProjection;
import com.smartledger.repository.projection.TopItemProjection;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.Objects;

@Slf4j
@Service
@RequiredArgsConstructor
public class TransactionService {

    private final TransactionRepository transactionRepository;

    public List<Transaction> getAllTransactions() {
        log.info("Fetching all transactions");
        return transactionRepository.findAllByOrderByDateDescIdDesc();
    }

    public Transaction createTransaction(Transaction transaction) {
        log.info("Creating transaction: {}", transaction);
        if (!(Objects.equals(transaction.getType(), "Expense") || Objects.equals(transaction.getType(), "Income"))) {
            throw new IllegalArgumentException("Transaction type either Expense or Income");
        }
        return transactionRepository.save(transaction);
    }

    public List<Transaction> getTransactionsByMonth(int year, int month) {
        LocalDate[] range = getMonthRange(year, month);

        return transactionRepository.findByMonth(range[0], range[1]);
    }

    public List<TopItemProjection> getTopItems(int year, int month) {
        LocalDate[] range = getMonthRange(year, month);

        return transactionRepository.findTopItems(range[0], range[1]);
    }

    public MonthlySummaryProjection getMonthlySummary(int year, int month) {
        LocalDate[] range = getMonthRange(year, month);

        return transactionRepository.getMonthlySummary(range[0], range[1])
                .orElseThrow(() -> new RuntimeException("No summary found"));
    }

    // Both data
    public DashboardResponse getDashboardData(int year, int month) {

        LocalDate[] range = getMonthRange(year, month);

        // Query 1
        MonthlySummaryProjection summary = transactionRepository.getMonthlySummary(range[0], range[1])
                .orElseThrow(() -> new RuntimeException("Summary not found"));

        // Query 2
        List<TopItemProjection> topItems = transactionRepository.findTopItems(range[0], range[1]);

        return new DashboardResponse(summary, topItems);
    }

    // 🔁 Reusable method
    private LocalDate[] getMonthRange(int year, int month) {
        LocalDate start = LocalDate.of(year, month, 1);
        LocalDate end = start.plusMonths(1);
        return new LocalDate[] { start, end };
    }

    public Transaction getTransactionById(Long id) {

        return transactionRepository.findById(id)
                .orElseThrow(() -> new RuntimeException(
                        "Transaction not found with id: " + id));
    }

    public Transaction updateTransaction(Long id,
            Transaction transaction) {

        Transaction existing = transactionRepository.findById(id)
                .orElseThrow(() -> new RuntimeException(
                        "Transaction not found with id: " + id));

        existing.setDate(transaction.getDate());
        existing.setType(transaction.getType());
        existing.setAmount(transaction.getAmount());
        existing.setItem(transaction.getItem());
        existing.setMode(transaction.getMode());
        existing.setNotes(transaction.getNotes());

        return transactionRepository.save(existing);
    }

    public Transaction patchTransaction(Long id,
            Transaction transaction) {

        Transaction existing = transactionRepository.findById(id)
                .orElseThrow(() -> new RuntimeException(
                        "Transaction not found with id: " + id));

        if (transaction.getDate() != null) {
            existing.setDate(transaction.getDate());
        }

        if (transaction.getType() != null) {
            existing.setType(transaction.getType());
        }

        if (transaction.getAmount() != null) {
            existing.setAmount(transaction.getAmount());
        }

        if (transaction.getItem() != null) {
            existing.setItem(transaction.getItem());
        }

        if (transaction.getMode() != null) {
            existing.setMode(transaction.getMode());
        }

        if (transaction.getNotes() != null) {
            existing.setNotes(transaction.getNotes());
        }

        return transactionRepository.save(existing);
    }

    public void deleteTransaction(Long id) {

        if (!transactionRepository.existsById(id)) {
            throw new RuntimeException(
                    "Transaction not found with id: " + id);
        }

        transactionRepository.deleteById(id);
    }
}
