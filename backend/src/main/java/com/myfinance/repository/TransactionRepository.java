package com.myfinance.repository;

import com.myfinance.model.Transaction;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface TransactionRepository extends JpaRepository<Transaction, Long> {
  List<Transaction> findAllByOrderByDateDescIdDesc();

  @Query("select coalesce(max(t.id), 0) + 1 from Transaction t")
  Long getNextId();
}
