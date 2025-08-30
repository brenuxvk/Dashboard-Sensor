"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from "recharts"
import { Activity, Wifi, WifiOff, AlertTriangle, Thermometer, Droplets, Wind, Gauge, LogOut } from "lucide-react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/components/auth-provider"

// Mock data para demonstração
const generateSensorData = () => {
  const now = new Date()
  return Array.from({ length: 24 }, (_, i) => ({
    time: new Date(now.getTime() - (23 - i) * 60 * 60 * 1000).toLocaleTimeString("pt-BR", {
      hour: "2-digit",
      minute: "2-digit",
    }),
    temperature: 22 + Math.random() * 8,
    humidity: 45 + Math.random() * 30,
    co2: 400 + Math.random() * 200,
    pm25: 10 + Math.random() * 40,
  }))
}

const sensorData = generateSensorData()

const sensors = [
  {
    id: 1,
    name: "Temperatura Ambiente",
    company: "EcoTech Industries",
    value: "24.5°C",
    status: "online",
    type: "temperature",
    icon: Thermometer,
    threshold: { min: 18, max: 35 },
    currentValue: 24.5,
  },
  {
    id: 2,
    name: "Umidade do Ar",
    company: "EcoTech Industries",
    value: "62%",
    status: "online",
    type: "humidity",
    icon: Droplets,
    threshold: { min: 30, max: 80 },
    currentValue: 62,
  },
  {
    id: 3,
    name: "CO₂ Atmosférico",
    company: "EcoTech Industries",
    value: "450 ppm",
    status: "warning",
    type: "co2",
    icon: Wind,
    threshold: { min: 300, max: 500 },
    currentValue: 450,
  },
  {
    id: 4,
    name: "Material Particulado PM2.5",
    company: "EcoTech Industries",
    value: "25 μg/m³",
    status: "online",
    type: "pm25",
    icon: Gauge,
    threshold: { min: 0, max: 35 },
    currentValue: 25,
  },
  {
    id: 5,
    name: "Qualidade do Ar",
    company: "EcoTech Industries",
    value: "Moderada",
    status: "warning",
    type: "airquality",
    icon: Activity,
    threshold: { min: 0, max: 100 },
    currentValue: 65,
  },
  {
    id: 6,
    name: "Ozônio (O₃)",
    company: "EcoTech Industries",
    value: "85 μg/m³",
    status: "online",
    type: "ozone",
    icon: Wind,
    threshold: { min: 0, max: 120 },
    currentValue: 85,
  },
]

const getStatusColor = (status: string) => {
  switch (status) {
    case "online":
      return "sensor-online"
    case "offline":
      return "sensor-offline"
    case "warning":
      return "sensor-warning"
    default:
      return "text-muted-foreground"
  }
}

const getStatusBadge = (status: string) => {
  switch (status) {
    case "online":
      return <Badge className="bg-success text-success-foreground">Online</Badge>
    case "offline":
      return <Badge className="bg-destructive text-destructive-foreground">Offline</Badge>
    case "warning":
      return <Badge className="bg-warning text-warning-foreground">Alerta</Badge>
    default:
      return <Badge variant="secondary">Desconhecido</Badge>
  }
}

