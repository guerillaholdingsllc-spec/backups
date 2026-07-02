import React from 'react';
import { FlatList, Pressable, Text, View } from 'react-native';
import { Offer } from '@callux/types';

const offers: Offer[] = [
  { offerId: '1', callId: 'c1', callType: 'STANDARD', driverPay: 129, companyShare: 250, distanceKm: 7.2, driverEligible: true, ttlSeconds: 118, market: 'SACRAMENTO' },
  { offerId: '2', callId: 'c2', callType: 'TRAUMA', driverPay: 227, companyShare: 420, distanceKm: 8.4, driverEligible: false, requiredCertName: 'Trauma Specialist', certPrice: 399, deltaPerCall: 70, ttlSeconds: 120, market: 'SACRAMENTO' }
];

export function HomeFeed() {
  return (
    <View style={{ flex: 1, backgroundColor: '#0D0F12', padding: 16 }}>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 16 }}>
        <Text style={{ color: '#FFFFFF', fontSize: 20, fontWeight: '700' }}>Live Dispatch</Text>
        <Text style={{ color: '#2BB673' }}>ONLINE</Text>
      </View>
      <FlatList
        data={offers}
        keyExtractor={(item) => item.offerId}
        renderItem={({ item }) => (
          <View style={{ backgroundColor: '#141820', borderRadius: 12, padding: 16, marginBottom: 12 }}>
            <Text style={{ color: '#FFFFFF', fontSize: 16, fontWeight: '700' }}>
              {!item.driverEligible ? 'Locked: ' : ''}{item.callType}
            </Text>
            <Text style={{ color: '#98A2B3', marginTop: 6 }}>{item.distanceKm} km away - ${item.driverPay}</Text>
            {item.driverEligible ? (
              <View style={{ flexDirection: 'row', gap: 8, marginTop: 12 }}>
                <Pressable style={{ backgroundColor: '#2BB673', padding: 12, borderRadius: 8 }}><Text style={{ color: '#FFFFFF' }}>ACCEPT</Text></Pressable>
                <Pressable style={{ backgroundColor: '#B22222', padding: 12, borderRadius: 8 }}><Text style={{ color: '#FFFFFF' }}>DECLINE</Text></Pressable>
              </View>
            ) : (
              <Pressable style={{ backgroundColor: '#26313A', padding: 12, borderRadius: 8, marginTop: 12 }}>
                <Text style={{ color: '#9BD7FF' }}>Unlock {item.requiredCertName} (${item.certPrice}) -&gt; +${item.deltaPerCall}/call</Text>
              </Pressable>
            )}
          </View>
        )}
      />
    </View>
  );
}
