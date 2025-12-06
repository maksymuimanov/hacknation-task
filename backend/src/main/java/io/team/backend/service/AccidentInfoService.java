package io.team.backend.service;

import io.team.backend.dto.info.AccidentInfoRequest;
import io.team.backend.dto.info.AccidentInfoResponse;

public interface AccidentInfoService {
    AccidentInfoResponse createAccident(AccidentInfoRequest accidentInfoRequest);
}
