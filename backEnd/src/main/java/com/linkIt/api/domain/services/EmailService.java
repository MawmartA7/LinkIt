package com.linkIt.api.domain.services;

import org.springframework.mail.MailException;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;
import org.thymeleaf.TemplateEngine;
import org.thymeleaf.context.Context;

import com.linkIt.api.application.controller.ApiController;
import com.linkIt.api.domain.dtos.auth.EmailConfirmationDTO;
import com.linkIt.api.domain.exceptions.auth.SendConfirmationMailException;

import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class EmailService {
    private final JavaMailSender mailSender;

    private final TemplateEngine templateEngine;

    public String sendEmailConfirmation(EmailConfirmationDTO emailConfirmationDTO) {
        try {

            MimeMessage mimeMessage = mailSender.createMimeMessage();

            MimeMessageHelper helper = new MimeMessageHelper(mimeMessage, "utf-8");
            helper.setTo(emailConfirmationDTO.email());
            helper.setSubject("Verify email address for LinkIt");
            helper.setFrom("link.it@zohomail.com");

            Context context = new Context();
            context.setVariable("confirmationCode", emailConfirmationDTO.id());

            String htmlContent = templateEngine.process("confirmEmailMessage", context);

            helper.setText(htmlContent, true);

            mailSender.send(mimeMessage);
            return "sended";

        } catch (MailException | MessagingException ex) {
            ex.printStackTrace();
            throw new SendConfirmationMailException("An error occurred while sending the confirmation mail");
        }

    }

    public String sendEmailPasswordRecovey(EmailConfirmationDTO emailConfirmationDTO) {
        try {

            MimeMessage mimeMessage = mailSender.createMimeMessage();

            MimeMessageHelper helper = new MimeMessageHelper(mimeMessage, "utf-8");
            helper.setTo(emailConfirmationDTO.email());
            helper.setSubject("Recovery password for LinkIt");
            helper.setFrom("link.it@zohomail.com");

            Context context = new Context();
            context.setVariable("recoveryCode", emailConfirmationDTO.id());

            String htmlContent = templateEngine.process("PasswordRecoveyEmailMessage", context);

            helper.setText(htmlContent, true);

            mailSender.send(mimeMessage);
            return "sended";

        } catch (MailException | MessagingException ex) {
            ex.printStackTrace();
            throw new SendConfirmationMailException("An error occurred while sending the password recovery mail");
        }
    }
}
