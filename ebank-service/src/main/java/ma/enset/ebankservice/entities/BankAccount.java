package ma.enset.ebankservice.entities;

import jakarta.persistence.*;
import lombok.*;
import ma.enset.ebankservice.enums.AccountType;
import ma.enset.ebankservice.model.Customer;

import java.time.LocalDate;

@Entity
@Data @NoArgsConstructor @AllArgsConstructor @Builder
public class BankAccount {
    @Id
    private String id;
    private Double balance;
    private LocalDate createdAt;

    @Enumerated(EnumType.STRING)
    private AccountType type;

    private Long customerId;

    @Transient
    private Customer customer;
}