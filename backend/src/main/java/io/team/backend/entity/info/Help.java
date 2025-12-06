package io.team.backend.entity.info;

import io.team.backend.entity.common.Address;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;

@Getter @Setter
@RequiredArgsConstructor
@Entity
@Table(name = "helps")
public class Help {
    @Id
    private Long id;
    private Boolean provided;
    private String name;
    @ManyToOne
    private Address address;
}
