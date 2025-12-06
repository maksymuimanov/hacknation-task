package io.team.backend.controller;

import io.team.backend.dto.document.DocumentRequest;
import io.team.backend.dto.document.DocumentResponse;
import io.team.backend.service.DocumentService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1.0/accidents/documents")
@RequiredArgsConstructor
public class AccidentDocumentController {
    private final DocumentService documentService;

    @PostMapping
    public ResponseEntity<DocumentResponse> postDocument(@Valid @RequestBody DocumentRequest documentRequest) {
        DocumentResponse document = documentService.createDocument(documentRequest);
        return ResponseEntity.ok(document);
    }
}
