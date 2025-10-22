# 📲 Instrucciones de Flasheo e Instalación

## 🎯 Archivos Incluidos

Este paquete contiene todo lo necesario para usar Bluetooth en tu ATS Mini:

### Firmware (elige una opción):

**Opción A - Archivo único (más fácil):**
1. **ats-mini.ino.merged.bin** - Todo en uno (16MB)

**Opción B - Archivos separados (más control):**
1. **ats-mini.ino.bootloader.bin** - Bootloader (20KB) → flashear en 0x0
2. **ats-mini.ino.partitions.bin** - Tabla de particiones (3KB) → flashear en 0x8000
3. **ats-mini.ino.bin** - Firmware principal (1.5MB) → flashear en 0x10000

### Aplicación:
4. **ATS-Mini-Companion-BLE.apk** - App Android con USB Serial + Bluetooth

### Documentación:
5. **BLUETOOTH_IMPLEMENTATION.md** - Documentación técnica completa
6. **INSTRUCCIONES_FLASHEO.md** - Este archivo
7. **README.md** - Inicio rápido

---

## 🔧 PARTE 1: Flashear el Firmware en ATS Mini

### Hardware Necesitado:
- Tu ESP32-S3-WROOM-1-N16R8 (ATS Mini)
- Cable USB-C (para flashear)
- Computadora Mac/Windows/Linux

### Opción A: Usando esptool.py (Recomendado)

#### 1. Instalar esptool:
```bash
pip install esptool
```

#### 2. Conectar el ESP32-S3 en modo bootloader:
- Conecta el cable USB
- Mantén presionado el botón BOOT
- Presiona y suelta RESET
- Suelta BOOT

#### 3. Identificar el puerto serial:

**En Mac:**
```bash
ls /dev/cu.usbmodem*
# Ejemplo: /dev/cu.usbmodem101
```

**En Linux:**
```bash
ls /dev/ttyUSB*
# Ejemplo: /dev/ttyUSB0
```

**En Windows:**
- Abrir "Administrador de Dispositivos"
- Buscar "Puertos (COM y LPT)"
- Ejemplo: COM3

#### 4. Flashear el firmware:

**Método 1: Archivo único (⭐ RECOMENDADO - incluye splash screen)**

*Mac/Linux:*
```bash
esptool.py --chip esp32s3 --port /dev/cu.usbmodem101 \
  --baud 921600 write_flash 0x0 ats-mini.ino.merged.bin
```

*Windows:*
```bash
esptool.py --chip esp32s3 --port COM3 \
  --baud 921600 write_flash 0x0 ats-mini.ino.merged.bin
```

✨ **Nuevo en v1.4:** El logo personalizado está embebido en el firmware. No necesitas flashear archivos adicionales.

**Método 2: Archivos separados (más control)**

*Mac/Linux:*
```bash
esptool.py --chip esp32s3 --port /dev/cu.usbmodem101 \
  --baud 921600 write_flash \
  0x0 ats-mini.ino.bootloader.bin \
  0x8000 ats-mini.ino.partitions.bin \
  0x10000 ats-mini.ino.bin
```

*Windows:*
```bash
esptool.py --chip esp32s3 --port COM3 \
  --baud 921600 write_flash \
  0x0 ats-mini.ino.bootloader.bin \
  0x8000 ats-mini.ino.partitions.bin \
  0x10000 ats-mini.ino.bin
```

#### 5. Reiniciar:
- Presiona el botón RESET en el ESP32
- Debe arrancar normalmente

### Opción B: Usando Arduino IDE

1. Abrir Arduino IDE
2. Tools > Board > ESP32 Arduino > ESP32S3 Dev Module
3. Configurar:
   - Flash Size: 16MB
   - PSRAM: QSPI PSRAM
   - Partition Scheme: Minimal SPIFFS
   - Upload Speed: 921600
4. Tools > Port > Seleccionar tu puerto
5. Sketch > Upload using Programmer

### Opción C: Usando ESP Flash Download Tool (Windows)

