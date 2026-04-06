package com.mova.api.services;

import com.mova.api.models.Venue;
import com.mova.api.models.SportType;
import com.mova.api.repositories.VenueRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service
public class VenueService {

    @Autowired
    private VenueRepository venueRepository;

    public List<Venue> getAllVenues() {
        return venueRepository.findAll();
    }

    public List<Venue> getVenuesBySport(SportType sport) {
        return venueRepository.findBySport(sport);
    }

    public List<Venue> getVenuesByOwnerId(Long ownerId) {
        return venueRepository.findByOwnerId(ownerId);
    }

    public Optional<Venue> getVenueById(Long id) {
        return venueRepository.findById(id);
    }

    public Venue createVenue(Venue venue) {
        return venueRepository.save(venue);
    }

    public void verifyVenue(Long id) {
        venueRepository.findById(id).ifPresent(venue -> {
            venue.setIsVerified(true);
            venueRepository.save(venue);
        });
    }
}
