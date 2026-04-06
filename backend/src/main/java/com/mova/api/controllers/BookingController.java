package com.mova.api.controllers;

import com.mova.api.models.Booking;
import com.mova.api.models.BookingStatus;
import com.mova.api.services.BookingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/bookings")
public class BookingController {

    @Autowired
    private BookingService bookingService;

    @PostMapping
    public Booking createBooking(@RequestBody Booking booking) {
        return bookingService.createBooking(booking);
    }

    @GetMapping("/user/{userId}")
    public List<Booking> getUserBookings(@PathVariable Long userId) {
        return bookingService.getClientBookings(userId);
    }

    @GetMapping("/owner/{ownerId}")
    public List<Booking> getOwnerBookings(@PathVariable Long ownerId) {
        return bookingService.getOwnerBookings(ownerId);
    }

    @PatchMapping("/{bookingId}/status")
    public ResponseEntity<Booking> updateStatus(@PathVariable Long bookingId, @RequestParam BookingStatus status) {
        Optional<Booking> updated = bookingService.updateBookingStatus(bookingId, status);
        return updated.map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }
}
