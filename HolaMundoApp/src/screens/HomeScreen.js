import React, { useState, useEffect } from 'react';
import {
  View, Text, ScrollView, TouchableOpacity,
  StyleSheet, Alert, ActivityIndicator,
  Keyboard, TouchableWithoutFeedback, Platform,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { StatusBar } from 'expo-status-bar';
import { useTheme } from '../context/ThemeContext';
import ThemeToggle from '../components/ThemeToggle';
import FormInput from '../components/FormInput';

const FORM_KEY = '@HolaMundoApp:formData';
const initialForm = { nombre: '', email: '', telefono: '', mensaje: '' };

const HomeScreen = () => {
  const { theme } = useTheme();
  const [form, setForm] = useState(initialForm);
  const [savedData, setSavedData] = useState(null);
  const [isSaving, setIsSaving] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [showSaved, setShowSaved] = useState(false);

  useEffect(() => {
    const loadForm = async () => {
      try {
        const raw = await AsyncStorage.getItem(FORM_KEY);
        if (raw) setSavedData(JSON.parse(raw));
      } catch (e) {
        console.warn('Error cargando formulario:', e);
      } finally {
        setIsLoading(false);
      }
    };
    loadForm();
  }, []);

  const updateField = (field) => (value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSave = async () => {
    if (!form.nombre.trim()) {
      Alert.alert('Campo requerido', 'Por favor ingresa tu nombre.');
      return;
    }
    if (!form.email.trim() || !form.email.includes('@')) {
      Alert.alert('Email invalido', 'Por favor ingresa un email valido.');
      return;
    }
    setIsSaving(true);
    Keyboard.dismiss();
    try {
      const dataToSave = { ...form, savedAt: new Date().toISOString() };
      await AsyncStorage.setItem(FORM_KEY, JSON.stringify(dataToSave));
      setSavedData(dataToSave);
      setShowSaved(true);
      setTimeout(() => setShowSaved(false), 2500);
    } catch (e) {
      Alert.alert('Error', 'No se pudo guardar la informacion.');
    } finally {
      setIsSaving(false);
    }
  };

  const handleClear = async () => {
    Alert.alert('Limpiar formulario', 'Deseas borrar todos los datos guardados?', [
      { text: 'Cancelar', style: 'cancel' },
      {
        text: 'Borrar', style: 'destructive',
        onPress: async () => {
          await AsyncStorage.removeItem(FORM_KEY);
          setForm(initialForm);
          setSavedData(null);
        },
      },
    ]);
  };

  const handleLoadSaved = () => {
    if (savedData) {
      const { savedAt, ...fields } = savedData;
      setForm({ ...initialForm, ...fields });
    }
  };

  const formatDate = (iso) => {
    if (!iso) return '';
    const d = new Date(iso);
    return d.toLocaleDateString('es-ES', {
      day: '2-digit', month: 'short', year: 'numeric',
      hour: '2-digit', minute: '2-digit',
    });
  };

  if (isLoading) {
    return (
      <View style={[styles.centered, { backgroundColor: theme.background }]}>
        <ActivityIndicator size="large" color={theme.primary} />
      </View>
    );
  }

  return (
    <TouchableWithoutFeedback>
      <View style={[styles.root, { backgroundColor: theme.background }]}>
        <StatusBar style={theme.statusBar} />
        <View style={[styles.header, { borderBottomColor: theme.border }]}>
          <View>
            <Text style={[styles.greeting, { color: theme.textMuted }]}>Primera App</Text>
            <Text style={[styles.title, { color: theme.primary }]}>Hola Mundo</Text>
          </View>
          <ThemeToggle />
        </View>
        <ScrollView contentContainerStyle={styles.scroll} keyboardShouldPersistTaps="handled">
          {savedData && (
            <TouchableOpacity
              onPress={handleLoadSaved}
              style={[styles.savedBanner, { backgroundColor: theme.card, borderColor: theme.primary }]}
            >
              <Text style={[styles.savedBannerTitle, { color: theme.primary }]}>
                Datos guardados encontrados
              </Text>
              <Text style={[styles.savedBannerSub, { color: theme.textSecondary }]}>
                Guardado: {formatDate(savedData.savedAt)} - Toca para cargar
              </Text>
            </TouchableOpacity>
          )}
          {showSaved && (
            <View style={[styles.successBadge, { backgroundColor: theme.primary }]}>
              <Text style={styles.successText}>Datos guardados en el dispositivo</Text>
            </View>
          )}
          <View style={[styles.card, { backgroundColor: theme.surface, borderColor: theme.border }]}>
            <Text style={[styles.cardTitle, { color: theme.text }]}>Formulario de Registro</Text>
            <Text style={[styles.cardSubtitle, { color: theme.textSecondary }]}>
              Tu informacion se guardara localmente en este dispositivo
            </Text>
            <View style={[styles.divider, { backgroundColor: theme.border }]} />
            <FormInput label="Nombre completo" value={form.nombre} onChangeText={updateField('nombre')} placeholder="Ej: Juan Garcia" required />
            <FormInput label="Correo electronico" value={form.email} onChangeText={updateField('email')} placeholder="ejemplo@correo.com" keyboardType="email-address" required />
            <FormInput label="Telefono" value={form.telefono} onChangeText={updateField('telefono')} placeholder="+56 9 1234 5678" keyboardType="phone-pad" />
            <FormInput label="Mensaje" value={form.mensaje} onChangeText={updateField('mensaje')} placeholder="Escribe algo aqui..." multiline />
            <TouchableOpacity
              onPress={handleSave}
              disabled={isSaving}
              style={[styles.saveBtn, { backgroundColor: theme.primary }]}
            >
              {isSaving
                ? <ActivityIndicator color="#fff" />
                : <Text style={styles.saveBtnText}>Guardar información</Text>
              }
            </TouchableOpacity>
            {savedData && (
              <TouchableOpacity onPress={handleClear} style={[styles.clearBtn, { borderColor: theme.accent }]}>
                <Text style={[styles.clearBtnText, { color: theme.accent }]}>Borrar datos guardados</Text>
              </TouchableOpacity>
            )}
          </View>
          <Text style={[styles.footer, { color: theme.textMuted }]}>
            HolaMundo App
          </Text>
        </ScrollView>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  root: { flex: 1 },
  centered: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  header: {
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
    paddingHorizontal: 20, paddingTop: Platform.OS === 'ios' ? 56 : 40,
    paddingBottom: 14, borderBottomWidth: 1,
  },
  greeting: { fontSize: 12, fontWeight: '500' },
  title: { fontSize: 26, fontWeight: '800' },
  scroll: { padding: 18, gap: 14 },
  savedBanner: { borderWidth: 1.5, borderRadius: 12, padding: 12 },
  savedBannerTitle: { fontWeight: '700', fontSize: 14 },
  savedBannerSub: { fontSize: 12, marginTop: 2 },
  successBadge: { borderRadius: 10, padding: 10, alignItems: 'center' },
  successText: { color: '#fff', fontWeight: '700', fontSize: 14 },
  card: { borderRadius: 18, padding: 20, borderWidth: 1 },
  cardTitle: { fontSize: 18, fontWeight: '800', marginBottom: 4 },
  cardSubtitle: { fontSize: 13, marginBottom: 16 },
  divider: { height: 1, marginBottom: 18 },
  saveBtn: { borderRadius: 14, paddingVertical: 14, alignItems: 'center', marginTop: 4 },
  saveBtnText: { color: '#fff', fontWeight: '800', fontSize: 15 },
  clearBtn: { borderRadius: 14, paddingVertical: 12, alignItems: 'center', marginTop: 10, borderWidth: 1.5 },
  clearBtnText: { fontWeight: '700', fontSize: 14 },
  footer: { textAlign: 'center', fontSize: 11, marginTop: 8, marginBottom: 20 },
});

export default HomeScreen;