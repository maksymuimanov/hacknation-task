package io.team.backend.service;

import io.team.backend.dto.person.InjuredPersonRequest;
import io.team.backend.dto.person.PersonResponse;
import io.team.backend.dto.person.ProxyPersonRequest;

public interface PersonService {
    PersonResponse createInjuredPerson(InjuredPersonRequest personRequest);

    PersonResponse createProxyPerson(ProxyPersonRequest personRequest);
}
