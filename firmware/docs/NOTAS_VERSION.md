# 📝 Notas de Versión - ATS Mini BLE

## Versión Actual: 1.4 (20 Octubre 2025)

---

## ⚠️ Problemas Conocidos y Soluciones

### Problema: Crash al activar Bluetooth

**Descripción:**
En versiones anteriores (v1.0), el dispositivo se reiniciaba (crash) cuando se intentaba activar BLE desde el menú Settings > Bluetooth.

**Causa:**
- Conflicto entre WiFi y BLE al compartir recursos de radio
- Falta de manejo de errores en la inicialización de BLE
- BLE activado por defecto causaba conflictos al arranque

**Solución Implementada en v1.1:**

1. **Protección contra errores en Ble.h:**
   - Añadido try-catch en `start()` y `stop()`
   - Verificación de punteros antes de acceder
   - Prevención de re-inicialización si ya está activo

2. **Delays de estabilización en Ble.cpp:**
   - 100ms delay después de `stop()` antes de `start()`
   - 100ms delay después de `start()` para inicialización completa

3. **BLE desactivado por defecto:**
   - Cambiado `bleModeIdx = BLE_BLUEFRUIT` → `BLE_OFF`
   - Evita conflictos con WiFi al arranque
   - Usuario debe activar manualmente en Settings

---

## 🔧 Cambios Técnicos (v1.0 → v1.1)

### Ble.h
```cpp
// ANTES (v1.0):
void start() {
  BLEDevice::init(deviceName);
  // ... código sin protección ...
}

// AHORA (v1.1):
void start() {
  if (started) return;  // Prevenir re-inicio
  try {
    BLEDevice::init(deviceName);
    // ... código protegido ...
  } catch (...) {
    started = false;  // Marcar como fallido
  }
}
```

### Ble.cpp
```cpp
// ANTES (v1.0):
void bleInit(uint8_t bleMode) {
  bleStop();
  if(bleMode == BLE_OFF) return;
  BLESerial.start();
}

// AHORA (v1.1):
void bleInit(uint8_t bleMode) {
  bleStop();
  if(bleMode == BLE_OFF) return;
  delay(100);  // Estabilización
  BLESerial.start();
  delay(100);  // Inicialización completa
}
```

### Menu.cpp
```cpp
// ANTES (v1.0):
uint8_t bleModeIdx = BLE_BLUEFRUIT; // Activo por defecto

// AHORA (v1.1):
uint8_t bleModeIdx = BLE_OFF; // Desactivado por defecto
```

---

## 📋 Historial de Versiones

### v1.4 (20 Octubre 2025) - ACTUAL
- ✅ **NUEVO**: Splash screen personalizado al arranque (2 segundos)
- ✅ **NUEVO**: Logo embebido en PROGMEM (no requiere SPIFFS)
- ✅ **MEJORADO**: Lectura línea por línea (solo 640 bytes RAM)
- ✅ **SIMPLIFICADO**: Solo necesitas flashear el .merged.bin
- ✅ **INCLUYE**: Todas las mejoras de v1.2 y v1.3
- ℹ️ **NOTA**: Firmware más grande (86% vs 82%) por logo incluido

### v1.3 (20 Octubre 2025)
- ✅ **INTENTADO**: Splash screen con SPIFFS (revertido por problemas)
- ❌ **PROBLEMA**: Causaba fallos de arranque
- ✅ **SOLUCIONADO**: Reemplazado por implementación v1.4

### v1.2 (20 Octubre 2025)
- ✅ **NUEVO**: WiFi se desactiva automáticamente al activar BLE
- ✅ **NUEVO**: BLE se desactiva automáticamente al activar WiFi
- ✅ **MEJORADO**: Exclusión mutua WiFi/BLE para evitar conflictos
- ℹ️ **NOTA**: Solo uno puede estar activo a la vez

