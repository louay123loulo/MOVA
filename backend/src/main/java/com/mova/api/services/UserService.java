package com.mova.api.services;

import com.mova.api.models.User;
import com.mova.api.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.Optional;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    public User createUser(User user) {
        // In a real app, hash password here using BCrypt
        return userRepository.save(user);
    }

    public Optional<User> authenticate(String phone, String password) {
        Optional<User> user = userRepository.findByPhone(phone);
        if (user.isPresent() && user.get().getPassword().equals(password)) {
            return user;
        }
        return Optional.empty();
    }

    public Optional<User> getUserById(Long id) {
        return userRepository.findById(id);
    }
}
