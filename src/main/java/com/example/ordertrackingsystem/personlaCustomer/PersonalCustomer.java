package com.example.ordertrackingsystem.personlaCustomer;

import com.example.ordertrackingsystem.model.Customer;
import jakarta.persistence.DiscriminatorValue;
import jakarta.persistence.Entity;

@Entity
@DiscriminatorValue("PERSONAL")
public class PersonalCustomer extends Customer {
    public PersonalCustomer() {
        this.setCreditRating("Poor"); // Default
    }
}
