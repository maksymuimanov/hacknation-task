package io.team.backend.service;

import io.team.backend.dto.document.DocumentRequest;
import io.team.backend.dto.document.DocumentResponse;

public interface DocumentService {
    DocumentResponse createDocument(DocumentRequest documentRequest);
}
