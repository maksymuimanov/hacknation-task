package io.team.backend.mapper;

import io.team.backend.config.MapStructConfig;
import io.team.backend.dto.person.InjuredPersonRequest;
import io.team.backend.dto.person.PersonResponse;
import io.team.backend.dto.person.ProxyPersonRequest;
import io.team.backend.entity.person.InjuredPerson;
import io.team.backend.entity.person.Person;
import io.team.backend.entity.person.ProxyPerson;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(config = MapStructConfig.class)
public interface PersonMapper {
    InjuredPerson toInjuredPerson(InjuredPersonRequest personRequest);

    ProxyPerson toProxyPerson(ProxyPersonRequest personRequest);

    @Mapping(target = "id", source = "id")
    PersonResponse toPersonResponse(Person person);
}
