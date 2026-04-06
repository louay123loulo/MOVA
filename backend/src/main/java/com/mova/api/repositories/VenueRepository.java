package com.mova.api.repositories;

import com.mova.api.models.Venue;
import com.mova.api.models.SportType;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface VenueRepository extends JpaRepository<Venue, Long> {
    List<Venue> findBySport(SportType sport);
    List<Venue> findByOwnerId(Long ownerId);
}
