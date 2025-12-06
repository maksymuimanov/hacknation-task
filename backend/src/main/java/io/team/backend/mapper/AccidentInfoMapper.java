package io.team.backend.mapper;

import io.team.backend.config.MapStructConfig;
import io.team.backend.dto.info.AccidentInfoRequest;
import io.team.backend.dto.info.AccidentInfoResponse;
import io.team.backend.entity.info.AccidentInfo;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(config = MapStructConfig.class)
public interface AccidentInfoMapper {
    AccidentInfo toAccidentInfo(AccidentInfoRequest accidentInfoRequest);

    @Mapping(target = "id", source = "id")
    AccidentInfoResponse toAccidentInfoResponse(AccidentInfo accidentInfo);
}
