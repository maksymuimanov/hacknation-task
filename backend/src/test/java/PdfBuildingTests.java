import io.team.backend.BackendApplication;
import io.team.backend.dto.pdf.AccidentPdfRequest;
import io.team.backend.entity.common.Address;
import io.team.backend.entity.document.Document;
import io.team.backend.entity.info.AccidentInfo;
import io.team.backend.entity.info.EquipmentInfo;
import io.team.backend.entity.info.Help;
import io.team.backend.entity.person.Birth;
import io.team.backend.entity.person.CorrespondenceAddress;
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
import java.util.List;
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
        birth.setCity("Warszawa");
        injuredPerson.setBirth(birth);
        Address residentialAddress = new Address();
        residentialAddress.setStreet("ul. " + java.util.UUID.randomUUID().toString().substring(0, 8));
        residentialAddress.setHouseNumber(1);
        residentialAddress.setZipCode("00-000");
        residentialAddress.setCity("Warszawa");
        residentialAddress.setCountry("Polska");
        residentialAddress.setApartmentNumber(1);
        injuredPerson.setResidentialAddress(residentialAddress);
        injuredPerson.setLastKnownAddress(residentialAddress);
        CorrespondenceAddress correspondenceAddress = new CorrespondenceAddress();
        correspondenceAddress.setStreet("ul. " + java.util.UUID.randomUUID().toString().substring(0, 8));
        correspondenceAddress.setHouseNumber(1);
        correspondenceAddress.setZipCode("00-000");
        correspondenceAddress.setCity("Warszawa");
        correspondenceAddress.setCountry("Polska");
        correspondenceAddress.setApartmentNumber(1);
        correspondenceAddress.setType(CorrespondenceAddress.Type.PO_BOX);
        CorrespondenceAddress.PosteRestante posteRestante = new CorrespondenceAddress.PosteRestante();
        posteRestante.setPostOfficeName("Poste Restante " + java.util.UUID.randomUUID().toString().substring(0, 8));
        posteRestante.setZipCode("00-000");
        correspondenceAddress.setPosteRestante(posteRestante);
        CorrespondenceAddress.PoBox poBox = new CorrespondenceAddress.PoBox();
        poBox.setNumber("123");
        poBox.setZipCode("00-000");
        poBox.setPostOfficeName("Po Box " + java.util.UUID.randomUUID().toString().substring(0, 8));
        correspondenceAddress.setPoBox(poBox);
        injuredPerson.setCorrespondenceAddress(correspondenceAddress);
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
        Address location = new Address();
        location.setStreet("ul. " + java.util.UUID.randomUUID().toString().substring(0, 8));
        location.setHouseNumber(1);
        location.setZipCode("00-000");
        location.setCity("Warszawa");
        location.setCountry("Polska");
        location.setApartmentNumber(1);
        accidentInfo.setLocation(location);
        accidentInfo.setTraumaTypes(List.of("Trawa", "Wypadek", "Inny", "JNAEjanegneagnaoeng", "EAJGOUNOAGNIOAENIOANGEAEGInaOGNaIO"));
        accidentInfo.setDescription("Opis zdarzenia " + java.util.UUID.randomUUID());
        Help firstAid = new Help();
        firstAid.setProvided(true);
        accidentInfo.setFirstAid(firstAid);
        EquipmentInfo equipmentInfo = new EquipmentInfo();
        equipmentInfo.setUsed(true);
        equipmentInfo.setHasCertificate(false);
        equipmentInfo.setRegisteredInFixedAssets(true);
        equipmentInfo.setCondition("KMAKmaegjnagna");
        equipmentInfo.setUseDescription("jnaFJNAOEFNao");
        equipmentInfo.setUsedAccordingInstructions(true);
        accidentInfo.setEquipmentInfo(equipmentInfo);
        accidentInfo.setInvestigation(firstAid);
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
