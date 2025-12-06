package io.team.backend.service.impl;

import io.team.backend.dto.document.DocumentRequest;
import io.team.backend.dto.document.DocumentResponse;
import io.team.backend.entity.AccidentInfoSession;
import io.team.backend.entity.DocumentSession;
import io.team.backend.exception.AccidentInfoNotFoundException;
import io.team.backend.mapper.DocumentSessionMapper;
import io.team.backend.repository.AccidentInfoSessionRepository;
import io.team.backend.repository.DocumentSessionRepository;
import io.team.backend.service.DocumentService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class DocumentServiceImpl implements DocumentService {
    private final DocumentSessionRepository documentSessionRepository;
    private final DocumentSessionMapper documentSessionMapper;
    private final AccidentInfoSessionRepository accidentInfoSessionRepository;

    @Override
    public DocumentResponse createDocument(DocumentRequest documentRequest) {
        DocumentSession documentSession = new DocumentSession();
        AccidentInfoSession accidentInfoSession = accidentInfoSessionRepository.findById(documentRequest.getAccidentId()).orElseThrow(AccidentInfoNotFoundException::new);
        documentSession.setAccidentInfoSession(accidentInfoSession);
        DocumentSession savedDocumentSession = documentSessionRepository.save(documentSession);
        return documentSessionMapper.toDocumentResponse(savedDocumentSession);
    }
}
