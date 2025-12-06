package io.team.backend.dto.person;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class IdentityRequest {
    @NotBlank
    private String type;
    @NotBlank
    private String series;
    @NotBlank
    private String number;
}