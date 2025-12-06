package io.team.backend.dto.person;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.Data;
import lombok.EqualsAndHashCode;

@EqualsAndHashCode(callSuper = true)
@Data
@JsonIgnoreProperties(ignoreUnknown = true)
public class ProxyPersonRequest extends PersonRequest {
    private InjuredPersonRequest injuredPerson;
}