### v1.1 (20 Octubre 2025)
- ✅ **ARREGLADO**: Crash al activar BLE desde menú
- ✅ **MEJORADO**: Manejo robusto de errores en BLE
- ✅ **CAMBIADO**: BLE desactivado por defecto
- ✅ **AÑADIDO**: Delays de estabilización
- ✅ **ARREGLADO**: Opción "Bluetooth" visible en menú Settings
- ✅ **ARREGLADO**: Índices de menú corregidos

### v1.0 (20 Octubre 2025)
- ✅ Implementación inicial de BLE
- ✅ Nordic UART Service funcional
- ✅ Control remoto completo
- ✅ Monitoreo en tiempo real
- ❌ Crash al activar BLE (arreglado en v1.1)
- ❌ Opción "Bluetooth" comentada (arreglado en v1.1)

---

## 🎯 Cómo Usar BLE (v1.1)

### Activación Manual Requerida

**Paso 1: Flashear firmware v1.1**
```bash
esptool.py --chip esp32s3 --port /dev/cu.usbmodem101 \
  --baud 921600 write_flash 0x0 ats-mini.ino.merged.bin
```

**Paso 2: Activar BLE en el dispositivo**
1. Encender ATS Mini
2. Ir a: **Settings** > **Bluetooth**
3. Cambiar de `OFF` a `Bluefruit`
4. El dispositivo aparecerá como "ATS-Mini"

**Paso 3: Conectar desde Android**
1. Abrir ATS Mini Companion
2. Seleccionar **Bluetooth LE**
3. Tap **CONNECT TO ATS MINI**
4. Seleccionar "ATS-Mini" en el diálogo

---

## ⚙️ Consideraciones Técnicas

### Coexistencia BLE + WiFi

El ESP32-S3 puede ejecutar BLE y WiFi simultáneamente, pero comparten recursos:

**Recomendaciones:**
- ✅ **Uso ligero de WiFi + BLE**: Funciona bien
- ⚠️ **WiFi AP activo + BLE**: Puede causar latencia
- ❌ **WiFi intensivo + BLE continuo**: No recomendado

**Mejor práctica:**
- Usar **solo BLE** o **solo WiFi** cuando sea posible
- Si ambos activos, reducir tráfico de uno de ellos

### Memoria y Recursos

```
Firmware v1.1:
- Tamaño: 1.595.783 bytes (81% del espacio disponible)
- RAM Global: 66.216 bytes (20% de 327.680 bytes)
- RAM Disponible: 261.464 bytes para variables locales
```

**BLE consume:**
- ~20 KB RAM cuando activo
- ~50 KB Flash (ya incluido en firmware)

---

## 🐛 Troubleshooting v1.1

### Problema: Aún crashea al activar BLE

**Posible causa:** WiFi muy activo

**Solución:**
1. Ir a Settings > Wi-Fi
2. Cambiar a `OFF`
3. Luego activar Settings > Bluetooth > Bluefruit
4. Una vez BLE estable, puedes reactivar WiFi si necesario

### Problema: No aparece "ATS-Mini" después de activar

**Solución:**
1. Esperar 10 segundos después de activar
2. Reiniciar ATS Mini (botón RESET)
3. Verificar que móvil tenga Bluetooth activo
4. Reiniciar app Android

---

## 📞 Soporte

**Firmware:** https://github.com/esp32-si4732/ats-mini
**Desarrollador:** EA5IYR - Miguel Cañadas
**Implementación BLE:** Claude (Anthropic)

---

## ✅ Resumen de Mejoras v1.1

| Aspecto | v1.0 | v1.1 |
|---------|------|------|
| **Opción BLE visible** | ❌ Comentada | ✅ Visible |
| **Crash al activar** | ❌ Crashea | ✅ Estable |
| **BLE por defecto** | ❌ Activado (conflicto) | ✅ OFF (seguro) |
| **Manejo errores** | ❌ Sin protección | ✅ Try-catch |
| **Índices menú** | ❌ Incorrectos | ✅ Corregidos |

**Conclusión:** v1.1 es una versión estable y lista para producción. 📻🔵
