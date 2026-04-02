package com.myfinance.service;

import com.myfinance.model.DebtCredit;
import com.myfinance.repository.DebtCreditRepository;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

@Service
public class DebtCreditService {

  @Autowired
  private DebtCreditRepository debtCreditRepository;

  public List<DebtCredit> getTransactions() {
    // return debtCreditRepository.findAll(Sort.by(Sort.Direction.DESC, "date"));
    return debtCreditRepository.findAll();
  }

  public String addTransaction(DebtCredit transaction) {
    debtCreditRepository.save(transaction);
    return "Transaction added successfully";
  }
}
