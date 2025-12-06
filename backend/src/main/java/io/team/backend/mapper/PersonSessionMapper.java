package io.team.backend.mapper;

import io.team.backend.config.MapStructConfig;
import io.team.backend.dto.person.PersonResponse;
import io.team.backend.entity.PersonSession;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(config = MapStructConfig.class)
public interface PersonSessionMapper {
    @Mapping(target = "id", source = "id")
    PersonResponse toPersonSessionResponse(PersonSession personSession);
}
