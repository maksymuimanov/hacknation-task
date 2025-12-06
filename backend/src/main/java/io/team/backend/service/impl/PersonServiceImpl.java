package io.team.backend.service.impl;

import io.team.backend.dto.person.PersonRequest;
import io.team.backend.dto.person.PersonResponse;
import io.team.backend.entity.PersonSession;
import io.team.backend.mapper.PersonSessionMapper;
import io.team.backend.repository.PersonSessionRepository;
import io.team.backend.service.PersonService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class PersonServiceImpl implements PersonService {
    private final PersonSessionRepository personSessionRepository;
    private final PersonSessionMapper personSessionMapper;

    @Override
    public PersonResponse createAccident(PersonRequest personRequest) {
        PersonSession entity = new PersonSession();
        PersonSession savedSession = personSessionRepository.save(entity);
        System.out.println(savedSession.getId());
        return personSessionMapper.toPersonSessionResponse(savedSession);
    }
}
