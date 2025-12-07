package io.team.backend.controller;

import io.team.backend.dto.pdf.AccidentPdfRequest;
import io.team.backend.service.AccidentPdfBuilder;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api/v1.0/accidents/pdf")
@RequiredArgsConstructor
public class AccidentPdfController {
    private final AccidentPdfBuilder pdfBuilder;

    @PostMapping
    public ResponseEntity<byte[]> postInjured(@Valid @RequestBody AccidentPdfRequest pdfRequest) {
        byte[] bytes = pdfBuilder.buildPdf(pdfRequest);
        return ResponseEntity.ok()
                .header(HttpHeaders.CONTENT_DISPOSITION, "inline; filename=\"sample.pdf\"")
                .body(bytes);
    }
}
