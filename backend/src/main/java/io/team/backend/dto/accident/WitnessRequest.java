package io.team.backend.dto.accident;

import io.team.backend.dto.common.AddressRequest;
import lombok.Data;

@Data
public class WitnessRequest {
    private String firstName;
    private String lastName;
    private AddressRequest address;
}
