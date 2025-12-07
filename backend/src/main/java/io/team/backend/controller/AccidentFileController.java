package io.team.backend.controller;

import io.team.backend.dto.pdf.AccidentFileRequest;
import io.team.backend.service.AccidentFileBuilder;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api/v1.0/accidents/files")
@RequiredArgsConstructor
public class AccidentFileController {
    private final AccidentFileBuilder pdfBuilder;

    @PostMapping(value = "/pdf")
    public ResponseEntity<byte[]> postPdf(@RequestBody AccidentFileRequest pdfRequest) {
        byte[] bytes = pdfBuilder.buildPdfBytes(pdfRequest);
        return ResponseEntity.ok()
                .header(HttpHeaders.CONTENT_DISPOSITION, "inline; filename=\"sample.pdf\"")
                .contentType(MediaType.APPLICATION_PDF)
                .body(bytes);
    }

    @PostMapping(value = "/docx")
    public ResponseEntity<byte[]> postDocx(@RequestBody AccidentFileRequest pdfRequest) {
        byte[] bytes = pdfBuilder.buildDocxBytes(pdfRequest);
        return ResponseEntity.ok()
                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"output.docx\"")
                .contentType(MediaType.APPLICATION_OCTET_STREAM)
                .body(bytes);
    }
}
