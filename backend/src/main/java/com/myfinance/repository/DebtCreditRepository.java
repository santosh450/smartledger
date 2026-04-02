package com.myfinance.repository;

import com.myfinance.model.DebtCredit;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface DebtCreditRepository extends JpaRepository<DebtCredit, Long> {
}
