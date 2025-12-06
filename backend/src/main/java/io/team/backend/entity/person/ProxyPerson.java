package io.team.backend.entity.person;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;
import lombok.ToString;

import java.util.List;

@Getter @Setter
@RequiredArgsConstructor
@Entity
@Table(name = "proxy_persons")
public class ProxyPerson extends Person {
    @ToString.Exclude
    @OneToMany(cascade = CascadeType.ALL)
    private List<InjuredPerson> injuredPersons;
}
