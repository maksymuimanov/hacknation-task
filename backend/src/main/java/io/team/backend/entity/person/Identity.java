package io.team.backend.entity.person;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;

@Getter @Setter
@RequiredArgsConstructor
@Entity
@Table(name = "identities")
public class Identity {
    @Id
    @GeneratedValue
    private Long id;
    private String type;
    private String series;
    private String number;
}
