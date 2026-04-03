package com.myfinance.service;

import com.myfinance.model.DebtCredit;
import com.myfinance.repository.DebtCreditRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.List;

@Slf4j
@Service
@RequiredArgsConstructor
public class DebtCreditService {

    private final DebtCreditRepository debtCreditRepository;

    public List<DebtCredit> getTransactions() {
        return debtCreditRepository.findAll(Sort.by(Sort.Direction.DESC, "date"));

    }

    public DebtCredit addTransaction(DebtCredit transaction) {
        log.info("Adding transaction: {}", transaction);

        if (transaction.getPerson() == null || transaction.getPerson().isBlank()) {
            throw new IllegalArgumentException("Person name is required");
        }

        return debtCreditRepository.save(transaction);
    }
}
