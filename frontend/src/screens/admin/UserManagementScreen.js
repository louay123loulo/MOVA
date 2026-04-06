import React from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../../theme/colors';
import { mockUsers } from '../../data/mockUsers';

export default function UserManagementScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Utilisateurs</Text>
      </View>

      <FlatList
        data={mockUsers}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.list}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <View style={styles.avatar}>
              <Text style={styles.avatarText}>{item.name.charAt(0)}</Text>
            </View>
            <View style={styles.info}>
              <View style={styles.nameRow}>
                <Text style={styles.name}>{item.name}</Text>
                <View style={[styles.badge, { backgroundColor: item.role === 'client' ? 'rgba(68,138,255,0.15)' : 'rgba(0,230,118,0.15)' }]}>
                  <Text style={[styles.badgeText, { color: item.role === 'client' ? colors.secondary : colors.primary }]}>{item.role}</Text>
                </View>
              </View>
              <Text style={styles.email}>{item.email}</Text>
            </View>
            <TouchableOpacity style={styles.moreBtn}>
              <Ionicons name="ellipsis-vertical" size={20} color={colors.textMuted} />
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  header: { paddingHorizontal: 24, paddingTop: 56, marginBottom: 20 },
  title: { fontSize: 28, fontWeight: '800', color: '#fff' },
  list: { paddingHorizontal: 24, paddingBottom: 40, gap: 12 },
  card: { flexDirection: 'row', alignItems: 'center', backgroundColor: colors.surface, padding: 16, borderRadius: 16, borderWidth: 1, borderColor: colors.border },
  avatar: { width: 48, height: 48, borderRadius: 24, backgroundColor: colors.surfaceLight, alignItems: 'center', justifyContent: 'center' },
  avatarText: { fontSize: 18, fontWeight: '800', color: colors.textPrimary },
  info: { flex: 1, marginLeft: 16 },
  nameRow: { flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 4 },
  name: { fontSize: 16, fontWeight: '700', color: '#fff' },
  badge: { paddingHorizontal: 8, paddingVertical: 4, borderRadius: 8 },
  badgeText: { fontSize: 10, fontWeight: '700', textTransform: 'uppercase' },
  email: { fontSize: 13, color: colors.textMuted },
  moreBtn: { padding: 4 },
});
