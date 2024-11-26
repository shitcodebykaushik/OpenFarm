import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert,
  ActivityIndicator,
} from 'react-native';

const BASE_URL = 'http://10.0.2.2:8080/api'; // Update with the correct API URL

const colors = {
  background: '#ffffff',
  primary: '#4285F4',
  secondary: '#34A853',
  danger: '#EA4335',
  textPrimary: '#202124',
  textSecondary: '#5F6368',
  inputBackground: '#F1F3F4',
  border: '#E0E0E0',
};

const EscrowScreen = () => {
  const [payer, setPayer] = useState('');
  const [payee, setPayee] = useState('');
  const [amount, setAmount] = useState('');
  const [loading, setLoading] = useState(false);
  const [approveLoading, setApproveLoading] = useState({ payer: false, payee: false });
  const [cancelLoading, setCancelLoading] = useState(false);

  // Function to create escrow
  const createEscrow = async () => {
    if (!payer || !payee || !amount) {
      Alert.alert('Missing Information', 'Please fill out all fields.');
      return;
    }
    setLoading(true);
    try {
      const response = await fetch(`${BASE_URL}/create`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ payer_id: payer, payee_id: payee, amount: parseFloat(amount) }),
      });
      const data = await response.json();
      response.ok
        ? Alert.alert('Success', data.message || 'Escrow created successfully.')
        : Alert.alert('Error', data.error || 'Failed to create escrow.');
    } catch (error) {
      Alert.alert('Error', 'Failed to connect to the server.');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  // Function to approve escrow
  const approveEscrow = async (role) => {
    setApproveLoading({ ...approveLoading, [role]: true });
    try {
      const response = await fetch(`${BASE_URL}/approve/${role}`, {
        method: 'POST',
      });
      const data = await response.json();
      response.ok
        ? Alert.alert('Approval', data.message || `Escrow approved as ${role}.`)
        : Alert.alert('Error', data.error || `Failed to approve escrow as ${role}.`);
    } catch (error) {
      Alert.alert('Error', 'Failed to connect to the server.');
      console.error(error);
    } finally {
      setApproveLoading({ ...approveLoading, [role]: false });
    }
  };

  // Function to cancel escrow
  const cancelEscrow = async () => {
    setCancelLoading(true);
    try {
      const response = await fetch(`${BASE_URL}/cancel`, { method: 'POST' });
      const data = await response.json();
      response.ok
        ? Alert.alert('Cancellation', data.message || 'Escrow canceled successfully.')
        : Alert.alert('Error', data.error || 'Failed to cancel escrow.');
    } catch (error) {
      Alert.alert('Error', 'Failed to connect to the server.');
      console.error(error);
    } finally {
      setCancelLoading(false);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Escrow Transaction</Text>
      <Text style={styles.subtitle}>Enter details to create an escrow transaction</Text>
      <View style={styles.card}>
        <InputField label="Payer's ID" value={payer} onChangeText={setPayer} />
        <InputField label="Payee's ID" value={payee} onChangeText={setPayee} />
        <InputField label="Amount" value={amount} onChangeText={setAmount} keyboardType="numeric" />

        <ActionButton title="Create Escrow" onPress={createEscrow} loading={loading} style={styles.submitButton} />
        <ActionButton title="Approve as Payer" onPress={() => approveEscrow('payer')} loading={approveLoading.payer} style={styles.approveButton} />
        <ActionButton title="Approve as Payee" onPress={() => approveEscrow('payee')} loading={approveLoading.payee} style={styles.approveButton} />
        <ActionButton title="Cancel Escrow" onPress={cancelEscrow} loading={cancelLoading} style={styles.cancelButton} />
      </View>
    </ScrollView>
  );
};

const InputField = ({ label, value, onChangeText, keyboardType = 'default' }) => (
  <View style={styles.inputContainer}>
    <Text style={styles.label}>{label}</Text>
    <TextInput
      style={styles.input}
      placeholder={`Enter ${label.toLowerCase()}`}
      placeholderTextColor={colors.textSecondary}
      value={value}
      onChangeText={onChangeText}
      keyboardType={keyboardType}
    />
  </View>
);

const ActionButton = ({ title, onPress, loading, style }) => (
  <TouchableOpacity style={style} onPress={onPress} disabled={loading}>
    {loading ? <ActivityIndicator size="small" color="#fff" /> : <Text style={styles.buttonText}>{title}</Text>}
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: colors.background,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: colors.textPrimary,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: colors.textSecondary,
    marginBottom: 16,
  },
  card: {
    backgroundColor: colors.background,
    borderRadius: 15,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 3,
  },
  inputContainer: { marginBottom: 15 },
  label: {
    fontSize: 14,
    color: colors.textPrimary,
    fontWeight: '600',
    marginBottom: 4,
  },
  input: {
    backgroundColor: colors.inputBackground,
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 10,
    fontSize: 16,
    color: colors.textPrimary,
    borderWidth: 1,
    borderColor: colors.border,
  },
  submitButton: {
    borderRadius: 25,
    paddingVertical: 12,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.primary,
    marginTop: 12,
  },
  approveButton: {
    borderRadius: 25,
    paddingVertical: 12,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.secondary,
    marginTop: 12,
  },
  cancelButton: {
    borderRadius: 25,
    paddingVertical: 12,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.danger,
    marginTop: 12,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default EscrowScreen;
