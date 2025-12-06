package io.team.backend.dto.person;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Past;
import lombok.Data;

import java.time.LocalDate;

@Data
public class BirthRequest {
    @Past
    private LocalDate date;
    @NotBlank
    private String city;
}
