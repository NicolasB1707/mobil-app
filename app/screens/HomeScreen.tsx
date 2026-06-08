import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  Alert,
} from 'react-native';
import { useRouter } from 'expo-router';

const { width } = Dimensions.get('window');

const statsData = [
  { label: 'Proyectos', value: '12', icon: '📁', color: '#e94560' },
  { label: 'Tareas', value: '48', icon: '✅', color: '#0f3460' },
  { label: 'Mensajes', value: '7', icon: '💬', color: '#533483' },
  { label: 'Notif.', value: '3', icon: '🔔', color: '#e94560' },
];

const recentActivity = [
  { id: 1, title: 'Proyecto UI Redesign', desc: 'Actualizado hace 2 horas', icon: '🎨', badge: 'Activo' },
  { id: 2, title: 'App Mobile v2.0', desc: 'Actualizado hace 5 horas', icon: '📱', badge: 'En revisión' },
  { id: 3, title: 'Dashboard Analytics', desc: 'Actualizado ayer', icon: '📊', badge: 'Completado' },
  { id: 4, title: 'Backend API', desc: 'Actualizado hace 2 días', icon: '⚙️', badge: 'En revisión' },
];

const quickActions = [
  { label: 'Nuevo', icon: '➕' },
  { label: 'Buscar', icon: '🔍' },
  { label: 'Compartir', icon: '📤' },
  { label: 'Config', icon: '⚙️' },
];

const badgeColors: Record<string, string> = {
  'Activo': '#10b981',
  'En revisión': '#f59e0b',
  'Completado': '#6366f1',
};

