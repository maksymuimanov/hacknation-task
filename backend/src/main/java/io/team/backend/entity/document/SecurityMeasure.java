package io.team.backend.entity.document;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;
import org.hibernate.type.YesNoConverter;

@Getter
@Setter
@RequiredArgsConstructor
@Entity
@Table(name = "security_measures")
public class SecurityMeasure {
    @Id
    @GeneratedValue
    private Long id;
    @Convert(converter = YesNoConverter.class)
    private Boolean used;
    private String type;
    @Convert(converter = YesNoConverter.class)
    private Boolean registeredInFixedAssets;
    @Convert(converter = YesNoConverter.class)
    private Boolean usedAccordingInstructions;
}
