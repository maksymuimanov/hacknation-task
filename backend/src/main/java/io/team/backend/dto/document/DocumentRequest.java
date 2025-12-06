package io.team.backend.dto.document;

import jakarta.validation.constraints.NotNull;
import lombok.Data;

import java.util.List;
import java.util.UUID;

@Data
public class DocumentRequest {
    @NotNull
    private UUID accidentId;
    private List<AdditionalDataDocumentRequest> additionalDocuments;
}
