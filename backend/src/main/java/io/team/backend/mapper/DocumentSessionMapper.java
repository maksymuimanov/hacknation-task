package io.team.backend.mapper;

import io.team.backend.config.MapStructConfig;
import io.team.backend.dto.document.DocumentResponse;
import io.team.backend.entity.DocumentSession;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(config = MapStructConfig.class)
public interface DocumentSessionMapper {
    @Mapping(target = "id", source = "id")
    DocumentResponse toDocumentResponse(DocumentSession documentSession);
}
