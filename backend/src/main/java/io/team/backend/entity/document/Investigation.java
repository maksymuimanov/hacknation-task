package io.team.backend.entity.document;

import io.team.backend.entity.common.Address;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;
import org.hibernate.type.YesNoConverter;

@Getter
@Setter
@RequiredArgsConstructor
@Entity
@Table(name = "investigations")
public class Investigation {
    @Id
    @GeneratedValue
    private Long id;
    @Convert(converter = YesNoConverter.class)
    private Boolean investigated;
    private String name;
    @ManyToOne
    private Address address;
    private Long decisionNumber;
    @Enumerated(EnumType.STRING)
    private Status status;

    public enum Status {
        COMPLETED, IN_PROGRESS, DISCONTINUED
    }
}
