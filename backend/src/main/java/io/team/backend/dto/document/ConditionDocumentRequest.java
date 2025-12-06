package io.team.backend.dto.document;

import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class ConditionDocumentRequest {
    @NotNull
    private Boolean sober;
    @NotNull
    private Boolean checked;
}
