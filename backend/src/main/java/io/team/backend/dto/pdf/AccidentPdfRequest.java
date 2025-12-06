package io.team.backend.dto.pdf;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.UUID;

@Data
@AllArgsConstructor @NoArgsConstructor
public class AccidentPdfRequest {
    private UUID userId;
    private UUID accidentInfoId;
    private UUID documentId;
}
