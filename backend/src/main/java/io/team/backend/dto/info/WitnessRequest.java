package io.team.backend.dto.info;

import io.team.backend.dto.common.AddressRequest;
import lombok.Data;

@Data
public class WitnessRequest {
    private String firstName;
    private String lastName;
    private AddressRequest address;
}
