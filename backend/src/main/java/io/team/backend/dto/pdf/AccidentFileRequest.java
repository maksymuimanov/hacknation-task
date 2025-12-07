package io.team.backend.dto.pdf;

import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.UUID;

@Data
@AllArgsConstructor @NoArgsConstructor
public class AccidentFileRequest {
    @NotNull
    private UUID userId;
    @NotNull
    private UUID accidentInfoId;
    private UUID documentId;
}
