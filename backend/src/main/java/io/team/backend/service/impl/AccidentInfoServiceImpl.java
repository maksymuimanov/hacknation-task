package io.team.backend.service.impl;

import io.team.backend.dto.info.AccidentInfoRequest;
import io.team.backend.dto.info.AccidentInfoResponse;
import io.team.backend.entity.AccidentInfoSession;
import io.team.backend.entity.person.Person;
import io.team.backend.exception.PersonNotFoundException;
import io.team.backend.mapper.AccidentInfoSessionMapper;
import io.team.backend.repository.AccidentInfoSessionRepository;
import io.team.backend.repository.InjuredPersonRepository;
import io.team.backend.service.AccidentInfoService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AccidentInfoServiceImpl implements AccidentInfoService {
    private final AccidentInfoSessionRepository accidentInfoSessionRepository;
    private final AccidentInfoSessionMapper accidentInfoSessionMapper;
    private final InjuredPersonRepository injuredPersonRepository;

    @Override
    public AccidentInfoResponse createAccident(AccidentInfoRequest accidentInfoRequest) {
        AccidentInfoSession accidentInfoSession = new AccidentInfoSession();
        Person person = injuredPersonRepository.findById(accidentInfoRequest.getUserId()).orElseThrow(PersonNotFoundException::new);
        accidentInfoSession.setPerson(person);
        AccidentInfoSession savedAccidentInfoSession = accidentInfoSessionRepository.save(accidentInfoSession);
        return accidentInfoSessionMapper.toAccidentInfoResponse(savedAccidentInfoSession);
    }
}
