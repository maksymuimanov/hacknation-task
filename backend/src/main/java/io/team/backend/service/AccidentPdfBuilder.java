package io.team.backend.service;

import io.team.backend.dto.pdf.AccidentPdfRequest;

public interface AccidentPdfBuilder {
    byte[] buildPdf(AccidentPdfRequest accidentPdfRequest);
}
