#!/bin/bash

# Assignment Tracker - Spring Boot Quick Start Guide

echo "=== Assignment Tracker - Spring Boot Edition ==="
echo ""

# Check if Java is installed
if ! command -v java &> /dev/null; then
    echo "❌ Java is not installed. Please install JDK 17 or higher."
    exit 1
fi

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js 16 or higher."
    exit 1
fi

echo "✅ Prerequisites check passed"
echo ""

echo "Starting services..."
echo ""

# Start Spring Boot backend
echo "🔧 Starting Spring Boot backend..."
cd backend-spring
./mvnw spring-boot:run &
BACKEND_PID=$!
cd ..

# Wait a moment for backend to start
sleep 5

# Start React frontend
echo "🔧 Starting React frontend..."
cd frontend
npm install
npm run dev &
FRONTEND_PID=$!
cd ..

echo ""
echo "✅ Services started successfully!"
echo ""
echo "📱 Frontend: http://localhost:5173"
echo "🔗 Backend API: http://localhost:8080"
echo ""
echo "Press Ctrl+C to stop all services"

# Wait for Ctrl+C
trap "echo ''; echo 'Stopping services...'; kill $BACKEND_PID $FRONTEND_PID; exit" INT
wait
