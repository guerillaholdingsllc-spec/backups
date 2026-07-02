import React from 'react';
import { Pressable, Text, View } from 'react-native';

const steps = ['Verify ID band photo', 'PPE check', 'Transfer to cot', 'Facility departure signature'];

export function OnSceneChecklist() {
  return (
    <View style={{ flex: 1, backgroundColor: '#0D0F12', padding: 16 }}>
      <Text style={{ color: '#FFFFFF', fontSize: 20, fontWeight: '700' }}>On Scene Checklist</Text>
      {steps.map((step, index) => (
        <View key={step} style={{ minHeight: 56, borderBottomWidth: 1, borderBottomColor: '#28303A', justifyContent: 'center' }}>
          <Text style={{ color: '#FFFFFF' }}>{index + 1}. {step}</Text>
          <Text style={{ color: '#98A2B3', fontSize: 12 }}>Required for custody record</Text>
        </View>
      ))}
      <Pressable style={{ marginTop: 'auto', backgroundColor: '#2BB673', padding: 16, borderRadius: 8 }}>
        <Text style={{ color: '#FFFFFF', textAlign: 'center', fontWeight: '700' }}>NEXT</Text>
      </Pressable>
    </View>
  );
}

