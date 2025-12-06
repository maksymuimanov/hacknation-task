package io.team.backend.controller;

import io.team.backend.dto.info.AccidentInfoRequest;
import io.team.backend.dto.info.AccidentInfoResponse;
import io.team.backend.service.AccidentInfoService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api/v1.0/accidents/infos")
@RequiredArgsConstructor
public class AccidentInfoController {
    private final AccidentInfoService infoService;

    @PostMapping
    public ResponseEntity<AccidentInfoResponse> postInfo(@Valid @RequestBody AccidentInfoRequest infoRequest) {
        AccidentInfoResponse accident = infoService.createAccident(infoRequest);
        return ResponseEntity.ok(accident);
    }
}
