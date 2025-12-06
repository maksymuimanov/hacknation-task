package io.team.backend.service;

import io.team.backend.dto.person.PersonRequest;
import io.team.backend.dto.person.PersonResponse;

public interface PersonService {
    PersonResponse createAccident(PersonRequest personRequest);
}
