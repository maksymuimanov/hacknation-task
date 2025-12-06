package io.team.backend.service.impl;

import io.team.backend.dto.accident.AccidentInfoRequest;
import io.team.backend.dto.accident.AccidentInfoResponse;
import io.team.backend.entity.AccidentInfoSession;
import io.team.backend.entity.PersonSession;
import io.team.backend.exception.PersonNotFoundException;
import io.team.backend.mapper.AccidentInfoSessionMapper;
import io.team.backend.repository.AccidentInfoSessionRepository;
import io.team.backend.repository.PersonSessionRepository;
import io.team.backend.service.AccidentInfoService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AccidentInfoServiceImpl implements AccidentInfoService {
    private final AccidentInfoSessionRepository accidentInfoSessionRepository;
    private final AccidentInfoSessionMapper accidentInfoSessionMapper;
    private final PersonSessionRepository personSessionRepository;

    @Override
    public AccidentInfoResponse createAccident(AccidentInfoRequest accidentInfoRequest) {
        AccidentInfoSession accidentInfoSession = new AccidentInfoSession();
        PersonSession personSession = personSessionRepository.findById(accidentInfoRequest.getUserId()).orElseThrow(PersonNotFoundException::new);
        accidentInfoSession.setPersonSession(personSession);
        AccidentInfoSession savedAccidentInfoSession = accidentInfoSessionRepository.save(accidentInfoSession);
        return accidentInfoSessionMapper.toAccidentInfoSessionResponse(savedAccidentInfoSession);
    }
}
