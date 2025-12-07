package io.team.backend.service.impl;

import io.team.backend.dto.pdf.AccidentFileRequest;
import io.team.backend.entity.common.Address;
import io.team.backend.entity.info.AccidentInfo;
import io.team.backend.entity.info.EquipmentInfo;
import io.team.backend.entity.info.Help;
import io.team.backend.entity.person.Birth;
import io.team.backend.entity.person.CorrespondenceAddress;
import io.team.backend.entity.person.InjuredPerson;
import io.team.backend.entity.person.ProxyPerson;
import io.team.backend.exception.AccidentInfoNotFoundException;
import io.team.backend.exception.PersonNotFoundException;
import io.team.backend.repository.AccidentInfoRepository;
import io.team.backend.repository.InjuredPersonRepository;
import io.team.backend.repository.ProxyPersonRepository;
import io.team.backend.service.AccidentFileBuilder;
import lombok.RequiredArgsConstructor;
import lombok.SneakyThrows;
import org.apache.pdfbox.Loader;
import org.apache.pdfbox.pdmodel.PDDocument;
import org.apache.pdfbox.pdmodel.PDPageContentStream;
import org.apache.pdfbox.pdmodel.font.PDType1Font;
import org.apache.pdfbox.pdmodel.font.Standard14Fonts;
import org.apache.pdfbox.text.PDFTextStripper;
import org.docx4j.openpackaging.packages.WordprocessingMLPackage;
import org.springframework.core.io.ClassPathResource;
import org.springframework.stereotype.Service;

import java.io.ByteArrayOutputStream;
import java.io.File;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.time.format.DateTimeFormatter;
import java.util.List;

@Service
@RequiredArgsConstructor
public class AccidentFileBuilderImpl implements AccidentFileBuilder {
    public static final String ACCIDENT_PDF_TEMPLATE_PATH = "template/accident_template.pdf";
    private final InjuredPersonRepository injuredPersonRepository;
    private final ProxyPersonRepository proxyPersonRepository;
    private final AccidentInfoRepository accidentInfoRepository;
//    private final DocumentRepository documentRepository;

