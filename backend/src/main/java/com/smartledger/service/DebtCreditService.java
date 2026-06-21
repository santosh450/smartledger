package com.smartledger.service;

import com.smartledger.model.DebtCredit;
import com.smartledger.repository.DebtCreditRepository;

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

    public DebtCredit getTransactionById(Long id) {

        return debtCreditRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Transaction not found with id: " + id));
    }

    public DebtCredit updateTransaction(Long id, DebtCredit transaction) {

        DebtCredit existing = debtCreditRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Transaction not found with id: " + id));

        existing.setDate(transaction.getDate());
        existing.setPerson(transaction.getPerson());
        existing.setType(transaction.getType());
        existing.setAmount(transaction.getAmount());
        existing.setMode(transaction.getMode());
        existing.setNotes(transaction.getNotes());

        return debtCreditRepository.save(existing);
    }

    public void deleteTransaction(Long id) {

        if (!debtCreditRepository.existsById(id)) {
            throw new RuntimeException(
                    "Transaction not found with id: " + id);
        }

        debtCreditRepository.deleteById(id);
    }

    public DebtCredit patchTransaction(Long id, DebtCredit transaction) {

        DebtCredit existing = debtCreditRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Transaction not found with id: " + id));

        if (transaction.getDate() != null) {
            existing.setDate(transaction.getDate());
        }

        if (transaction.getPerson() != null) {
            existing.setPerson(transaction.getPerson());
        }

        if (transaction.getType() != null) {
            existing.setType(transaction.getType());
        }

        if (transaction.getAmount() != null) {
            existing.setAmount(transaction.getAmount());
        }

        if (transaction.getMode() != null) {
            existing.setMode(transaction.getMode());
        }

        if (transaction.getNotes() != null) {
            existing.setNotes(transaction.getNotes());
        }

        return debtCreditRepository.save(existing);
    }
}
