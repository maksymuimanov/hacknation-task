package io.team.backend.service;

import io.team.backend.dto.pdf.AccidentFileRequest;

public interface AccidentFileBuilder {
    byte[] buildPdfBytes(AccidentFileRequest accidentFileRequest);

    byte[] buildDocxBytes(AccidentFileRequest accidentFileRequest);
}
