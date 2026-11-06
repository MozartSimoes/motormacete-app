$src = "D:\MotorMacete\apps\mobile\android\app\build\outputs\apk\release\app-release.apk"
$dst = "D:\DOWNLOADS\MOTOR_MACETE\MotorMacete-release.apk"
New-Item -ItemType Directory -Force "D:\DOWNLOADS\MOTOR_MACETE" | Out-Null
Copy-Item $src $dst -Force
Write-Host "APK copiado para $dst" -ForegroundColor Green