1. Descargar de: https://www.espressif.com/en/support/download/other-tools
2. Seleccionar ESP32-S3
3. Añadir el archivo .bin en dirección 0x0
4. Click START

---

## 📱 PARTE 2: Instalar la Aplicación Android

### Requisitos:
- Android 7.0 o superior
- Soporte Bluetooth LE
- 50 MB de espacio libre

### Instalación:

1. **Habilitar instalación desde fuentes desconocidas:**
   - Configuración > Seguridad
   - Activar "Fuentes desconocidas" o "Instalar apps desconocidas"

2. **Transferir el APK:**
   - Copiar `ATS-Mini-Companion-BLE.apk` a tu teléfono
   - Por cable USB, correo, o descarga directa

3. **Instalar:**
   - Abrir el archivo APK en el teléfono
   - Tap "Instalar"
   - Tap "Abrir" cuando termine

4. **Otorgar permisos:**
   - La primera vez pedirá permisos de Bluetooth
   - Tap "Permitir" para todos los permisos

---

## 🚀 PARTE 3: Usar Bluetooth

### Paso 1: Activar BLE en el ATS Mini

1. Encender el ATS Mini (debe tener el firmware nuevo flasheado)
2. Navegar en el menú del dispositivo:
   - **Settings** > **Bluetooth**
3. Cambiar de `OFF` a `Bluefruit`
4. El dispositivo ahora es visible como **"ATS-Mini"** vía Bluetooth

⚠️ **Importante**:
- BLE está desactivado por defecto para evitar conflictos
- **WiFi se desactiva automáticamente** al activar BLE
- Solo uno puede estar activo a la vez (BLE o WiFi)

### Paso 2: Conectar desde la App

1. Abrir **ATS Mini Companion** en Android
2. Tap en tab **CONNECT**
3. Seleccionar **Connection Type: Bluetooth LE**
4. Tap **CONNECT TO ATS MINI**
5. Aparecerá diálogo de selección:
   - Buscar "ATS-Mini" en la lista
   - Seleccionar y tap **Emparejar**
6. ✅ ¡Conectado!

La pantalla mostrará "Connected • Last update: [hora]"

### Paso 3: Probar Funcionalidades

Una vez conectado, ir al tab **RADIO** y probar:

- ✅ **VFO +/-**: Cambiar frecuencia
- ✅ **BAND**: Cambiar banda (FM, MW, SW)
- ✅ **MODE**: Cambiar modo (AM, FM, USB, LSB)
- ✅ **VOLUME +/-**: Controlar volumen
- ✅ **Display**: Ver RSSI, SNR, voltaje en tiempo real

---

## 🔧 Solución de Problemas

### ❌ No puedo flashear el firmware

**Problema:** esptool no encuentra el puerto
```
Solución:
1. Verificar que el driver USB esté instalado
2. Probar otro cable USB-C
3. Asegurar que está en modo bootloader (BOOT + RESET)
4. En Mac: instalar drivers con: brew install --cask silicon-labs-vcp-driver
```

**Problema:** Error "A fatal error occurred: MD5 of file does not match data in flash"
```
Solución:
1. Borrar flash primero:
   esptool.py --chip esp32s3 --port <puerto> erase_flash
2. Volver a flashear
```

### ❌ No aparece "ATS-Mini" en el escaneo BLE

**Problema:** El dispositivo no es visible
```
Solución:
1. Verificar que BLE está activado: Settings > Bluetooth > Bluefruit
2. Reiniciar el ATS Mini (botón RESET)
3. Acercarse a menos de 2 metros
4. Verificar que Bluetooth está activo en el teléfono
5. Cerrar y reabrir la app Android
```

**Problema:** El dispositivo aparece pero no se conecta
```
Solución:
1. Ir a Configuración Android > Bluetooth
2. Olvidar dispositivo "ATS-Mini" si aparece emparejado
3. Reiniciar Bluetooth en el teléfono
4. Reiniciar ATS Mini
5. Intentar conectar nuevamente desde la app
```

