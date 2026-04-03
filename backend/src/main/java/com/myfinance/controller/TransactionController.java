package com.myfinance.controller;

import com.myfinance.common.ApiResponse;
import com.myfinance.dto.DashboardResponse;
import com.myfinance.model.Transaction;
import com.myfinance.repository.projection.MonthlySummaryProjection;
import com.myfinance.repository.projection.TopItemProjection;
import com.myfinance.service.TransactionService;
import jakarta.validation.Valid;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Slf4j
@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/api/transactions")
public class TransactionController {

    @Autowired
    private TransactionService transactionService;


    @GetMapping
    public ResponseEntity<ApiResponse<List<Transaction>>> getTransactions(
            @RequestParam(required = false) Integer year,
            @RequestParam(required = false) Integer month) {

        log.info("Fetching transactions year={}, month={}", year, month);

        List<Transaction> data;

        if (year != null && month != null) {
            data = transactionService.getTransactionsByMonth(year, month);
        } else {
            data = transactionService.getAllTransactions();
        }

        return ResponseEntity.ok(ApiResponse.success(data));
    }

    @GetMapping("/top-items")
    public ResponseEntity<ApiResponse<List<TopItemProjection>>> getTopItems(
            @RequestParam int year,
            @RequestParam int month) {

        log.info("Fetching top items for year={}, month={}", year, month);

        return ResponseEntity.ok(ApiResponse.success(transactionService.getTopItems(year, month)));
    }

    @GetMapping("/summary")
    public ResponseEntity<ApiResponse<MonthlySummaryProjection>> getSummary(
            @RequestParam int year,
            @RequestParam int month) {

        return ResponseEntity.ok(
                ApiResponse.success(transactionService.getMonthlySummary(year, month))
        );
    }

    @GetMapping("/dashboard")
    public ResponseEntity<ApiResponse<DashboardResponse>> getDashboard(
            @RequestParam int year,
            @RequestParam int month) {

        log.info("Fetching dashboard for year={}, month={}", year, month);

        return ResponseEntity.ok(
                ApiResponse.success(transactionService.getDashboardData(year, month))
        );
    }

    @PostMapping
    public ResponseEntity<ApiResponse<Transaction>> createTransaction(
            @Valid @RequestBody Transaction transaction) {

        log.info("Creating transaction: {}", transaction);

        Transaction saved = transactionService.createTransaction(transaction);

        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(ApiResponse.created(saved));
    }
    
}
