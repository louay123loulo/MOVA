package com.mova.api.controllers;

import com.mova.api.models.Venue;
import com.mova.api.models.SportType;
import com.mova.api.services.VenueService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/venues")
public class VenueController {

    @Autowired
    private VenueService venueService;

    @GetMapping
    public List<Venue> getAllVenues(@RequestParam(required = false) SportType sport) {
        if (sport != null) {
            return venueService.getVenuesBySport(sport);
        }
        return venueService.getAllVenues();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Venue> getVenueById(@PathVariable Long id) {
        Optional<Venue> venue = venueService.getVenueById(id);
        return venue.map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/owner/{ownerId}")
    public List<Venue> getOwnVenues(@PathVariable Long ownerId) {
        return venueService.getVenuesByOwnerId(ownerId);
    }

    @PostMapping
    public Venue createVenue(@RequestBody Venue venue) {
        return venueService.createVenue(venue);
    }

    @PatchMapping("/{id}/verify")
    public ResponseEntity<?> verifyVenue(@PathVariable Long id) {
        venueService.verifyVenue(id);
        return ResponseEntity.ok().build();
    }
}
