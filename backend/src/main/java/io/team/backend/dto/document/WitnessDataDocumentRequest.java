package io.team.backend.dto.document;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

import java.time.LocalDate;

@Data
public class WitnessDataDocumentRequest {
    @NotBlank
    private String name;
    @NotBlank
    private String injuredPersonName;
    @NotNull
    private LocalDate date;
    @NotBlank
    private String description;
}
