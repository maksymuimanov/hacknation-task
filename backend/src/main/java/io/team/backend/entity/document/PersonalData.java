package io.team.backend.entity.document;

import io.team.backend.entity.common.Address;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;
import org.hibernate.type.YesNoConverter;

import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.List;

@Getter
@Setter
@RequiredArgsConstructor
@Entity
@Table(name = "personal_data")
public class PersonalData {
    @Id
    @GeneratedValue
    private Long id;
    @NotBlank
    private String name;
    @Temporal(TemporalType.TIMESTAMP)
    private LocalDateTime date;
    @ManyToOne
    private Address address;
    @Temporal(TemporalType.TIME)
    private LocalTime startTime;
    @Temporal(TemporalType.TIME)
    private LocalTime endTime;
    private String beforeAccidentDescription;
    private String causeDescription;
    @ManyToOne
    private EquipmentDocument equipment;
    @OneToMany(cascade = CascadeType.ALL)
    private List<SecurityMeasure> securityMeasures;
    @ManyToOne
    private Team team;
    @Convert(converter = YesNoConverter.class)
    private Boolean compliedWithSecurityRules;
    @Convert(converter = YesNoConverter.class)
    private Boolean preparedForWork;
    @Convert(converter = YesNoConverter.class)
    private Boolean hasSecurityRulesKnowledge;
    @ManyToOne
    private Condition condition;
    @ManyToOne
    private Investigation investigation;
    @ManyToOne
    private FirstAid firstAid;
    @Convert(converter = YesNoConverter.class)
    private Boolean onSickLeave;
}
