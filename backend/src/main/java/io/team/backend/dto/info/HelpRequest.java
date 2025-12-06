package io.team.backend.dto.info;

import io.team.backend.dto.common.AddressRequest;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class HelpRequest {
    @NotNull
    private Boolean provided;
    private String name;
    private AddressRequest address;
}
