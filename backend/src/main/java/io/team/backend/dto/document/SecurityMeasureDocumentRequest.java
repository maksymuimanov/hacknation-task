package io.team.backend.dto.document;

import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class SecurityMeasureDocumentRequest {
    @NotNull
    private Boolean used;
    private String type;
    private Boolean registeredInFixedAssets;
    private Boolean usedAccordingInstructions;
}
