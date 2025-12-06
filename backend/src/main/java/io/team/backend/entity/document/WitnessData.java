package io.team.backend.entity.document;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;

@Getter
@Setter
@RequiredArgsConstructor
@Entity
@Table(name = "witness_data")
public class WitnessData {
    @Id
    @GeneratedValue
    private Long id;
    private String name;
    private String injuredPersonName;
    @Temporal(TemporalType.DATE)
    private LocalDate date;
    private String description;
}
