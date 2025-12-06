package io.team.backend.entity.info;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;
import org.hibernate.type.YesNoConverter;

@Getter @Setter
@RequiredArgsConstructor
@Entity
@Table(name = "info_equipments")
public class EquipmentInfo {
    @Id
    @GeneratedValue
    private Long id;
    @Convert(converter = YesNoConverter.class)
    private Boolean used;
    private String name;
    private String condition;
    @Convert(converter = YesNoConverter.class)
    private Boolean usedAccordingInstructions;
    private String useDescription;
    @Convert(converter = YesNoConverter.class)
    private Boolean hasCertificate;
    @Convert(converter = YesNoConverter.class)
    private Boolean registeredInFixedAssets;
}
