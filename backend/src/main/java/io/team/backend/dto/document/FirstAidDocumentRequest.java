package io.team.backend.dto.document;

import io.team.backend.dto.common.AddressRequest;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

import java.time.Duration;

@Data
public class FirstAidDocumentRequest {
    @NotNull
    private Boolean firstAid;
    private String name;
    private AddressRequest address;
    private String traumaType;
    private Duration nonWorkDuration;
}