export default function DashboardPage() {
  const [currentTime, setCurrentTime] = useState(new Date())
  const router = useRouter()
  const { logout, user } = useAuth()

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date())
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  const handleLogout = () => {
    logout()
  }

  const onlineSensors = sensors.filter((s) => s.status === "online").length
  const totalSensors = sensors.length
  const alertSensors = sensors.filter((s) => s.status === "warning" || s.status === "offline").length

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-4xl font-sans font-bold text-foreground">AntiPollucion</h1>
            <p className="text-muted-foreground mt-1">{user?.companyName || "Sistema de Monitoramento Ambiental"}</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-right">
              <p className="text-sm text-muted-foreground">Última atualização</p>
              <p className="text-foreground font-sans">{currentTime.toLocaleString("pt-BR")}</p>
            </div>
            <Button variant="outline" size="sm">
              <Activity className="w-4 h-4 mr-2" />
              Atualizar
            </Button>
            <Button variant="outline" size="sm" onClick={handleLogout}>
              <LogOut className="w-4 h-4 mr-2" />
              Sair
            </Button>
          </div>
        </div>

        {/* Status Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Sensores Online</p>
                  <p className="text-3xl font-sans font-bold text-success">
                    {onlineSensors}/{totalSensors}
                  </p>
                </div>
                <Wifi className="w-8 h-8 text-success" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Alertas Ativos</p>
                  <p className="text-3xl font-sans font-bold text-warning">{alertSensors}</p>
                </div>
                <AlertTriangle className="w-8 h-8 text-warning" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Empresa Monitorada</p>
                  <p className="text-3xl font-sans font-bold text-primary">1</p>
                </div>
                <Activity className="w-8 h-8 text-primary" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sensor Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sensors.map((sensor) => {
            const Icon = sensor.icon
            const isAlert = sensor.status === "warning" || sensor.status === "offline"

            return (
              <Card
                key={sensor.id}
                className={`transition-all duration-300 hover:scale-105 ${
                  isAlert ? "sensor-card-glow border-warning" : ""
                }`}
              >
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-base font-sans font-semibold leading-tight break-words max-w-[180px]">
                      {sensor.name}
                    </CardTitle>
                    <Icon className={`w-5 h-5 flex-shrink-0 ${getStatusColor(sensor.status)}`} />
                  </div>
                  <p className="text-xs text-muted-foreground leading-tight break-words">{sensor.company}</p>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xl font-sans font-bold break-words">{sensor.value}</span>
                      {getStatusBadge(sensor.status)}
                    </div>

                    {sensor.status === "online" && (
                      <div className="w-full bg-muted rounded-full h-2">
                        <div
                          className="bg-primary h-2 rounded-full transition-all duration-500"
                          style={{
                            width: `${Math.min(
                              100,
                              Math.max(
                                0,
                                ((sensor.currentValue - sensor.threshold.min) /
                                  (sensor.threshold.max - sensor.threshold.min)) *
                                  100,
                              ),
                            )}%`,
                          }}
                        />
                      </div>
                    )}

                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      {sensor.status === "online" ? <Wifi className="w-3 h-3" /> : <WifiOff className="w-3 h-3" />}
                      <span>
                        {sensor.status === "online"
                          ? "Conectado"
                          : sensor.status === "offline"
                            ? "Desconectado"
                            : "Alerta"}
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="font-sans font-semibold">CO₂ Atmosférico (24h)</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={sensorData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="oklch(0.22 0.01 240)" />
                  <XAxis dataKey="time" stroke="oklch(0.7 0 0)" fontSize={12} />
                  <YAxis stroke="oklch(0.7 0 0)" fontSize={12} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "oklch(0.22 0.01 240)",
                      border: "1px solid oklch(0.3 0.01 240)",
                      borderRadius: "8px",
                    }}
                  />
                  <Line type="monotone" dataKey="co2" stroke="oklch(0.65 0.12 210)" strokeWidth={2} dot={false} />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="font-sans font-semibold">Material Particulado PM2.5 (24h)</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <AreaChart data={sensorData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="oklch(0.22 0.01 240)" />
                  <XAxis dataKey="time" stroke="oklch(0.7 0 0)" fontSize={12} />
                  <YAxis stroke="oklch(0.7 0 0)" fontSize={12} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "oklch(0.22 0.01 240)",
                      border: "1px solid oklch(0.3 0.01 240)",
                      borderRadius: "8px",
                    }}
                  />
                  <Area
                    type="monotone"
                    dataKey="pm25"
                    stroke="oklch(0.7 0.15 140)"
                    fill="oklch(0.7 0.15 140 / 0.3)"
                    strokeWidth={2}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
