package io.team.backend.dto.document;

import io.team.backend.dto.common.AddressRequest;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class InvestigationDocumentRequest {
    @NotNull
    private Boolean investigated;
    private String name;
    private AddressRequest address;
    private Long decisionNumber;
    private Status status;

    public enum Status {
        COMPLETED, IN_PROGRESS, DISCONTINUED
    }
}
