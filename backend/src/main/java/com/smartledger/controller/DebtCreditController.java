package com.smartledger.controller;

import com.smartledger.common.ApiResponse;
import com.smartledger.model.DebtCredit;
import com.smartledger.service.DebtCreditService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Slf4j
@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/debt-credit")
public class DebtCreditController {

    private final DebtCreditService debtCreditService;

    @GetMapping
    public ResponseEntity<ApiResponse<List<DebtCredit>>> getTransactions() {

        log.info("Fetching all debt-credit transactions");

        List<DebtCredit> data = debtCreditService.getTransactions();

        return ResponseEntity.ok(ApiResponse.success(data));
    }

    @PostMapping
    public ResponseEntity<ApiResponse<DebtCredit>> addTransaction(
            @Valid @RequestBody DebtCredit transaction) {

        log.info("Adding transaction: {}", transaction);

        DebtCredit result = debtCreditService.addTransaction(transaction);

        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(ApiResponse.created(result));
    }
}
