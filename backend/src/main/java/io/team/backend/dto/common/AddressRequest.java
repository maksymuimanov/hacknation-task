package io.team.backend.dto.common;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import lombok.Data;

@Data
public class AddressRequest {
    @NotBlank
    private String country;
    @NotBlank
    private String street;
    @NotBlank
    private String city;
    @Positive
    @NotNull
    private Integer houseNumber;
    @Positive
    private Integer apartmentNumber;
    @NotBlank
    private String zipCode;
}