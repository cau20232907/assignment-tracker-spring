# Assignment Tracker - Spring Boot Quick Start Guide (PowerShell)

Write-Host "=== Assignment Tracker - Spring Boot Edition ===" -ForegroundColor Green
Write-Host ""

# Check if Java is installed
try {
    $javaVersion = java -version 2>&1 | Select-String "version"
    Write-Host "✅ Java is installed: $($javaVersion -split '"')[1]" -ForegroundColor Green
} catch {
    Write-Host "❌ Java is not installed. Please install JDK 17 or higher." -ForegroundColor Red
    exit 1
}

# Check if Node.js is installed
try {
    $nodeVersion = node --version
    Write-Host "✅ Node.js is installed: $nodeVersion" -ForegroundColor Green
} catch {
    Write-Host "❌ Node.js is not installed. Please install Node.js 16 or higher." -ForegroundColor Red
    exit 1
}

Write-Host ""
Write-Host "Starting services..." -ForegroundColor Yellow
Write-Host ""

# Start Spring Boot backend
Write-Host "🔧 Starting Spring Boot backend..." -ForegroundColor Blue
$backendJob = Start-Job -ScriptBlock {
    Set-Location "$using:PWD\backend-spring"
    .\mvnw.cmd spring-boot:run
}

# Wait a moment for backend to start
Start-Sleep 5

# Start React frontend
Write-Host "🔧 Starting React frontend..." -ForegroundColor Blue
Set-Location "frontend"
npm install
$frontendJob = Start-Job -ScriptBlock {
    Set-Location "$using:PWD\frontend"
    npm run dev
}
Set-Location ".."

Write-Host ""
Write-Host "✅ Services started successfully!" -ForegroundColor Green
Write-Host ""
Write-Host "📱 Frontend: http://localhost:5173" -ForegroundColor Cyan
Write-Host "🔗 Backend API: http://localhost:8080" -ForegroundColor Cyan
Write-Host ""
Write-Host "Press Ctrl+C to stop all services" -ForegroundColor Yellow

# Wait for Ctrl+C
try {
    while ($true) {
        Start-Sleep 1
    }
} finally {
    Write-Host ""
    Write-Host "Stopping services..." -ForegroundColor Yellow
    Stop-Job $backendJob, $frontendJob -ErrorAction SilentlyContinue
    Remove-Job $backendJob, $frontendJob -ErrorAction SilentlyContinue
}
