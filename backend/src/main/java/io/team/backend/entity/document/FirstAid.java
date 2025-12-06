package io.team.backend.entity.document;

import io.team.backend.entity.common.Address;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;
import org.hibernate.type.YesNoConverter;

import java.time.Duration;

@Getter @Setter
@RequiredArgsConstructor
@Entity
@Table(name = "first_aids")
public class FirstAid {
    @Id
    @GeneratedValue
    private Long id;
    @Convert(converter = YesNoConverter.class)
    private Boolean firstAid;
    private String name;
    @ManyToOne
    private Address address;
    private String traumaType;
    private Duration nonWorkDuration;
}
