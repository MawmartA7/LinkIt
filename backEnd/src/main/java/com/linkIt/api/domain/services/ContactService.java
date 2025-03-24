package com.linkIt.api.domain.services;

import org.springframework.stereotype.Service;

import com.linkIt.api.domain.dtos.contact.MailDTO;
import com.linkIt.api.domain.exceptions.recaptcha.NotHumanException;
import com.linkIt.api.domain.models.enums.ContactSubject;
import com.linkIt.api.domain.models.enums.RecaptchaAction;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class ContactService {

    private final RecaptchaService recaptchaService;

    private final EmailService emailService;

    public void sendEmail(MailDTO mailDTO, String email) {

        ContactSubject subject = ContactSubject.fromValue(mailDTO.subject());

        if (!recaptchaService.verifyRecaptcha(mailDTO.recaptchaToken(), RecaptchaAction.contact)) {
            throw new NotHumanException();
        }

        emailService.sendContactEmail(
                new MailDTO(mailDTO.name(), subject.getMessage(), mailDTO.message(), null), email);

    }

}
