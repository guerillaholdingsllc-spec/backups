import React from 'react';
import { Pressable, Text, TextInput, View } from 'react-native';

export function PodCapture() {
  return (
    <View style={{ flex: 1, backgroundColor: '#0D0F12', padding: 16 }}>
      <Text style={{ color: '#FFFFFF', fontSize: 20, fontWeight: '700' }}>POD Capture</Text>
      <Text style={{ color: '#9BD7FF', marginTop: 8 }}>Tamper-evident hash will be generated on upload</Text>
      <View style={{ flexDirection: 'row', gap: 8, marginVertical: 16 }}>
        {[1, 2, 3].map((slot) => <View key={slot} style={{ flex: 1, aspectRatio: 1, backgroundColor: '#141820', borderRadius: 8, borderWidth: 1, borderColor: '#28303A' }} />)}
      </View>
      <View style={{ height: 140, backgroundColor: '#FFFFFF', borderRadius: 8, marginBottom: 16 }} />
      <TextInput placeholder="Notes" placeholderTextColor="#98A2B3" style={{ minHeight: 92, color: '#FFFFFF', backgroundColor: '#141820', borderRadius: 8, padding: 12 }} />
      <Pressable style={{ marginTop: 'auto', backgroundColor: '#2BB673', padding: 16, borderRadius: 8 }}>
        <Text style={{ color: '#FFFFFF', textAlign: 'center', fontWeight: '700' }}>SUBMIT POD</Text>
      </Pressable>
    </View>
  );
}

