package io.team.backend.service.impl;

import io.team.backend.dto.person.InjuredPersonRequest;
import io.team.backend.dto.person.PersonResponse;
import io.team.backend.dto.person.ProxyPersonRequest;
import io.team.backend.entity.person.InjuredPerson;
import io.team.backend.entity.person.ProxyPerson;
import io.team.backend.mapper.PersonMapper;
import io.team.backend.repository.InjuredPersonRepository;
import io.team.backend.repository.ProxyPersonRepository;
import io.team.backend.service.PersonService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class PersonServiceImpl implements PersonService {
    private final InjuredPersonRepository injuredPersonRepository;
    private final ProxyPersonRepository proxyPersonRepository;
    private final PersonMapper personMapper;

//    @Override
//    public PersonResponse createInjuredPerson(PersonRequest personRequest) {
//        Person entity = new Person();
//        Person savedSession = injuredPersonRepository.save(entity);
//        System.out.println(savedSession.getId());
//        return personMapper.toPersonResponse(savedSession);
//    }

    @Override
    public PersonResponse createInjuredPerson(InjuredPersonRequest personRequest) {
        InjuredPerson injuredPerson = personMapper.toInjuredPerson(personRequest);
        InjuredPerson savedPerson = injuredPersonRepository.save(injuredPerson);
        return personMapper.toPersonResponse(savedPerson);
    }

    @Override
    public PersonResponse createProxyPerson(ProxyPersonRequest personRequest) {
        ProxyPerson proxyPerson = personMapper.toProxyPerson(personRequest);
        InjuredPersonRequest injuredPersonRequest = personRequest.getInjuredPerson();
        InjuredPerson injuredPerson = personMapper.toInjuredPerson(injuredPersonRequest);
        InjuredPerson savedInjuredPerson = injuredPersonRepository.save(injuredPerson);
        proxyPerson.setInjuredPerson(savedInjuredPerson);
        ProxyPerson savedProxyPerson = proxyPersonRepository.save(proxyPerson);
        return personMapper.toPersonResponse(savedProxyPerson);
    }
}
