package io.team.backend.service.impl;

import io.team.backend.dto.document.DocumentRequest;
import io.team.backend.dto.document.DocumentResponse;
import io.team.backend.entity.document.AdditionalData;
import io.team.backend.entity.document.Document;
import io.team.backend.entity.info.AccidentInfo;
import io.team.backend.exception.AccidentInfoNotFoundException;
import io.team.backend.mapper.DocumentMapper;
import io.team.backend.repository.AccidentInfoRepository;
import io.team.backend.repository.DocumentRepository;
import io.team.backend.service.DocumentService;
import lombok.RequiredArgsConstructor;
import lombok.SneakyThrows;
import org.springframework.core.io.ClassPathResource;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.nio.file.Path;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class DocumentServiceImpl implements DocumentService {
    public static final String ACCIDENTS_ADDITIONAL_PATH = "/accidents/additional/";
    private final DocumentRepository documentRepository;
    private final DocumentMapper documentMapper;
    private final AccidentInfoRepository accidentInfoRepository;

    @SneakyThrows
    @Override
    public DocumentResponse createDocument(DocumentRequest documentRequest) {
        Document document = documentMapper.toDocument(documentRequest);
        for (AdditionalData additionalDocument : document.getAdditionalDocuments()) {
            MultipartFile file = additionalDocument.getFile();
            ClassPathResource classPathResource = new ClassPathResource(ACCIDENTS_ADDITIONAL_PATH + file.getOriginalFilename() + "_" + UUID.randomUUID() + file.getContentType());
            String path = classPathResource.getPath();
            file.transferTo(Path.of(path));
            additionalDocument.setPath(path);
        }
        AccidentInfo accidentInfo = accidentInfoRepository.findById(documentRequest.getAccidentId()).orElseThrow(AccidentInfoNotFoundException::new);
        document.setAccidentInfo(accidentInfo);
        Document savedDocument = documentRepository.save(document);
        return documentMapper.toDocumentResponse(savedDocument);
    }
}
