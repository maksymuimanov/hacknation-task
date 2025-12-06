package io.team.backend.dto.person;

import io.team.backend.dto.common.AddressRequest;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Past;
import lombok.Data;

import java.time.LocalDate;

@Data
public class BirthRequest {
    @Past
    private LocalDate date;
    @NotNull
    private AddressRequest addressRequest;
}
