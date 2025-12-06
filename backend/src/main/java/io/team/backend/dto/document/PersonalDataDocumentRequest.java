package io.team.backend.dto.document;

import io.team.backend.dto.common.AddressRequest;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.List;

@Data
public class PersonalDataDocumentRequest {
    @NotBlank
    private String name;
    @NotNull
    private LocalDateTime date;
    @NotNull
    private AddressRequest address;
    @NotNull
    private LocalTime startTime;
    @NotNull
    private LocalTime endTime;
    @NotBlank
    private String beforeAccidentDescription;
    @NotBlank
    private String causeDescription;
    @NotNull
    private EquipmentDocumentRequest equipment;
    @NotNull
    private List<SecurityMeasureDocumentRequest> securityMeasures;
    @NotNull
    private TeamDocumentRequest team;
    @NotNull
    private Boolean compliedWithSecurityRules;
    @NotNull
    private Boolean preparedForWork;
    @NotNull
    private Boolean hasSecurityRulesKnowledge;
    @NotNull
    private ConditionDocumentRequest condition;
    @NotNull
    private InvestigationDocumentRequest investigation;
    @NotNull
    private FirstAidDocumentRequest firstAid;
    @NotNull
    private Boolean onSickLeave;
}