export default function HomeScreen() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('home');

  const handleLogout = () => {
    Alert.alert(
      'Cerrar Sesión',
      '¿Estás seguro que deseas salir?',
      [
        { text: 'Cancelar', style: 'cancel' },
        { text: 'Salir', style: 'destructive', onPress: () => router.replace('/screens/LoginScreen') },
      ]
    );
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View>
          <Text style={styles.greeting}>Buenos días 👋</Text>
          <Text style={styles.userName}>Nicolás</Text>
        </View>
        <View style={styles.headerRight}>
          <TouchableOpacity style={styles.notifButton}>
            <Text style={styles.notifIcon}>🔔</Text>
            <View style={styles.notifBadge}>
              <Text style={styles.notifBadgeText}>3</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={handleLogout} style={styles.avatarButton}>
            <Text style={styles.avatarText}>NB</Text>
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Banner Card */}
        <View style={styles.bannerCard}>
          <View style={styles.bannerContent}>
            <Text style={styles.bannerLabel}>PRO PLAN</Text>
            <Text style={styles.bannerTitle}>Actualiza tu plan</Text>
            <Text style={styles.bannerSubtitle}>Desbloquea funciones ilimitadas</Text>
            <TouchableOpacity style={styles.bannerButton}>
              <Text style={styles.bannerButtonText}>Explorar →</Text>
            </TouchableOpacity>
          </View>
          <Text style={styles.bannerEmoji}>🚀</Text>
        </View>

        {/* Stats Grid */}
        <Text style={styles.sectionTitle}>Resumen</Text>
        <View style={styles.statsGrid}>
          {statsData.map((stat, index) => (
            <View key={index} style={styles.statCard}>
              <View style={[styles.statIconContainer, { backgroundColor: stat.color + '22' }]}>
                <Text style={styles.statIcon}>{stat.icon}</Text>
              </View>
              <Text style={styles.statValue}>{stat.value}</Text>
              <Text style={styles.statLabel}>{stat.label}</Text>
            </View>
          ))}
        </View>

        {/* Quick Actions */}
        <Text style={styles.sectionTitle}>Acciones rápidas</Text>
        <View style={styles.quickActionsRow}>
          {quickActions.map((action, index) => (
            <TouchableOpacity key={index} style={styles.quickActionButton} activeOpacity={0.7}>
              <Text style={styles.quickActionIcon}>{action.icon}</Text>
              <Text style={styles.quickActionLabel}>{action.label}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Recent Activity */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Actividad reciente</Text>
          <TouchableOpacity>
            <Text style={styles.seeAllText}>Ver todo</Text>
          </TouchableOpacity>
        </View>

        {recentActivity.map((item) => (
          <TouchableOpacity key={item.id} style={styles.activityCard} activeOpacity={0.7}>
            <View style={styles.activityIconContainer}>
              <Text style={styles.activityIcon}>{item.icon}</Text>
            </View>
            <View style={styles.activityInfo}>
              <Text style={styles.activityTitle}>{item.title}</Text>
              <Text style={styles.activityDesc}>{item.desc}</Text>
            </View>
            <View style={[styles.badge, { backgroundColor: (badgeColors[item.badge] || '#6366f1') + '22' }]}>
              <Text style={[styles.badgeText, { color: badgeColors[item.badge] || '#6366f1' }]}>
                {item.badge}
              </Text>
            </View>
          </TouchableOpacity>
        ))}

        <View style={{ height: 100 }} />
      </ScrollView>

      {/* Bottom Navigation */}
      <View style={styles.bottomNav}>
        {[
          { id: 'home', icon: '🏠', label: 'Inicio' },
          { id: 'search', icon: '🔍', label: 'Buscar' },
          { id: 'add', icon: '➕', label: 'Nuevo' },
          { id: 'activity', icon: '📊', label: 'Stats' },
          { id: 'profile', icon: '👤', label: 'Perfil' },
        ].map((tab) => (
          <TouchableOpacity
            key={tab.id}
            style={styles.navItem}
            onPress={() => setActiveTab(tab.id)}
            activeOpacity={0.7}
          >
            {tab.id === 'add' ? (
              <View style={styles.addButton}>
                <Text style={styles.navIcon}>{tab.icon}</Text>
              </View>
            ) : (
              <>
                <Text style={styles.navIcon}>{tab.icon}</Text>
                <Text style={[styles.navLabel, activeTab === tab.id && styles.navLabelActive]}>
                  {tab.label}
                </Text>
                {activeTab === tab.id && <View style={styles.navIndicator} />}
              </>
            )}
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1a1a2e',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingTop: 60,
    paddingBottom: 20,
  },
  greeting: {
    fontSize: 14,
    color: '#a0a9be',
  },
  userName: {
    fontSize: 26,
    fontWeight: '800',
    color: '#ffffff',
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  notifButton: {
    position: 'relative',
  },
  notifIcon: {
    fontSize: 24,
  },
  notifBadge: {
    position: 'absolute',
    top: -4,
    right: -4,
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: '#e94560',
    alignItems: 'center',
    justifyContent: 'center',
  },
  notifBadgeText: {
    color: '#fff',
    fontSize: 9,
    fontWeight: '700',
  },
  avatarButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#e94560',
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: {
    color: '#fff',
    fontWeight: '800',
    fontSize: 15,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 24,
  },
  bannerCard: {
    backgroundColor: '#0f3460',
    borderRadius: 20,
    padding: 24,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 28,
    borderWidth: 1,
    borderColor: '#1e4080',
  },
  bannerContent: {
    flex: 1,
  },
  bannerLabel: {
    fontSize: 11,
    fontWeight: '700',
    color: '#e94560',
    letterSpacing: 2,
    marginBottom: 4,
  },
  bannerTitle: {
    fontSize: 22,
    fontWeight: '800',
    color: '#ffffff',
    marginBottom: 4,
  },
  bannerSubtitle: {
    fontSize: 13,
    color: '#a0a9be',
    marginBottom: 16,
  },
  bannerButton: {
    backgroundColor: '#e94560',
    borderRadius: 10,
    paddingVertical: 8,
    paddingHorizontal: 16,
    alignSelf: 'flex-start',
  },
  bannerButtonText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 13,
  },
  bannerEmoji: {
    fontSize: 56,
    marginLeft: 8,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#ffffff',
    marginBottom: 16,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
    marginTop: 8,
  },
  seeAllText: {
    color: '#e94560',
    fontSize: 14,
    fontWeight: '600',
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    marginBottom: 28,
  },
  statCard: {
    backgroundColor: '#16213e',
    borderRadius: 16,
    padding: 16,
    width: (width - 60) / 2,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#1e4080',
  },
  statIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },
  statIcon: {
    fontSize: 22,
  },
  statValue: {
    fontSize: 28,
    fontWeight: '800',
    color: '#ffffff',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 13,
    color: '#a0a9be',
  },
  quickActionsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 28,
  },
  quickActionButton: {
    backgroundColor: '#16213e',
    borderRadius: 16,
    width: (width - 60) / 4,
    alignItems: 'center',
    paddingVertical: 14,
    borderWidth: 1,
    borderColor: '#1e4080',
  },
  quickActionIcon: {
    fontSize: 22,
    marginBottom: 6,
  },
  quickActionLabel: {
    fontSize: 11,
    color: '#a0a9be',
    fontWeight: '600',
  },
  activityCard: {
    backgroundColor: '#16213e',
    borderRadius: 16,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#1e4080',
  },
  activityIconContainer: {
    width: 46,
    height: 46,
    borderRadius: 13,
    backgroundColor: '#0f3460',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 14,
  },
  activityIcon: {
    fontSize: 22,
  },
  activityInfo: {
    flex: 1,
  },
  activityTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: '#ffffff',
    marginBottom: 3,
  },
  activityDesc: {
    fontSize: 12,
    color: '#6b7280',
  },
  badge: {
    borderRadius: 8,
    paddingVertical: 4,
    paddingHorizontal: 10,
  },
  badgeText: {
    fontSize: 11,
    fontWeight: '700',
  },
  bottomNav: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    backgroundColor: '#16213e',
    paddingBottom: 28,
    paddingTop: 12,
    paddingHorizontal: 16,
    borderTopWidth: 1,
    borderTopColor: '#1e4080',
  },
  navItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  navIcon: {
    fontSize: 22,
    marginBottom: 2,
  },
  navLabel: {
    fontSize: 10,
    color: '#6b7280',
    fontWeight: '600',
  },
  navLabelActive: {
    color: '#e94560',
  },
  navIndicator: {
    position: 'absolute',
    bottom: -12,
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: '#e94560',
  },
  addButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#e94560',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 4,
    shadowColor: '#e94560',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 8,
    elevation: 8,
  },
});