### ❌ Conexión se desconecta frecuentemente

**Problema:** Conexión inestable
```
Solución:
1. Reducir distancia a menos de 5 metros
2. Eliminar obstáculos metálicos entre dispositivos
3. Verificar batería del ATS Mini (> 3.5V)
4. Cerrar otras apps Bluetooth
5. Verificar que no hay interferencia WiFi
```

### ❌ Los comandos no responden

**Problema:** Botones no hacen nada
```
Solución:
1. Verificar indicador verde "Connected" en el header
2. Ir a tab DEBUG y verificar que llegan datos
3. Enviar comando 't' manualmente para activar monitor
4. Reconectar dispositivo
5. Verificar versión firmware (debe ser v2.33+)
```

### ❌ APK no se instala en Android

**Problema:** "App no instalada" o "Error de análisis"
```
Solución:
1. Verificar que Android es 7.0 o superior
2. Verificar que hay espacio suficiente (>50MB)
3. Habilitar "Fuentes desconocidas" en Seguridad
4. Desinstalar versión anterior si existe
5. Reiniciar teléfono y volver a intentar
```

---

## 📊 Especificaciones Técnicas

### Firmware:
- **Plataforma**: ESP32-S3-WROOM-1-N16R8
- **Flash**: 16MB
- **PSRAM**: 8MB QSPI
- **Partición**: Minimal SPIFFS (1.9MB programa, resto SPIFFS)
- **Tamaño firmware**: ~1.6MB (81% del espacio disponible)
- **Versión ESP32**: 3.3.1
- **BLE**: Nordic UART Service (NUS)

### Aplicación:
- **Framework**: React 19 + Capacitor 7
- **Tamaño APK**: ~8 MB
- **Min Android**: 7.0 (API 24)
- **Target Android**: 14 (API 34)
- **Permisos**: Bluetooth, Bluetooth Admin, Bluetooth Connect, Bluetooth Scan

### Protocolo BLE:
- **Service UUID**: `6E400001-B5A3-F393-E0A9-E50E24DCCA9E`
- **RX Characteristic**: `6E400002-B5A3-F393-E0A9-E50E24DCCA9E` (Write)
- **TX Characteristic**: `6E400003-B5A3-F393-E0A9-E50E24DCCA9E` (Notify)
- **Intervalo datos**: 500ms
- **Formato**: CSV (15 campos)

---

## 📞 Soporte

### Documentación Adicional:
- **BLUETOOTH_IMPLEMENTATION.md** - Detalles técnicos completos
- **Firmware original**: https://github.com/esp32-si4732/ats-mini

### Contacto:
- **Desarrollador**: EA5IYR - Miguel Cañadas
- **Implementación BLE**: Claude (Anthropic)

---

## ✅ Checklist de Verificación

Antes de reportar problemas, verifica:

**Hardware:**
- [ ] ESP32-S3-WROOM-1-N16R8 (16MB Flash + 8MB PSRAM)
- [ ] Cable USB-C funcional
- [ ] Batería cargada (si es portátil)

**Firmware:**
- [ ] Flasheado correctamente sin errores
- [ ] BLE activado manualmente en Settings > Bluetooth > Bluefruit
- [ ] Dispositivo reiniciado después del flasheo

**App Android:**
- [ ] APK instalado correctamente
- [ ] Permisos Bluetooth otorgados
- [ ] Android 7.0 o superior
- [ ] Bluetooth activo en el teléfono

**Conexión:**
- [ ] "ATS-Mini" aparece en escaneo BLE
- [ ] Conexión exitosa (indicador verde)
- [ ] Datos se actualizan en pantalla
- [ ] Comandos responden correctamente

---

## 🎉 ¡Listo!

Si todo salió bien, ahora tienes:
- ✅ Firmware con BLE funcionando
- ✅ App Android con control dual (USB + BLE)
- ✅ Control inalámbrico hasta 10 metros
- ✅ Streaming de datos en tiempo real

**¡Disfruta de tu ATS Mini con Bluetooth!** 📻🔵
