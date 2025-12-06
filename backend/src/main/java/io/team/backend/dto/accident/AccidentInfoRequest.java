package io.team.backend.dto.accident;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import io.team.backend.dto.common.AddressRequest;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Past;
import lombok.Data;

import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.List;
import java.util.UUID;

@Data
@JsonIgnoreProperties(ignoreUnknown = true)
public class AccidentInfoRequest {
    @NotNull
    private UUID userId;
    @Past
    private LocalDateTime dateTime;
    @NotNull
    private AddressRequest location;
    @Past
    private LocalTime startTime;
    @Past
    private LocalTime endTime;
    @NotEmpty
    private List<String> traumaTypes;
    @NotBlank
    private String description;
    @NotBlank
    private String causeDescription;
    @NotBlank
    private String locationDescription;
    @NotNull
    private HelpRequest firstAid;
    @NotNull
    private HelpRequest investigation;
    @NotNull
    private EquipmentRequest equipment;
    private List<WitnessRequest> witnesses;
}
