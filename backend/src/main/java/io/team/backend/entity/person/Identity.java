package io.team.backend.entity.person;

import jakarta.persistence.*;
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
    @Column(length = 512)
    private String type;
    @Column(length = 512)
    private String series;
    @Column(length = 512)
    private String number;

    @Override
    public String toString() {
        return String.join(", ", type, series, number);
    }
}
