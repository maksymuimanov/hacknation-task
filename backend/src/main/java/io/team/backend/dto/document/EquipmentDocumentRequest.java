package io.team.backend.dto.document;

import jakarta.validation.constraints.NotNull;
import lombok.Data;

import java.time.LocalDate;

@Data
public class EquipmentDocumentRequest {
    @NotNull
    private Boolean used;
    private String name;
    private String type;
    private LocalDate productionDate;
    private Boolean registeredInFixedAssets;
    private Boolean usedAccordingInstructions;
}
