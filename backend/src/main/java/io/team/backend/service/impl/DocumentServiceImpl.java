package io.team.backend.service.impl;

import io.team.backend.dto.document.DocumentRequest;
import io.team.backend.dto.document.DocumentResponse;
import io.team.backend.entity.document.Document;
import io.team.backend.entity.info.AccidentInfo;
import io.team.backend.exception.AccidentInfoNotFoundException;
import io.team.backend.mapper.DocumentMapper;
import io.team.backend.repository.AccidentInfoSessionRepository;
import io.team.backend.repository.DocumentSessionRepository;
import io.team.backend.service.DocumentService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class DocumentServiceImpl implements DocumentService {
    private final DocumentSessionRepository documentSessionRepository;
    private final DocumentMapper documentMapper;
    private final AccidentInfoSessionRepository accidentInfoSessionRepository;

    @Override
    public DocumentResponse createDocument(DocumentRequest documentRequest) {
        Document document = documentMapper.toDocument(documentRequest);
        AccidentInfo accidentInfo = accidentInfoSessionRepository.findById(documentRequest.getAccidentId()).orElseThrow(AccidentInfoNotFoundException::new);
        document.setAccidentInfo(accidentInfo);
        Document savedDocument = documentSessionRepository.save(document);
        return documentMapper.toDocumentResponse(savedDocument);
    }
}
