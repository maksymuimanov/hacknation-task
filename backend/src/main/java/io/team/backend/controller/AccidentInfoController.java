package io.team.backend.controller;

import io.team.backend.dto.accident.AccidentInfoRequest;
import io.team.backend.dto.accident.AccidentInfoResponse;
import io.team.backend.service.AccidentInfoService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1.0/accidents/info")
@RequiredArgsConstructor
public class AccidentInfoController {
    private final AccidentInfoService infoService;

    @PostMapping
    public ResponseEntity<AccidentInfoResponse> postInfo(@Valid @RequestBody AccidentInfoRequest infoRequest) {
        AccidentInfoResponse accident = infoService.createAccident(infoRequest);
        return ResponseEntity.ok(accident);
    }
}
