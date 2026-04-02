package com.myfinance.service;

import com.myfinance.model.Transaction;
import com.myfinance.repository.TransactionRepository;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class TransactionService {

  @Autowired
  private TransactionRepository transactionRepository;

  public List<Transaction> getAllTransactions() {
    return transactionRepository.findAllByOrderByDateDescIdDesc();
  }

  public Transaction createTransaction(Transaction transaction) {
    if (transaction.getId() == null) {
      transaction.setId(transactionRepository.getNextId());
    }
    return transactionRepository.save(transaction);
  }
}
