package com.example.ordertrackingsystem.personlaCustomer;

import com.example.ordertrackingsystem.model.Customer;
import jakarta.persistence.DiscriminatorValue;
import jakarta.persistence.Entity;

@Entity
@DiscriminatorValue("CORPORATE")
public class CorporateCustomer extends Customer {

}
