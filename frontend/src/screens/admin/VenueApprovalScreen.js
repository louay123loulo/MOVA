import React, { useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../../theme/colors';
import { mockVenues } from '../../data/mockVenues';

export default function VenueApprovalScreen() {
  const [venues, setVenues] = useState(mockVenues.filter(v => !v.isVerified));

  const handleApprove = (id) => {
    setVenues(prev => prev.filter(v => v.id !== id));
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Terrains à valider</Text>
      </View>

      <FlatList
        data={venues}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.list}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Image source={{ uri: item.image }} style={styles.image} />
            <View style={styles.info}>
              <Text style={styles.name}>{item.name}</Text>
              <Text style={styles.address}>{item.address}</Text>
              <View style={styles.actions}>
                <TouchableOpacity style={styles.rejectBtn} onPress={() => handleApprove(item.id)}>
                  <Ionicons name="close" size={18} color={colors.error} />
                  <Text style={styles.rejectText}>Refuser</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.approveBtn} onPress={() => handleApprove(item.id)}>
                  <Ionicons name="checkmark" size={18} color={colors.textInverse} />
                  <Text style={styles.approveText}>Approuver</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        )}
        ListEmptyComponent={
          <View style={styles.empty}>
            <Text style={styles.emptyText}>Aucun terrain en attente</Text>
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
  list: { paddingHorizontal: 24, gap: 16, paddingBottom: 40 },
  card: { backgroundColor: colors.surface, borderRadius: 16, overflow: 'hidden', borderWidth: 1, borderColor: colors.border },
  image: { width: '100%', height: 140, backgroundColor: colors.surfaceLight },
  info: { padding: 16 },
  name: { fontSize: 18, fontWeight: '700', color: '#fff', marginBottom: 4 },
  address: { fontSize: 13, color: colors.textMuted, marginBottom: 16 },
  actions: { flexDirection: 'row', gap: 12 },
  rejectBtn: { flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', paddingVertical: 10, borderRadius: 10, backgroundColor: 'rgba(255,82,82,0.1)', borderWidth: 1, borderColor: 'rgba(255,82,82,0.3)', gap: 6 },
  rejectText: { color: colors.error, fontWeight: '700', fontSize: 14 },
  approveBtn: { flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', paddingVertical: 10, borderRadius: 10, backgroundColor: colors.primary, gap: 6 },
  approveText: { color: colors.textInverse, fontWeight: '700', fontSize: 14 },
  empty: { alignItems: 'center', paddingVertical: 60 },
  emptyText: { color: colors.textMuted, fontSize: 15 },
});
