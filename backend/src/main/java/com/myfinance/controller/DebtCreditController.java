package com.myfinance.controller;

import com.myfinance.model.DebtCredit;
import com.myfinance.service.DebtCreditService;
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
@RequestMapping("/api/debt-credit")
public class DebtCreditController {

  @Autowired
  private DebtCreditService debtCreditService;

  @GetMapping
  public List<DebtCredit> getTransactions() {
    return debtCreditService.getTransactions();
  }

  @PostMapping
  public String addTransaction(@RequestBody DebtCredit transaction) {
    return debtCreditService.addTransaction(transaction);
  }
}
