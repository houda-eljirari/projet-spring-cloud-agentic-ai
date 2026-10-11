package ma.enset.ebankservice.web;

import ma.enset.ebankservice.entities.BankAccount;
import ma.enset.ebankservice.feign.CustomerRestClient;
import ma.enset.ebankservice.model.Customer;
import ma.enset.ebankservice.repository.BankAccountRepository;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
public class BankAccountRestController {

    private final BankAccountRepository bankAccountRepository;
    private final CustomerRestClient customerRestClient;

    public BankAccountRestController(BankAccountRepository bankAccountRepository, CustomerRestClient customerRestClient) {
        this.bankAccountRepository = bankAccountRepository;
        this.customerRestClient = customerRestClient;
    }

    @GetMapping("/accounts")
    public List<BankAccount> accountList() {
        List<BankAccount> accountList = bankAccountRepository.findAll();
        accountList.forEach(acc -> {
            Customer customer = customerRestClient.getCustomerById(acc.getCustomerId());
            acc.setCustomer(customer);
        });
        return accountList;
    }

    @GetMapping("/accounts/{id}")
    public BankAccount accountById(@PathVariable String id) {
        BankAccount bankAccount = bankAccountRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Account not found"));
        Customer customer = customerRestClient.getCustomerById(bankAccount.getCustomerId());
        bankAccount.setCustomer(customer);
        return bankAccount;
    }
}