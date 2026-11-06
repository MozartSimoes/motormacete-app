import { useEffect, useRef } from 'react'
import { View, Text, Animated, StyleSheet, Dimensions } from 'react-native'

const { width } = Dimensions.get('window')

interface Props { onDone: () => void }

export default function SplashScreen({ onDone }: Props) {
  const motorX      = useRef(new Animated.Value(-width)).current
  const maceteX     = useRef(new Animated.Value(width)).current
  const logoOpacity = useRef(new Animated.Value(0)).current
  const taglineY    = useRef(new Animated.Value(20)).current
  const taglineOp   = useRef(new Animated.Value(0)).current
  const glowScale   = useRef(new Animated.Value(0.2)).current
  const glowOpacity = useRef(new Animated.Value(0)).current
  const screenOp    = useRef(new Animated.Value(1)).current

  useEffect(() => {
    Animated.sequence([
      Animated.parallel([
        Animated.timing(glowOpacity, { toValue: 0.35, duration: 500, useNativeDriver: true }),
        Animated.spring(glowScale,   { toValue: 1, tension: 40, friction: 7, useNativeDriver: true }),
        Animated.timing(logoOpacity, { toValue: 1, duration: 400, useNativeDriver: true }),
        Animated.spring(motorX,  { toValue: 0, tension: 55, friction: 9, useNativeDriver: true }),
        Animated.spring(maceteX, { toValue: 0, tension: 55, friction: 9, useNativeDriver: true }),
      ]),
      Animated.delay(150),
      Animated.parallel([
        Animated.timing(taglineOp, { toValue: 1, duration: 400, useNativeDriver: true }),
        Animated.timing(taglineY,  { toValue: 0, duration: 400, useNativeDriver: true }),
      ]),
      Animated.delay(2500),
      Animated.timing(screenOp, { toValue: 0, duration: 450, useNativeDriver: true }),
    ]).start(() => onDone())
  }, [])

  return (
    <Animated.View style={[s.container, { opacity: screenOp }]}>
      {/* Glow ring */}
      <Animated.View style={[s.glow, { opacity: glowOpacity, transform: [{ scale: glowScale }] }]} />
      <Animated.View style={[s.glowInner, { opacity: glowOpacity, transform: [{ scale: glowScale }] }]} />

      {/* Logo */}
      <Animated.View style={[s.logoRow, { opacity: logoOpacity }]}>
        <Animated.Text style={[s.motor, { transform: [{ translateX: motorX }] }]}>
          Motor
        </Animated.Text>
        <Animated.Text style={[s.macete, { transform: [{ translateX: maceteX }] }]}>
          Macete
        </Animated.Text>
      </Animated.View>

      {/* Tagline */}
      <Animated.Text style={[s.tagline, { opacity: taglineOp, transform: [{ translateY: taglineY }] }]}>
        Os macetes que os mecânicos não contam.
      </Animated.Text>

      {/* Bottom mark */}
      <Animated.View style={[s.bottom, { opacity: taglineOp }]}>
        <View style={s.dot} />
        <View style={[s.dot, s.dotMid]} />
        <View style={s.dot} />
      </Animated.View>
    </Animated.View>
  )
}

const s = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: '#0e0e0f',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 100,
  },
  glow: {
    position: 'absolute',
    width: 260,
    height: 260,
    borderRadius: 130,
    backgroundColor: '#ff6600',
    opacity: 0.15,
  },
  glowInner: {
    position: 'absolute',
    width: 160,
    height: 160,
    borderRadius: 80,
    backgroundColor: '#ff6600',
    opacity: 0.12,
  },
  logoRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
    overflow: 'hidden',
  },
  motor: {
    fontSize: 46,
    fontWeight: '900',
    color: '#f0ede8',
    letterSpacing: -1,
  },
  macete: {
    fontSize: 46,
    fontWeight: '900',
    color: '#ff6600',
    letterSpacing: -1,
  },
  tagline: {
    marginTop: 14,
    fontSize: 14,
    color: '#aaa',
    letterSpacing: 0.3,
  },
  bottom: {
    position: 'absolute',
    bottom: 60,
    flexDirection: 'row',
    gap: 6,
    alignItems: 'center',
  },
  dot: { width: 4, height: 4, borderRadius: 2, backgroundColor: '#333' },
  dotMid: { backgroundColor: '#ff6600', width: 6, height: 6, borderRadius: 3 },
})
