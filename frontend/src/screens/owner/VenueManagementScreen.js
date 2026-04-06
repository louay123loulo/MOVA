import React from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../../theme/colors';
import { borderRadius } from '../../theme/spacing';
import { mockVenues } from '../../data/mockVenues';

export default function VenueManagementScreen() {
  // Mock subset for owner
  const myVenues = mockVenues.slice(0, 2);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Mes Terrains</Text>
        <TouchableOpacity style={styles.addBtn}>
          <Ionicons name="add" size={24} color={colors.textInverse} />
        </TouchableOpacity>
      </View>

      <FlatList
        data={myVenues}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.list}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Image source={{ uri: item.image }} style={styles.image} />
            <View style={styles.info}>
              <Text style={styles.name}>{item.name}</Text>
              <Text style={styles.price}>{item.pricePerHour} TND / h</Text>
              <View style={styles.actions}>
                <TouchableOpacity style={styles.actionBtn}>
                  <Ionicons name="pencil" size={16} color={colors.primary} />
                  <Text style={styles.actionText}>Modifier</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.actionBtn}>
                  <Ionicons name="time" size={16} color={colors.secondary} />
                  <Text style={[styles.actionText, {color: colors.secondary}]}>Dispo</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 24, paddingTop: 56, marginBottom: 20 },
  title: { fontSize: 28, fontWeight: '800', color: '#fff' },
  addBtn: { width: 44, height: 44, borderRadius: 22, backgroundColor: colors.primary, alignItems: 'center', justifyContent: 'center' },
  list: { paddingHorizontal: 24, gap: 16 },
  card: { backgroundColor: colors.surface, borderRadius: 16, overflow: 'hidden', borderWidth: 1, borderColor: colors.border },
  image: { width: '100%', height: 120, backgroundColor: colors.surfaceLight },
  info: { padding: 16 },
  name: { fontSize: 18, fontWeight: '700', color: '#fff', marginBottom: 4 },
  price: { fontSize: 14, color: colors.textMuted, marginBottom: 16 },
  actions: { flexDirection: 'row', gap: 12 },
  actionBtn: { flexDirection: 'row', alignItems: 'center', paddingVertical: 8, paddingHorizontal: 16, borderRadius: 8, backgroundColor: 'rgba(255,255,255,0.05)', gap: 6 },
  actionText: { color: colors.primary, fontSize: 13, fontWeight: '600' },
});
