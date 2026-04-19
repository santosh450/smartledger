package com.smartledger.repository;

import com.smartledger.model.DebtCredit;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface DebtCreditRepository extends JpaRepository<DebtCredit, Long> {
}