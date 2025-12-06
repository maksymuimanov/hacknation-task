package io.team.backend.dto.accident;

import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class EquipmentRequest {
    @NotNull
    private Boolean used;
    private String name;
    private String condition;
    private Boolean usedAccordingInstructions;
    private String useDescription;
    private Boolean hasCertificate;
    private Boolean registeredInFixedAssets;
}
