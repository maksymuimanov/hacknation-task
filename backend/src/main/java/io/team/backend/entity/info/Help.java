package io.team.backend.entity.info;

import io.team.backend.entity.common.Address;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;
import org.hibernate.type.YesNoConverter;

@Getter @Setter
@RequiredArgsConstructor
@Entity
@Table(name = "helps")
public class Help {
    @Id
    @GeneratedValue
    private Long id;
    @Convert(converter = YesNoConverter.class)
    private Boolean provided;
    private String name;
    @ManyToOne(cascade = CascadeType.ALL)
    private Address address;
}
