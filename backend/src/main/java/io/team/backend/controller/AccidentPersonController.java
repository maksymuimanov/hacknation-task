package io.team.backend.controller;

import io.team.backend.dto.person.InjuredPersonRequest;
import io.team.backend.dto.person.PersonResponse;
import io.team.backend.dto.person.ProxyPersonRequest;
import io.team.backend.service.PersonService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api/v1.0/accidents/persons")
@RequiredArgsConstructor
public class AccidentPersonController {
    private final PersonService personService;

    @PostMapping(value = "/injured")
    public ResponseEntity<PersonResponse> postInjured(@Valid @RequestBody InjuredPersonRequest personRequest) {
        PersonResponse person = personService.createInjuredPerson(personRequest);
        return ResponseEntity.ok(person);
    }

    @PostMapping(value = "/proxy")
    public ResponseEntity<PersonResponse> postProxy(@Valid @RequestBody ProxyPersonRequest personRequest) {
        PersonResponse person = personService.createProxyPerson(personRequest);
        return ResponseEntity.ok(person);
    }
}
