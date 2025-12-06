package io.team.backend.service.impl;

import io.team.backend.dto.info.AccidentInfoRequest;
import io.team.backend.dto.info.AccidentInfoResponse;
import io.team.backend.entity.info.AccidentInfo;
import io.team.backend.entity.person.Person;
import io.team.backend.exception.PersonNotFoundException;
import io.team.backend.mapper.AccidentInfoMapper;
import io.team.backend.repository.AccidentInfoRepository;
import io.team.backend.repository.InjuredPersonRepository;
import io.team.backend.service.AccidentInfoService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AccidentInfoServiceImpl implements AccidentInfoService {
    private final AccidentInfoRepository accidentInfoRepository;
    private final AccidentInfoMapper accidentInfoMapper;
    private final InjuredPersonRepository injuredPersonRepository;

    @Override
    public AccidentInfoResponse createAccident(AccidentInfoRequest accidentInfoRequest) {
        AccidentInfo accidentInfo = accidentInfoMapper.toAccidentInfo(accidentInfoRequest);
        Person person = injuredPersonRepository.findById(accidentInfoRequest.getUserId()).orElseThrow(PersonNotFoundException::new);
        accidentInfo.setPerson(person);
        AccidentInfo savedAccidentInfo = accidentInfoRepository.save(accidentInfo);
        return accidentInfoMapper.toAccidentInfoResponse(savedAccidentInfo);
    }
}
