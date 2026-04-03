package com.myfinance.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.*;

import java.math.BigDecimal;
import java.time.LocalDate;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Entity
@Table(name = "debt_credit")
public class DebtCredit {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private LocalDate date;

    @NotBlank
    private String person;

    @NotBlank
    private String type;

    @NotNull
    private BigDecimal amount;

    private String mode;

    @Column(columnDefinition = "TEXT")
    private String notes;
}
