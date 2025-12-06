package io.team.backend.service.impl;

import io.team.backend.dto.pdf.AccidentPdfRequest;
import io.team.backend.entity.document.Document;
import io.team.backend.entity.info.AccidentInfo;
import io.team.backend.entity.person.Birth;
import io.team.backend.entity.person.InjuredPerson;
import io.team.backend.exception.AccidentInfoNotFoundException;
import io.team.backend.exception.DocumentNotFoundException;
import io.team.backend.exception.PersonNotFoundException;
import io.team.backend.repository.AccidentInfoRepository;
import io.team.backend.repository.DocumentRepository;
import io.team.backend.repository.InjuredPersonRepository;
import io.team.backend.repository.ProxyPersonRepository;
import io.team.backend.service.AccidentPdfBuilder;
import lombok.RequiredArgsConstructor;
import lombok.SneakyThrows;
import org.apache.pdfbox.Loader;
import org.apache.pdfbox.pdmodel.PDDocument;
import org.apache.pdfbox.pdmodel.PDPageContentStream;
import org.apache.pdfbox.pdmodel.font.PDType1Font;
import org.apache.pdfbox.pdmodel.font.Standard14Fonts;
import org.springframework.core.io.ClassPathResource;
import org.springframework.stereotype.Service;

import java.io.File;
import java.time.format.DateTimeFormatter;

@Service
@RequiredArgsConstructor
public class AccidentPdfBuilderImpl implements AccidentPdfBuilder {
    public static final String ACCIDENT_PDF_TEMPLATE_PATH = "template/accident_template.pdf";
    private final InjuredPersonRepository injuredPersonRepository;
    private final ProxyPersonRepository proxyPersonRepository;
    private final AccidentInfoRepository accidentInfoRepository;
    private final DocumentRepository documentRepository;

    @SneakyThrows
    @Override
    public void buildPdf(AccidentPdfRequest accidentPdfRequest) {
        File file = new ClassPathResource(ACCIDENT_PDF_TEMPLATE_PATH).getFile();
        PDDocument pdf = Loader.loadPDF(file);

        InjuredPerson person = injuredPersonRepository.findById(accidentPdfRequest.getUserId()).orElseThrow(PersonNotFoundException::new);
        AccidentInfo accidentInfo = accidentInfoRepository.findById(accidentPdfRequest.getAccidentInfoId()).orElseThrow(AccidentInfoNotFoundException::new);
        Document document = documentRepository.findById(accidentPdfRequest.getDocumentId()).orElseThrow(DocumentNotFoundException::new);

        String[] nameParts = person.getName().split(" ");
        String firstName = nameParts[0];
        String lastName = nameParts[nameParts.length - 1];

        this.put(pdf, 0, 249, 517, this.spacesBetween(person.getPesel()));
        this.put(pdf, 0, 249, 480, this.getSafeString(person.getIdentity()));
        this.put(pdf, 0, 249, 465, firstName);
        this.put(pdf, 0, 249, 439, lastName);
        Birth birth = person.getBirth();
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("ddMMyyyy");
        String birthDate = birth.getDate().format(formatter);
        this.put(pdf, 0, 249, 413, this.spacesBetween(birthDate));

        File outDir = file.getParentFile();
        String outName = "accident_filled_" + person.getId() + ".pdf";
        File out = new File(outDir, outName);
        pdf.save(out);
        pdf.close();
    }

    private void put(PDDocument doc, int page, float x, float y, String text) throws Exception {
        if (text == null) return;
        PDPageContentStream cs = new PDPageContentStream(doc, doc.getPage(page), PDPageContentStream.AppendMode.APPEND, true, true);
        cs.beginText();
        cs.setFont(new PDType1Font(Standard14Fonts.FontName.HELVETICA), 20);
        cs.newLineAtOffset(x, y);
        cs.showText(text);
        cs.endText();
        cs.close();
    }

    private String spacesBetween(Object object) {
        String safeString = this.getSafeString(object);
        return String.join(" ", safeString.split(""));
    }

    private String getSafeString(Object object) {
        return object == null ? "" : object.toString();
    }
}
