package io.team.backend.service;

import io.team.backend.dto.pdf.AccidentPdfRequest;

public interface AccidentPdfBuilder {
    void buildPdf(AccidentPdfRequest accidentPdfRequest);
}
