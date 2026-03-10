package com.example.Price_Comparison.controllers;

import com.example.Price_Comparison.models.ContactForm;
import com.example.Price_Comparison.Repositories.ContactFormRepository;
import com.example.Price_Comparison.dto.ContactFormDTO;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;

@RestController
@RequestMapping("/api/contact")
public class ContactFormController {

    private final ContactFormRepository contactFormRepository;

    public ContactFormController(ContactFormRepository contactFormRepository) {
        this.contactFormRepository = contactFormRepository;
    }

    @PostMapping
    public ContactForm submitForm(@RequestBody ContactFormDTO dto) {

        ContactForm contactForm = new ContactForm();

        contactForm.setName(dto.getName());
        contactForm.setEmail(dto.getEmail());
        contactForm.setPhone(dto.getPhone());
        contactForm.setMessage(dto.getMessage());
        contactForm.setSubmittedAt(LocalDateTime.now());

        return contactFormRepository.save(contactForm);
    }
}
