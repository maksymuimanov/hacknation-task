package io.team.backend.dto.person;

import io.team.backend.dto.common.AddressRequest;
import lombok.Data;
import lombok.EqualsAndHashCode;

@EqualsAndHashCode(callSuper = true)
@Data
public class InjuredPersonRequest extends PersonRequest {
    private AddressRequest businessAddress;
}
