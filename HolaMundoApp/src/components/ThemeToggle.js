import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { useTheme } from '../context/ThemeContext';

const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <TouchableOpacity
      onPress={toggleTheme}
      style={[styles.button, { backgroundColor: theme.toggleBg, borderColor: theme.border }]}
      activeOpacity={0.85}
    >
      <Text style={[styles.label, { color: theme.text }]}>
        {theme.toggleLabel}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 50,
    borderWidth: 1.5,
  },
  label: { fontSize: 14, fontWeight: '600' },
});

export default ThemeToggle;