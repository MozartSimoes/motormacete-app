import { useState, useMemo } from 'react'
import {
  View, Text, TouchableOpacity, Modal, FlatList, TextInput,
  StyleSheet, SafeAreaView, StatusBar,
} from 'react-native'

export interface PickerItem { code: string; name: string }

interface Props {
  label: string
  placeholder: string
  items: PickerItem[]
  value: PickerItem | null
  onChange: (item: PickerItem) => void
  disabled?: boolean
  searchable?: boolean
}

export default function PickerModal({ label, placeholder, items, value, onChange, disabled, searchable = true }: Props) {
  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState('')

  const filtered = useMemo(() => {
    if (!query.trim()) return items
    return items.filter((i) => i.name.toLowerCase().includes(query.toLowerCase()))
  }, [items, query])

  function select(item: PickerItem) {
    onChange(item)
    setOpen(false)
    setQuery('')
  }

  return (
    <>
      <View style={s.wrapper}>
        <Text style={s.label}>{label}</Text>
        <TouchableOpacity
          style={[s.trigger, disabled && s.triggerDisabled, value && s.triggerSelected]}
          onPress={() => !disabled && setOpen(true)}
          activeOpacity={disabled ? 1 : 0.7}
        >
          <Text style={[s.triggerText, value && s.triggerTextSelected, disabled && s.triggerTextDisabled]} numberOfLines={1}>
            {value ? value.name : placeholder}
          </Text>
          <Text style={[s.arrow, disabled && s.arrowDisabled]}>▾</Text>
        </TouchableOpacity>
      </View>

      <Modal visible={open} animationType="slide" onRequestClose={() => { setOpen(false); setQuery('') }}>
        <SafeAreaView style={s.modal}>
          <View style={s.modalHeader}>
            <Text style={s.modalTitle}>{label}</Text>
            <TouchableOpacity onPress={() => { setOpen(false); setQuery('') }} style={s.closeBtn}>
              <Text style={s.closeText}>✕</Text>
            </TouchableOpacity>
          </View>

          {searchable && (
            <View style={s.searchRow}>
              <TextInput
                style={s.searchInput}
                placeholder={`Buscar ${label.toLowerCase()}...`}
                placeholderTextColor="#444"
                value={query}
                onChangeText={setQuery}
                autoCorrect={false}
                clearButtonMode="while-editing"
              />
            </View>
          )}

          <FlatList
            data={filtered}
            keyExtractor={(item) => item.code}
            contentContainerStyle={s.list}
            ItemSeparatorComponent={() => <View style={s.sep} />}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={[s.item, value?.code === item.code && s.itemSelected]}
                onPress={() => select(item)}
              >
                <Text style={[s.itemText, value?.code === item.code && s.itemTextSelected]}>
                  {item.name}
                </Text>
                {value?.code === item.code && <Text style={s.check}>✓</Text>}
              </TouchableOpacity>
            )}
            ListEmptyComponent={
              <View style={s.empty}>
                <Text style={s.emptyText}>Nenhum resultado para "{query}"</Text>
              </View>
            }
          />
        </SafeAreaView>
      </Modal>
    </>
  )
}

const s = StyleSheet.create({
  wrapper: { marginBottom: 12 },
  label: { fontSize: 11, fontWeight: '700', color: '#555', letterSpacing: 1, textTransform: 'uppercase', marginBottom: 6 },
  trigger: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
    backgroundColor: '#141416', borderRadius: 10, borderWidth: 1, borderColor: '#3a3a3e',
    paddingHorizontal: 14, paddingVertical: 14,
  },
  triggerDisabled: { opacity: 0.4, borderColor: '#2a2a2e' },
  triggerSelected: { borderColor: '#ff6600' },
  triggerText: { flex: 1, color: '#9a9a9a', fontSize: 15 },
  triggerTextSelected: { color: '#f0ede8', fontWeight: '500' },
  triggerTextDisabled: { color: '#333' },
  arrow: { color: '#9a9a9a', fontSize: 16, marginLeft: 8 },
  arrowDisabled: { color: '#333' },
  // Modal
  modal: { flex: 1, backgroundColor: '#0e0e0f' },
  modalHeader: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', padding: 16, borderBottomWidth: 1, borderBottomColor: '#1a1a1c' },
  modalTitle: { fontSize: 17, fontWeight: '700', color: '#f0ede8' },
  closeBtn: { padding: 4 },
  closeText: { color: '#666', fontSize: 18 },
  searchRow: { padding: 12 },
  searchInput: { backgroundColor: '#141416', borderRadius: 10, borderWidth: 1, borderColor: '#2a2a2e', padding: 12, color: '#f0ede8', fontSize: 15 },
  list: { paddingHorizontal: 12, paddingBottom: 32 },
  sep: { height: 1, backgroundColor: '#141416' },
  item: { paddingVertical: 14, paddingHorizontal: 12, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', borderRadius: 8 },
  itemSelected: { backgroundColor: 'rgba(255,102,0,0.08)' },
  itemText: { fontSize: 15, color: '#ccc', flex: 1 },
  itemTextSelected: { color: '#ff6600', fontWeight: '600' },
  check: { color: '#ff6600', fontSize: 16, marginLeft: 8 },
  empty: { paddingVertical: 32, alignItems: 'center' },
  emptyText: { color: '#555', fontSize: 14 },
})
