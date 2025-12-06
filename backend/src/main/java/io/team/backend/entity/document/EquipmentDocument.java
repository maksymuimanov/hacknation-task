package io.team.backend.entity.document;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;
import org.hibernate.type.YesNoConverter;

import java.time.LocalDate;

@Getter @Setter
@RequiredArgsConstructor
@Entity
@Table(name = "document_equipments")
public class EquipmentDocument {
    @Id
    @GeneratedValue
    private Long id;
    @Convert(converter = YesNoConverter.class)
    private Boolean used;
    private String name;
    private String type;
    @Temporal(TemporalType.DATE)
    private LocalDate productionDate;
    @Convert(converter = YesNoConverter.class)
    private Boolean registeredInFixedAssets;
    @Convert(converter = YesNoConverter.class)
    private Boolean usedAccordingInstructions;
}
