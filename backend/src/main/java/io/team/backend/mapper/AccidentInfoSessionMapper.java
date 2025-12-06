package io.team.backend.mapper;

import io.team.backend.config.MapStructConfig;
import io.team.backend.dto.info.AccidentInfoResponse;
import io.team.backend.entity.AccidentInfoSession;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(config = MapStructConfig.class)
public interface AccidentInfoSessionMapper {
    @Mapping(target = "id", source = "id")
    AccidentInfoResponse toAccidentInfoResponse(AccidentInfoSession accidentInfoSession);
}
