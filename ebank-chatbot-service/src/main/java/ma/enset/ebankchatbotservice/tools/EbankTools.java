package ma.enset.ebankchatbotservice.tools;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.client.RestTemplate;

import java.util.function.Function;

@Configuration
public class EbankTools {

    private final RestTemplate restTemplate = new RestTemplate();

    public record AccountRequest(String accountId) {}
    public record CustomerRequest(Long customerId) {}

    @Bean
    public Function<AccountRequest, String> getAccountDetails() {
        return request -> {
            String url = "http://localhost:8080/ebank-service/api/accounts/" + request.accountId();
            try {
                return restTemplate.getForObject(url, String.class);
            } catch (Exception e) {
                return "Compte non trouvé pour l'ID : " + request.accountId();
            }
        };
    }

    @Bean
    public Function<CustomerRequest, String> getCustomerDetails() {
        return request -> {
            String url = "http://localhost:8080/customer-service/api/customers/" + request.customerId();
            try {
                return restTemplate.getForObject(url, String.class);
            } catch (Exception e) {
                return "Client non trouvé pour l'ID : " + request.customerId();
            }
        };
    }
}