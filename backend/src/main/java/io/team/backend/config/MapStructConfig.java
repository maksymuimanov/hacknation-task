package io.team.backend.config;

import org.mapstruct.MapperConfig;
import org.springframework.context.annotation.Configuration;

import static org.mapstruct.MappingConstants.ComponentModel.SPRING;

@Configuration
@MapperConfig(componentModel = SPRING)
public class MapStructConfig {
}
