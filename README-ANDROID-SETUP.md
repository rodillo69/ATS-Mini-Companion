# ATS Mini Companion - Setup Android

## ✅ Lo que ya está hecho

1. ✅ `SerialConnection.js` actualizado para soporte dual (Web + Android)
2. ✅ Proyecto duplicado eliminado
3. ✅ Android Studio instalado

## 📋 Comandos que debes ejecutar

Abre tu terminal y ejecuta estos comandos **EN ORDEN**:

### 1. Ir al directorio del proyecto

```bash
cd /Users/miguelcanadas/Software/Scripts/ATSMiniControl/ats-mini-control
```

### 2. Instalar Capacitor y dependencias

```bash
npm install @capacitor/core @capacitor/cli @capacitor/android
```

### 3. Instalar plugin USB Serial

```bash
npm install capacitor-usb-serial --legacy-peer-deps
```

### 4. Inicializar Capacitor

```bash
npx cap init "ATS Mini Companion" "com.ea5iyr.atsmini" --web-dir=dist
```

### 5. Hacer build del proyecto web

```bash
npm run build
```

### 6. Agregar plataforma Android

```bash
npx cap add android
```

### 7. Configurar permisos USB (IMPORTANTE)

Crea el archivo `android/app/src/main/res/xml/device_filter.xml`:

```bash
mkdir -p android/app/src/main/res/xml
```

Luego crea el archivo con este contenido:

```xml
<?xml version="1.0" encoding="utf-8"?>
<resources>
    <!-- Allow all USB devices with serial capability -->
    <usb-device class="255" subclass="255" protocol="255" />

    <!-- CH340/CH341 -->
    <usb-device vendor-id="6790" />
    <!-- FTDI -->
    <usb-device vendor-id="1027" />
    <!-- CP210x -->
    <usb-device vendor-id="4292" />
    <!-- Prolific PL2303 -->
    <usb-device vendor-id="1659" />
</resources>
```

### 8. Actualizar AndroidManifest.xml

Edita `android/app/src/main/AndroidManifest.xml` y agrega dentro del tag `<activity>` (después de los intent-filter existentes):

```xml
<intent-filter>
    <action android:name="android.hardware.usb.action.USB_DEVICE_ATTACHED" />
</intent-filter>

<meta-data android:name="android.hardware.usb.action.USB_DEVICE_ATTACHED"
           android:resource="@xml/device_filter" />
```

### 9. Sincronizar con Android

```bash
npx cap sync android
```

### 10. Abrir en Android Studio

```bash
npx cap open android
```

## 🏗️ Construir el APK en Android Studio

1. Android Studio se abrirá automáticamente
2. Espera a que Gradle termine de sincronizar
3. Ve a **Build → Build Bundle(s) / APK(s) → Build APK(s)**
4. Espera a que termine el build
5. Click en **locate** en la notificación
6. Tu APK estará en: `android/app/build/outputs/apk/debug/app-debug.apk`

## 📱 Instalar en tu dispositivo

### Opción 1: Via USB (ADB)

```bash
adb install android/app/build/outputs/apk/debug/app-debug.apk
```

### Opción 2: Via archivo

1. Copia el APK a tu teléfono
2. Habilita "Instalar apps de orígenes desconocidos" en Ajustes
3. Abre el APK y sigue las instrucciones

## 🎯 Uso

1. Conecta el ATS Mini a tu Android con cable USB OTG
2. Abre la app
3. Tab CONNECT → Selecciona baud rate
4. Click "CONNECT TO ATS MINI"
5. Acepta permisos USB cuando aparezca el diálogo

## ✨ Resultado Final

Tendrás:
- ✅ Versión WEB funcionando (navegadores Chrome/Edge desktop)
- ✅ Versión ANDROID APK instalable
- ✅ **MISMO código** para ambas plataformas
- ✅ **UN SOLO proyecto** fácil de mantener

## 🔧 Comandos útiles

```bash
# Rebuild web + sync Android
npm run build && npx cap sync android

# Ver logs de Android
npx cap run android -l

# Limpiar build de Android
cd android && ./gradlew clean && cd ..
```

## ⚠️ Troubleshooting

Si algo falla durante el build:
```bash
# Limpiar node_modules y reinstalar
rm -rf node_modules package-lock.json
npm install
npm install @capacitor/core @capacitor/cli @capacitor/android
npm install capacitor-usb-serial --legacy-peer-deps
```

## 📝 Notas

- La app web seguirá funcionando normalmente en navegadores desktop
- Android usa USB OTG para conectarse al ATS Mini
- El código detecta automáticamente si está en web o Android
- No necesitas código duplicado ni proyectos separados
