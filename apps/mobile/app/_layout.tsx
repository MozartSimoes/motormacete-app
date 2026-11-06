import { useEffect, useState } from 'react'
import { Stack, useRouter, useSegments } from 'expo-router'
import { StatusBar } from 'expo-status-bar'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import * as Notifications from 'expo-notifications'
import { AuthProvider, useAuth } from '../lib/auth'
import SplashScreen from '../components/SplashScreen'

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
    shouldShowBanner: true,
    shouldShowList: true,
  }),
})

function RootRedirect() {
  const { user, isLoading } = useAuth()
  const router = useRouter()
  const segments = useSegments()

  useEffect(() => {
    if (isLoading) return
    const inApp  = segments[0] === '(app)'
    const inAuth = segments[0] === '(auth)'
    if (!user && inApp) {
      router.replace('/(auth)')
    } else if (user && (inAuth || (!inApp && !inAuth))) {
      router.replace('/(app)')
    }
  }, [user, isLoading, segments])

  return null
}

export default function RootLayout() {
  const [splashDone, setSplashDone] = useState(false)

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <AuthProvider>
        <StatusBar style="light" />
        <RootRedirect />
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="(auth)" />
          <Stack.Screen name="(app)" />
        </Stack>
        {!splashDone && <SplashScreen onDone={() => setSplashDone(true)} />}
      </AuthProvider>
    </GestureHandlerRootView>
  )
}
