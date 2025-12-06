package io.team.backend.dto.accident;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.UUID;

@Data
@AllArgsConstructor @NoArgsConstructor
public class AccidentInfoResponse {
    private UUID id;
}
