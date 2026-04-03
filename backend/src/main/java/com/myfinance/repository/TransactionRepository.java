package com.myfinance.repository;

import com.myfinance.model.Transaction;
import com.myfinance.repository.projection.MonthlySummaryProjection;
import com.myfinance.repository.projection.TopItemProjection;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;


@Repository
public interface TransactionRepository extends JpaRepository<Transaction, Long> {
    List<Transaction> findAllByOrderByDateDescIdDesc();


    @Query("SELECT t FROM Transaction t WHERE t.date >= :start AND t.date < :end ORDER BY t.date DESC")
    List<Transaction> findByMonth(
            @Param("start") LocalDate start,
            @Param("end") LocalDate end
    );

    @Query(value = """
                SELECT item, SUM(amount) AS totalAmount
                FROM transactions
                WHERE date >= :start AND date < :end
                GROUP BY item
                ORDER BY totalAmount DESC
                LIMIT 5
            """, nativeQuery = true)
    List<TopItemProjection> findTopItems(
            @Param("start") LocalDate start,
            @Param("end") LocalDate end
    );

    @Query(value = """
                SELECT 
                    COALESCE(SUM(CASE WHEN type = 'Expense' THEN amount END), 0) AS totalExpense,
                    COALESCE(SUM(CASE WHEN type = 'Income' THEN amount END), 0) AS totalIncome
                FROM transactions
                WHERE date >= :start AND date < :end
            """, nativeQuery = true)
    Optional<MonthlySummaryProjection> getMonthlySummary(
            @Param("start") LocalDate start,
            @Param("end") LocalDate end
    );
}
