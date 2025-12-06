package io.team.backend.mapper;

import io.team.backend.config.MapStructConfig;
import io.team.backend.dto.document.DocumentRequest;
import io.team.backend.dto.document.DocumentResponse;
import io.team.backend.entity.document.Document;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(config = MapStructConfig.class)
public interface DocumentMapper {
    Document toDocument(DocumentRequest documentRequest);

    @Mapping(target = "id", source = "id")
    DocumentResponse toDocumentResponse(Document document);
}
