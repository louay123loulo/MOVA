import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { colors } from '../../theme/colors';
import { spacing, borderRadius } from '../../theme/spacing';
import Button from '../../components/Button';
import Card from '../../components/Card';

const PAYMENT_METHODS = [
  { id: 'flouci', name: 'Flouci', icon: 'wallet', color: '#FF6B35', desc: 'Paiement mobile' },
  { id: 'd17', name: 'D17', icon: 'phone-portrait', color: '#2196F3', desc: 'Paiement via D17' },
  { id: 'cash', name: 'Cash', icon: 'cash', color: '#4CAF50', desc: 'Sur place' },
];

export default function BookingScreen({ route, navigation }) {
  const { venue, date, slot } = route.params;
  const [selectedPayment, setSelectedPayment] = useState('flouci');
  const [loading, setLoading] = useState(false);
  const sportColor = venue.sport === 'football' ? colors.football : colors.padel;

  const handleConfirm = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      Alert.alert('✅ Demande envoyée !',
        'Votre réservation a été envoyée. Confirmation sous peu.',
        [{ text: 'Mes réservations', onPress: () => navigation.navigate('ClientTabs', { screen: 'MyBookings' }) }]
      );
    }, 1500);
  };

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scroll}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
            <Ionicons name="arrow-back" size={24} color={colors.textPrimary} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Confirmer la réservation</Text>
          <View style={{ width: 44 }} />
        </View>

        <Card variant="highlighted" style={styles.summaryCard}>
          <View style={styles.row}>
            <View style={[styles.sportIcon, { backgroundColor: sportColor }]}>
              <Ionicons name={venue.sport === 'football' ? 'football' : 'tennisball'} size={20} color="#0A0E21" />
            </View>
            <View style={{ flex: 1, marginLeft: 12 }}>
              <Text style={styles.venue}>{venue.name}</Text>
              <Text style={styles.addr}>{venue.address}</Text>
            </View>
          </View>
          <View style={styles.divider} />
          <View style={styles.row}>
            <View style={styles.detail}>
              <Ionicons name="calendar" size={18} color={colors.primary} />
              <View><Text style={styles.lbl}>Date</Text><Text style={styles.val}>{date.day} {date.date} {date.month}</Text></View>
            </View>
            <View style={styles.detail}>
              <Ionicons name="time" size={18} color={colors.secondary} />
              <View><Text style={styles.lbl}>Créneau</Text><Text style={styles.val}>{slot.time}-{slot.endTime}</Text></View>
            </View>
          </View>
        </Card>

        <Text style={styles.secTitle}>Mode de paiement</Text>
        {PAYMENT_METHODS.map((pm) => {
          const active = selectedPayment === pm.id;
          return (
            <TouchableOpacity key={pm.id} onPress={() => setSelectedPayment(pm.id)} activeOpacity={0.7}
              style={[styles.pmOpt, active && styles.pmOptActive]}>
              <View style={[styles.pmIcon, { backgroundColor: pm.color + '20' }]}>
                <Ionicons name={pm.icon} size={22} color={pm.color} />
              </View>
              <View style={{ flex: 1, marginLeft: 12 }}>
                <Text style={styles.pmName}>{pm.name}</Text>
                <Text style={styles.pmDesc}>{pm.desc}</Text>
              </View>
              <View style={[styles.radio, active && styles.radioOn]}>{active && <View style={styles.dot} />}</View>
            </TouchableOpacity>
          );
        })}

        <Text style={[styles.secTitle, { marginTop: 24 }]}>Détail du prix</Text>
        <Card>
          <View style={styles.pRow}><Text style={styles.pLbl}>Réservation (1h)</Text><Text style={styles.pVal}>{slot.price} TND</Text></View>
          <View style={styles.pRow}><Text style={styles.pLbl}>Frais de service</Text><Text style={[styles.pVal, { color: colors.primary }]}>Gratuit</Text></View>
          <View style={styles.divider} />
          <View style={styles.pRow}><Text style={[styles.pLbl, { fontWeight: '700', color: '#fff' }]}>Total</Text><Text style={[styles.pVal, { fontSize: 20, color: colors.primary }]}>{slot.price} TND</Text></View>
        </Card>
      </ScrollView>

      <View style={styles.bottom}>
        <Button title="Confirmer la réservation" onPress={handleConfirm} loading={loading}
          icon={<Ionicons name="checkmark-circle" size={20} color="#0A0E21" />} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  scroll: { paddingHorizontal: 24, paddingTop: 56, paddingBottom: 32 },
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 24 },
  backBtn: { width: 44, height: 44, borderRadius: 22, backgroundColor: colors.surface, alignItems: 'center', justifyContent: 'center' },
  headerTitle: { fontSize: 18, fontWeight: '700', color: '#fff' },
  summaryCard: { marginBottom: 24 },
  row: { flexDirection: 'row', alignItems: 'center', gap: 16 },
  sportIcon: { width: 44, height: 44, borderRadius: 14, alignItems: 'center', justifyContent: 'center' },
  venue: { fontSize: 17, fontWeight: '700', color: '#fff' },
  addr: { fontSize: 13, color: colors.textMuted, marginTop: 2 },
  divider: { height: 1, backgroundColor: colors.border, marginVertical: 14 },
  detail: { flex: 1, flexDirection: 'row', alignItems: 'center', gap: 10 },
  lbl: { fontSize: 11, color: colors.textMuted, fontWeight: '600', textTransform: 'uppercase' },
  val: { fontSize: 14, color: '#fff', fontWeight: '700', marginTop: 1 },
  secTitle: { fontSize: 17, fontWeight: '700', color: '#fff', marginBottom: 12 },
  pmOpt: { flexDirection: 'row', alignItems: 'center', backgroundColor: colors.surface, borderRadius: 14, padding: 16, marginBottom: 8, borderWidth: 1.5, borderColor: colors.border },
  pmOptActive: { borderColor: colors.primary, backgroundColor: colors.primaryMuted },
  pmIcon: { width: 44, height: 44, borderRadius: 12, alignItems: 'center', justifyContent: 'center' },
  pmName: { fontSize: 15, fontWeight: '700', color: '#fff' },
  pmDesc: { fontSize: 12, color: colors.textMuted, marginTop: 2 },
  radio: { width: 22, height: 22, borderRadius: 11, borderWidth: 2, borderColor: colors.textMuted, alignItems: 'center', justifyContent: 'center' },
  radioOn: { borderColor: colors.primary },
  dot: { width: 12, height: 12, borderRadius: 6, backgroundColor: colors.primary },
  pRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 },
  pLbl: { fontSize: 14, color: colors.textSecondary },
  pVal: { fontSize: 14, color: '#fff', fontWeight: '600' },
  bottom: { paddingHorizontal: 24, paddingVertical: 16, paddingBottom: 32, backgroundColor: colors.backgroundLight, borderTopWidth: 1, borderTopColor: colors.border },
});