    @SneakyThrows
    @Override
    public byte[] buildPdfBytes(AccidentFileRequest accidentFileRequest) {
        ByteArrayOutputStream byteArrayOutputStream = new ByteArrayOutputStream();

        File file = new ClassPathResource(ACCIDENT_PDF_TEMPLATE_PATH).getFile();
        PDDocument pdf = Loader.loadPDF(file);

        ProxyPerson proxyPerson = null;
        InjuredPerson injuredPerson;
        if (injuredPersonRepository.existsById(accidentFileRequest.getUserId())) {
            injuredPerson = injuredPersonRepository.findById(accidentFileRequest.getUserId()).orElseThrow(PersonNotFoundException::new);
        } else if (proxyPersonRepository.existsById(accidentFileRequest.getAccidentInfoId())) {
            proxyPerson = proxyPersonRepository.findById(accidentFileRequest.getUserId()).orElseThrow(PersonNotFoundException::new);
            injuredPerson = proxyPerson.getInjuredPerson();
        } else {
            throw new PersonNotFoundException();
        }

        AccidentInfo accidentInfo = accidentInfoRepository.findById(accidentFileRequest.getAccidentInfoId()).orElseThrow(AccidentInfoNotFoundException::new);
//        Document document = documentRepository.findById(accidentPdfRequest.getDocumentId()).orElseThrow(DocumentNotFoundException::new);

        String[] nameParts = injuredPerson.getName().split(" ");
        String firstName = nameParts[0];
        String lastName = nameParts[nameParts.length - 1];

        this.put(pdf, 0, 249, 517, this.spacesBetween(injuredPerson.getPesel()));
        this.put(pdf, 0, 249, 487, this.getSafeString(injuredPerson.getIdentity()));
        this.put(pdf, 0, 249, 465, firstName);
        this.put(pdf, 0, 249, 439, lastName);
        Birth birth = injuredPerson.getBirth();
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("ddMMyyyy");
        String birthDate = birth.getDate().format(formatter);
        this.put(pdf, 0, 249, 413, this.spacesBetween(birthDate));
        this.put(pdf, 0, 249, 377, this.getSafeString(birth.getCity()));
        this.put(pdf, 0, 249, 347, this.getSafeString(injuredPerson.getPhoneNumber()));

        Address residentialAddress = injuredPerson.getResidentialAddress();
        this.putMulti(pdf, 0, 249, 280, List.of(this.getSafeString(residentialAddress.getStreet()), this.getSafeString(residentialAddress.getHouseNumber()), this.getSafeString(residentialAddress.getZipCode()), this.getSafeString(residentialAddress.getCountry())));
        this.putMulti(pdf, 0, 400, 253, List.of(this.getSafeString(residentialAddress.getApartmentNumber()), this.getSafeString(residentialAddress.getCity())));

        Address lastKnownAddress = injuredPerson.getLastKnownAddress();
        if (lastKnownAddress != null) {
            this.putMulti(pdf, 0, 249, 120, List.of(this.getSafeString(lastKnownAddress.getStreet()), this.getSafeString(lastKnownAddress.getHouseNumber()), this.getSafeString(lastKnownAddress.getZipCode())));
            this.putMulti(pdf, 0, 400, 93, List.of(this.getSafeString(lastKnownAddress.getApartmentNumber()), this.getSafeString(lastKnownAddress.getCity())));
        }

        CorrespondenceAddress correspondenceAddress = injuredPerson.getCorrespondenceAddress();
        if (correspondenceAddress != null && correspondenceAddress.getType() != null) {
            CorrespondenceAddress.Type type = correspondenceAddress.getType();
            switch (type) {
                case ADDRESS -> {
                    this.put(pdf, 1, 46, 702, "X");
                    this.putMulti(pdf, 1, 249, 627, List.of(this.getSafeString(correspondenceAddress.getStreet()), this.getSafeString(correspondenceAddress.getHouseNumber()), this.getSafeString(correspondenceAddress.getZipCode()), this.getSafeString(correspondenceAddress.getCountry())));
                    this.putMulti(pdf, 1, 400, 600, List.of(this.getSafeString(correspondenceAddress.getApartmentNumber()), this.getSafeString(correspondenceAddress.getCity())));
                }
                case POSTE_RESTANTE -> {
                    CorrespondenceAddress.PosteRestante posteRestante = correspondenceAddress.getPosteRestante();
                    this.put(pdf, 1, 136, 702, "X");
                    this.put(pdf, 1, 249, 573, this.getSafeString(posteRestante.getZipCode()));
                    this.put(pdf, 1, 400, 573, this.getSafeString(posteRestante.getPostOfficeName()));
                }
                case PO_BOX -> {
                    CorrespondenceAddress.PoBox poBox = correspondenceAddress.getPoBox();
                    this.put(pdf, 1, 262, 702, "X");
                    this.put(pdf, 1, 249, 600, this.getSafeString(poBox.getZipCode()));
                    this.put(pdf, 1, 249, 573, this.getSafeString(poBox.getZipCode()));
                    this.put(pdf, 1, 400, 573, this.getSafeString(poBox.getPostOfficeName()));
                }
            }
        }

        Address businessAddress = injuredPerson.getBusinessAddress();
        if (businessAddress != null) {
            this.putMulti(pdf, 1, 249, 400, List.of(this.getSafeString(businessAddress.getStreet()), this.getSafeString(businessAddress.getHouseNumber()), this.getSafeString(businessAddress.getZipCode())));
            this.putMulti(pdf, 1, 400, 373, List.of(this.getSafeString(businessAddress.getApartmentNumber()), this.getSafeString(businessAddress.getCity())));
        }

        if (proxyPerson != null) {
            this.put(pdf, 1, 249, 120, this.spacesBetween(proxyPerson.getPesel()));
            this.put(pdf, 1, 249, 90, this.getSafeString(proxyPerson.getIdentity()));
            String[] proxyNameParts = proxyPerson.getName().split(" ");
            String proxyFirstName = proxyNameParts[0];
            String proxyLastName = proxyNameParts[nameParts.length - 1];
            this.put(pdf, 1, 249, 60, proxyFirstName);
            this.put(pdf, 1, 249, 30, proxyLastName);
            Birth proxyBirth = injuredPerson.getBirth();
            String proxyBirthDate = proxyBirth.getDate().format(formatter);
            this.put(pdf, 2, 249, 600, this.spacesBetween(proxyBirthDate));
            this.put(pdf, 2, 249, 570, this.getSafeString(proxyPerson.getPhoneNumber()));

            Address proxyResidentialAddress = proxyPerson.getResidentialAddress();
            this.putMulti(pdf, 2, 249, 500, List.of(this.getSafeString(proxyResidentialAddress.getStreet()), this.getSafeString(proxyResidentialAddress.getHouseNumber()), this.getSafeString(proxyResidentialAddress.getZipCode()), this.getSafeString(proxyResidentialAddress.getCountry())));
            this.putMulti(pdf, 2, 400, 470, List.of(this.getSafeString(proxyResidentialAddress.getApartmentNumber()), this.getSafeString(proxyResidentialAddress.getCity())));

            Address proxyLastKnownAddress = proxyPerson.getLastKnownAddress();
            if (proxyLastKnownAddress != null) {
                this.putMulti(pdf, 2, 249, 400, List.of(this.getSafeString(proxyLastKnownAddress.getStreet()), this.getSafeString(proxyLastKnownAddress.getHouseNumber()), this.getSafeString(proxyLastKnownAddress.getZipCode())));
                this.putMulti(pdf, 2, 400, 370, List.of(this.getSafeString(proxyLastKnownAddress.getApartmentNumber()), this.getSafeString(proxyLastKnownAddress.getCity())));
            }

            CorrespondenceAddress proxyCorrespondenceAddress = proxyPerson.getCorrespondenceAddress();
            if (proxyCorrespondenceAddress != null && proxyCorrespondenceAddress.getType() != null) {
                CorrespondenceAddress.Type type = proxyCorrespondenceAddress.getType();
                switch (type) {
                    case ADDRESS -> {
                        this.put(pdf, 2, 46, 300, "X");
                        this.putMulti(pdf, 2, 249, 270, List.of(this.getSafeString(proxyCorrespondenceAddress.getStreet()), this.getSafeString(proxyCorrespondenceAddress.getHouseNumber()), this.getSafeString(proxyCorrespondenceAddress.getZipCode()), this.getSafeString(proxyCorrespondenceAddress.getCountry())));
                        this.putMulti(pdf, 2, 400, 240, List.of(this.getSafeString(proxyCorrespondenceAddress.getApartmentNumber()), this.getSafeString(proxyCorrespondenceAddress.getCity())));
                    }
                    case POSTE_RESTANTE -> {
                        CorrespondenceAddress.PosteRestante posteRestante = proxyCorrespondenceAddress.getPosteRestante();
                        this.put(pdf, 2, 136, 300, "X");
                        this.put(pdf, 2, 249, 210, this.getSafeString(posteRestante.getZipCode()));
                        this.put(pdf, 2, 400, 210, this.getSafeString(posteRestante.getPostOfficeName()));
                    }
                    case PO_BOX -> {
                        CorrespondenceAddress.PoBox poBox = proxyCorrespondenceAddress.getPoBox();
                        this.put(pdf, 2, 262, 300, "X");
                        this.put(pdf, 2, 249, 240, this.getSafeString(poBox.getZipCode()));
                        this.put(pdf, 2, 249, 210, this.getSafeString(poBox.getZipCode()));
                        this.put(pdf, 2, 400, 210, this.getSafeString(poBox.getPostOfficeName()));
                    }
                }
            }
        }

        LocalDateTime dateTime = accidentInfo.getDateTime();
        LocalDate localDate = dateTime.toLocalDate();
        LocalTime localTime = dateTime.toLocalTime();
        this.put(pdf, 2, 149, 120, this.spacesBetween(localDate.format(formatter)));
        this.put(pdf, 2, 409, 120, this.getSafeString(localTime.format(DateTimeFormatter.ofPattern("HH:mm"))));
        this.put(pdf, 2, 159, 90, this.getSafeString(accidentInfo.getLocation()));
        this.put(pdf, 2, 229, 60, this.getSafeString(accidentInfo.getStartTime().format(DateTimeFormatter.ofPattern("HH:mm"))));
        this.put(pdf, 2, 469, 60, this.getSafeString(accidentInfo.getEndTime().format(DateTimeFormatter.ofPattern("HH:mm"))));

        this.put(pdf, 3, 189, 700, String.join(", ", accidentInfo.getTraumaTypes()));
        this.put(pdf, 3, 70, 600, String.join(", ", accidentInfo.getDescription()));
        Help firstAid = accidentInfo.getFirstAid();
        if (firstAid != null && firstAid.getProvided()) {
            this.put(pdf, 3, 279, 410, "X");
            this.put(pdf, 3, 70, 383, firstAid.getName());
        } else {
            this.put(pdf, 3, 352, 410, "X");
        }

        Help investigation = accidentInfo.getInvestigation();
        if (investigation != null && investigation.getProvided()) {
            this.put(pdf, 3, 70, 333, investigation.getName());
        }

        EquipmentInfo equipmentInfo = accidentInfo.getEquipmentInfo();
        if (equipmentInfo != null && equipmentInfo.getUsed()) {
            this.put(pdf, 3, 329, 225, "X");
            this.put(pdf, 3, 70, 194, String.join(", ", equipmentInfo.getCondition(), equipmentInfo.getUseDescription(), equipmentInfo.getUsedAccordingInstructions().toString()));
            if (equipmentInfo.getHasCertificate()) {
                this.put(pdf, 3, 357, 110, "X");
            } else {
                this.put(pdf, 3, 435, 110, "X");
            }
            if (equipmentInfo.getRegisteredInFixedAssets()) {
                this.put(pdf, 3, 386, 85, "X");
            } else {
                this.put(pdf, 3, 464, 85, "X");
            }
        } else {
            this.put(pdf, 3, 397, 225, "X");
        }

        pdf.save(byteArrayOutputStream);
        pdf.close();

        return byteArrayOutputStream.toByteArray();
    }

    @SneakyThrows
    @Override
    public byte[] buildDocxBytes(AccidentFileRequest accidentFileRequest) {
        ByteArrayOutputStream byteArrayOutputStream = new ByteArrayOutputStream();
        byte[] pdfBytes = this.buildPdfBytes(accidentFileRequest);
        PDDocument pdf = Loader.loadPDF(pdfBytes);
        PDFTextStripper stripper = new PDFTextStripper();
        String text = stripper.getText(pdf);
        pdf.close();
        WordprocessingMLPackage word = WordprocessingMLPackage.createPackage();
        word.getMainDocumentPart().addParagraphOfText(text);
        word.save(byteArrayOutputStream);
        return byteArrayOutputStream.toByteArray();
    }

    private void putMulti(PDDocument doc, int page, float x, float y, List<String> strings) throws Exception {
        float currentY = y;
        for (String string : strings) {
            this.put(doc, page, x, currentY, string);
            currentY -= 27;
        }
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
        try {
            return object == null ? "" : object.toString().toUpperCase();
        } catch (Exception e) {
            return "";
        }
    }
}
