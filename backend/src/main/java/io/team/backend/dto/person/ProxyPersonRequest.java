package io.team.backend.dto.person;

import lombok.Data;
import lombok.EqualsAndHashCode;

@EqualsAndHashCode(callSuper = true)
@Data
public class ProxyPersonRequest extends PersonRequest {
    private InjuredPersonRequest injuredPerson;
}
