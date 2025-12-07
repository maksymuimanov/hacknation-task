package io.team.backend.entity.common;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;

@Getter @Setter
@RequiredArgsConstructor
@Entity
@Table(name = "addresses")
@Inheritance(strategy = InheritanceType.JOINED)
public class Address {
    @Id
    @GeneratedValue
    private Long id;
    private String country;
    private String street;
    private String city;
    private Integer houseNumber;
    private Integer apartmentNumber;
    private String zipCode;

    @Override
    public String toString() {
        return String.join(", ", country, city, street, zipCode, houseNumber.toString() + "/" + apartmentNumber.toString());
    }
}
