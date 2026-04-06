import React, { useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, StatusBar } from 'react-native';
import { colors } from '../../theme/colors';
import { spacing, borderRadius } from '../../theme/spacing';
import BookingCard from '../../components/BookingCard';
import { mockBookings } from '../../data/mockBookings';

const FILTERS = ['pending', 'confirmed', 'rejected'];

export default function BookingRequestsScreen() {
  const [filter, setFilter] = useState('pending');
  const [bookings, setBookings] = useState(mockBookings);

  const filteredBookings = bookings.filter(b => b.status === filter);

  const handleAccept = (id) => {
    setBookings(prev => prev.map(b => b.id === id ? { ...b, status: 'confirmed' } : b));
  };
  
  const handleReject = (id) => {
    setBookings(prev => prev.map(b => b.id === id ? { ...b, status: 'rejected' } : b));
  };

  const getFilterLabel = (f) => {
    if(f === 'pending') return 'En attente';
    if(f === 'confirmed') return 'Confirmées';
    return 'Refusées';
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      <View style={styles.header}>
        <Text style={styles.title}>Demandes</Text>
      </View>

      <View style={styles.filterRow}>
        {FILTERS.map(f => (
          <TouchableOpacity key={f} onPress={() => setFilter(f)}
            style={[styles.filterChip, filter === f && styles.filterChipActive]}>
            <Text style={[styles.filterText, filter === f && styles.filterTextActive]}>
              {getFilterLabel(f)}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <FlatList
        data={filteredBookings}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <BookingCard 
            booking={item} 
            showActions={filter === 'pending'} 
            onAccept={handleAccept} 
            onReject={handleReject} 
          />
        )}
        ListEmptyComponent={
          <View style={styles.empty}>
            <Text style={styles.emptyText}>Aucune demande trouvée</Text>
          </View>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  header: { paddingHorizontal: 24, paddingTop: 56, marginBottom: 20 },
  title: { fontSize: 28, fontWeight: '800', color: '#fff' },
  filterRow: { flexDirection: 'row', paddingHorizontal: 24, gap: 8, marginBottom: 20 },
  filterChip: { paddingHorizontal: 16, paddingVertical: 8, borderRadius: 20, backgroundColor: colors.surface, borderWidth: 1, borderColor: colors.border },
  filterChipActive: { backgroundColor: colors.primary, borderColor: colors.primary },
  filterText: { color: colors.textMuted, fontSize: 13, fontWeight: '600' },
  filterTextActive: { color: colors.textInverse },
  list: { paddingHorizontal: 24, paddingBottom: 100 },
  empty: { alignItems: 'center', paddingVertical: 60 },
  emptyText: { color: colors.textMuted, fontSize: 15 },
});
