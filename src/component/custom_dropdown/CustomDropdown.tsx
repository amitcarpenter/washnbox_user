import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Modal, FlatList, StyleSheet } from 'react-native';
import { COLORS } from '../../constant/constant'; // Import your color constants

const CustomDropdown = ({ options, selectedValue, onSelect, label }) => {
  const [isDropdownOpen, setDropdownOpen] = useState(false);



  return (
    <View style={styles.dropdownContainer}>
      {/* Selected Value */}
      <TouchableOpacity 
        style={styles.dropdownButton} 
        onPress={() => setDropdownOpen(true)}
      >
        <Text style={styles.selectedText}>{selectedValue || label}</Text>
      </TouchableOpacity>

      {/* Dropdown Modal */}
      <Modal visible={isDropdownOpen} transparent animationType="slide">
        <TouchableOpacity 
          style={styles.overlay} 
          onPress={() => setDropdownOpen(false)}
        />
        <View style={styles.modalContent}>
          <FlatList
            data={options}
            keyExtractor={(item) => item.value}
            renderItem={({ item }) => (
              <TouchableOpacity 
                style={styles.optionItem} 
                onPress={() => {
                  onSelect(item.value);
                  setDropdownOpen(false);
                }}
              >
                <Text style={styles.optionText}>{item.label}</Text>
              </TouchableOpacity>
            )}
          />
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  dropdownContainer: {
    width: "90%",
  },
  dropdownButton: {
    backgroundColor: COLORS.white,
    borderWidth: 1,
    minHeight:50,
    borderColor: "gray",
    padding: 10,
    borderRadius: 50,
    paddingLeft:20,
    justifyContent: "center",
  },
  selectedText: {
    fontSize: 16,
    color: COLORS.black,
  },
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
  },
  modalContent: {
    backgroundColor: COLORS.white,
    marginHorizontal: 20,
    borderRadius: 8,
    paddingVertical: 10,
    maxHeight: 250,
  },
  optionItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "lightgrey",
  },
  optionText: {
    fontSize: 16,
    color: COLORS.black,
  },
});

export default CustomDropdown;
