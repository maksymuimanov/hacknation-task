import io.team.backend.BackendApplication;
import io.team.backend.dto.pdf.AccidentPdfRequest;
import io.team.backend.entity.document.Document;
import io.team.backend.entity.info.AccidentInfo;
import io.team.backend.entity.person.Birth;
import io.team.backend.entity.person.InjuredPerson;
import io.team.backend.repository.AccidentInfoRepository;
import io.team.backend.repository.DocumentRepository;
import io.team.backend.repository.InjuredPersonRepository;
import io.team.backend.service.AccidentPdfBuilder;
import io.team.backend.service.impl.AccidentPdfBuilderImpl;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.io.File;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.concurrent.ThreadLocalRandom;

@SpringBootTest(classes = BackendApplication.class)
class PdfBuildingTests {
    @Autowired
    private InjuredPersonRepository injuredPersonRepository;
    @Autowired
    private AccidentInfoRepository accidentInfoRepository;
    @Autowired
    private DocumentRepository documentRepository;
    @Autowired
    private AccidentPdfBuilder accidentPdfBuilder;


    @Test
    void test() {
        // prepare random person data
        InjuredPerson injuredPerson = new InjuredPerson();
        injuredPerson.setName("Jan " + java.util.UUID.randomUUID().toString().substring(0, 8));
        injuredPerson.setPesel(randomDigits(11));
        injuredPerson.setPhoneNumber(randomDigits(9));
        Birth birth = new Birth();
        birth.setDate(LocalDate.now().minusYears(18));
        injuredPerson.setBirth(birth);
        injuredPersonRepository.save(injuredPerson);
        
        // prepare random accident info
        AccidentInfo accidentInfo = new AccidentInfo();
        LocalDateTime now = LocalDateTime.now();
        accidentInfo.setDateTime(now);
        accidentInfo.setStartTime(now.minusHours(1).toLocalTime());
        accidentInfo.setEndTime(now.toLocalTime());
        accidentInfo.setDescription("Opis zdarzenia " + java.util.UUID.randomUUID());
        accidentInfo.setCauseDescription("Przyczyna " + java.util.UUID.randomUUID());
        accidentInfo.setLocationDescription("Opis miejsca " + java.util.UUID.randomUUID());
        accidentInfoRepository.save(accidentInfo);
        
        // minimal document (relations optional)
        Document document = new Document();
        documentRepository.save(document);

        // build PDF
        accidentPdfBuilder.buildPdf(new AccidentPdfRequest(
                injuredPerson.getId(),
                accidentInfo.getId(),
                document.getId()
        ));

        // verify file generated next to template
        try {
            File template = new org.springframework.core.io.ClassPathResource(AccidentPdfBuilderImpl.ACCIDENT_PDF_TEMPLATE_PATH).getFile();
            File out = new File(template.getParentFile(), "accident_filled_" + injuredPerson.getId() + ".pdf");
            Assertions.assertTrue(out.exists(), "Generated PDF file should exist: " + out.getAbsolutePath());
        } catch (Exception e) {
            Assertions.fail("Template not accessible or file not generated: " + e.getMessage());
        }
    }

    private static String randomDigits(int len) {
        StringBuilder sb = new StringBuilder(len);
        ThreadLocalRandom r = ThreadLocalRandom.current();
        for (int i = 0; i < len; i++) sb.append(r.nextInt(0, 10));
        return sb.toString();
    }
}
