package io.team.backend.entity.document;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;
import org.hibernate.type.YesNoConverter;

@Getter @Setter
@RequiredArgsConstructor
@Entity
@Table(name = "conditions")
public class Condition {
    @Id
    @GeneratedValue
    private Long id;
    @Convert(converter = YesNoConverter.class)
    private Boolean sober;
    @Convert(converter = YesNoConverter.class)
    private Boolean checked;
}
