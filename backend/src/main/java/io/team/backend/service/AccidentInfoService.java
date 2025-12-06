package io.team.backend.service;

import io.team.backend.dto.accident.AccidentInfoRequest;
import io.team.backend.dto.accident.AccidentInfoResponse;

public interface AccidentInfoService {
    AccidentInfoResponse createAccident(AccidentInfoRequest accidentInfoRequest);
}
