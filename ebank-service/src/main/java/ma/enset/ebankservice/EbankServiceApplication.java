package ma.enset.ebankservice;

import ma.enset.ebankservice.entities.BankAccount;
import ma.enset.ebankservice.enums.AccountType;
import ma.enset.ebankservice.repository.BankAccountRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.openfeign.EnableFeignClients;
import org.springframework.context.annotation.Bean;

import java.time.LocalDate;
import java.util.UUID;

@SpringBootApplication
@EnableFeignClients
public class EbankServiceApplication {

    public static void main(String[] args) {
        SpringApplication.run(EbankServiceApplication.class, args);
    }

    @Bean
    CommandLineRunner start(BankAccountRepository bankAccountRepository) {
        return args -> {
            bankAccountRepository.save(BankAccount.builder()
                    .id(UUID.randomUUID().toString())
                    .balance(15000.0)
                    .createdAt(LocalDate.now())
                    .type(AccountType.CURRENT_ACCOUNT)
                    .customerId(1L)
                    .build());

            bankAccountRepository.save(BankAccount.builder()
                    .id(UUID.randomUUID().toString())
                    .balance(98000.0)
                    .createdAt(LocalDate.now())
                    .type(AccountType.SAVING_ACCOUNT)
                    .customerId(2L)
                    .build());
        };
    }
}