package io.team.backend.dto.person;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import io.team.backend.dto.common.AddressRequest;
import lombok.Data;
import lombok.EqualsAndHashCode;

@EqualsAndHashCode(callSuper = true)
@Data
@JsonIgnoreProperties(ignoreUnknown = true)
public class InjuredPersonRequest extends PersonRequest {
    private AddressRequest businessAddress;
}
