package com.myfinance.controller;

import com.myfinance.model.Transaction;
import com.myfinance.service.TransactionService;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/api/transactions")
public class TransactionController {

  @Autowired
  private TransactionService transactionService;

  @GetMapping
  public ResponseEntity<List<Transaction>> getAllTransactions() {
    return ResponseEntity.ok(transactionService.getAllTransactions());
  }

  @PostMapping
  public ResponseEntity<?> createTransaction(
      @RequestBody Transaction transaction) {
    try {
      return ResponseEntity.ok(transactionService.createTransaction(transaction));
    } catch (Exception e) {
      return ResponseEntity
          .status(HttpStatus.BAD_REQUEST)
          .body(e.getMessage());
    }
  }
}
