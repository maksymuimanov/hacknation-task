package io.team.backend.dto.document;

import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class TeamDocumentRequest {
    @NotNull
    private Boolean used;
    private Boolean independencePossibility;
    private Boolean twoPeopleMinimum;
}