package io.team.backend.entity.person;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;

@Getter @Setter
@RequiredArgsConstructor
@Entity
@Table(name = "births")
public class Birth {
    @Id
    private Long id;
    @Temporal(TemporalType.DATE)
    private LocalDate date;
    private String city;
}
