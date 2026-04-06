package com.mova.api.repositories;

import com.mova.api.models.Booking;
import com.mova.api.models.BookingStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface BookingRepository extends JpaRepository<Booking, Long> {
    List<Booking> findByUserId(Long userId);
    List<Booking> findByVenueOwnerId(Long ownerId);
    List<Booking> findByVenueIdAndStatus(Long venueId, BookingStatus status);
}
