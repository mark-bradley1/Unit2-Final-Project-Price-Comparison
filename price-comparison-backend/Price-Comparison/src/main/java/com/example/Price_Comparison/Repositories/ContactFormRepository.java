package com.example.Price_Comparison.Repositories;

import com.example.Price_Comparison.models.ContactForm;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ContactFormRepository extends JpaRepository<ContactForm, Long>{
}
