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
@Table(name = "witnesses")
public class Witness {
    @Id
    private Long id;
    private String name;
    @ManyToOne
    private Address address;
}
