package ma.enset.ebankchatbotservice.bot;

import org.springframework.ai.chat.client.ChatClient;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import org.telegram.telegrambots.bots.TelegramLongPollingBot;
import org.telegram.telegrambots.meta.api.methods.send.SendMessage;
import org.telegram.telegrambots.meta.api.objects.Update;
import org.telegram.telegrambots.meta.exceptions.TelegramApiException;

@Component
public class TelegramAgentBot extends TelegramLongPollingBot {

    private final ChatClient chatClient;
    private final String botUsername;

    public TelegramAgentBot(
            ChatClient.Builder builder,
            @Value("${telegram.bot.token}") String botToken,
            @Value("${telegram.bot.username}") String botUsername) {
        super(botToken);
        this.botUsername = botUsername;

        // Enregistrement global des fonctions déclarées dans EbankTools
        this.chatClient = builder
                .defaultSystem("Vous êtes un assistant bancaire intelligent. Répondez de manière concise et précise.")
                .defaultFunctions("getAccountDetails", "getCustomerDetails") // Ou defaultTools selon votre version
                .build();
    }

    @Override
    public String getBotUsername() {
        return this.botUsername;
    }

    @Override
    public void onUpdateReceived(Update update) {
        if (update.hasMessage() && update.getMessage().hasText()) {
            String userMessage = update.getMessage().getText();
            Long chatId = update.getMessage().getChatId();

            // Appel simplifié sans spécifier les fonctions à chaque prompt
            String aiResponse = chatClient.prompt()
                    .user(userMessage)
                    .call()
                    .content();

            SendMessage message = new SendMessage();
            message.setChatId(chatId.toString());
            message.setText(aiResponse);

            try {
                execute(message);
            } catch (TelegramApiException e) {
                e.printStackTrace();
            }
        }
    }
}