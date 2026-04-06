package com.mova.api.services;

import com.mova.api.models.Booking;
import com.mova.api.models.BookingStatus;
import com.mova.api.repositories.BookingRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service
public class BookingService {

    @Autowired
    private BookingRepository bookingRepository;

    public Booking createBooking(Booking booking) {
        booking.setStatus(BookingStatus.PENDING);
        return bookingRepository.save(booking);
    }

    public List<Booking> getClientBookings(Long userId) {
        return bookingRepository.findByUserId(userId);
    }

    public List<Booking> getOwnerBookings(Long ownerId) {
        return bookingRepository.findByVenueOwnerId(ownerId);
    }

    public Optional<Booking> updateBookingStatus(Long bookingId, BookingStatus newStatus) {
        Optional<Booking> bookingOpt = bookingRepository.findById(bookingId);
        if (bookingOpt.isPresent()) {
            Booking b = bookingOpt.get();
            b.setStatus(newStatus);
            return Optional.of(bookingRepository.save(b));
        }
        return Optional.empty();
    }
}
