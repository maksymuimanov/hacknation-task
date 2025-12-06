package io.team.backend.entity.info;

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
@Table(name = "equipments")
public class Equipment {
    @Id
    @GeneratedValue
    private Long id;
    private Boolean used;
    private String name;
    private String condition;
    private Boolean usedAccordingInstructions;
    private String useDescription;
    private Boolean hasCertificate;
    private Boolean registeredInFixedAssets;
}
