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
@Table(name = "transactions")
public class Transaction {

    @Id
    @Column(name = "id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "date")
    private LocalDate date;

    @Column(name = "type", nullable = false)
    @NotBlank
    private String type;

    @Column(name = "amount", nullable = false)
    @NotNull
    private BigDecimal amount;

    @Column(name = "item")
    private String item;

    @Column(name = "mode")
    private String mode;

    @Column(name = "notes")
    private String notes;
    
}
