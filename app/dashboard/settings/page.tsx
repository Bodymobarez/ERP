"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Settings, User, Shield, Bell, Globe } from "lucide-react"

export default function SettingsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Settings</h1>
        <p className="text-gray-600 mt-1">Manage system settings and preferences</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card className="hover:shadow-lg transition-shadow cursor-pointer">
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="bg-blue-500 text-white p-3 rounded-lg">
                <User className="h-6 w-6" />
              </div>
              <div>
                <CardTitle>Profile Settings</CardTitle>
                <CardDescription>Manage your account details</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-600">
              Update your personal information, profile picture, and contact details.
            </p>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow cursor-pointer">
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="bg-green-500 text-white p-3 rounded-lg">
                <Shield className="h-6 w-6" />
              </div>
              <div>
                <CardTitle>Security</CardTitle>
                <CardDescription>Password and authentication</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-600">
              Change your password, enable two-factor authentication, and manage sessions.
            </p>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow cursor-pointer">
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="bg-purple-500 text-white p-3 rounded-lg">
                <Bell className="h-6 w-6" />
              </div>
              <div>
                <CardTitle>Notifications</CardTitle>
                <CardDescription>Configure notification preferences</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-600">
              Choose which notifications you want to receive and how you want to receive them.
            </p>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow cursor-pointer">
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="bg-orange-500 text-white p-3 rounded-lg">
                <Globe className="h-6 w-6" />
              </div>
              <div>
                <CardTitle>Company Settings</CardTitle>
                <CardDescription>Manage company information</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-600">
              Update company details, branches, and system-wide preferences.
            </p>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow cursor-pointer">
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="bg-red-500 text-white p-3 rounded-lg">
                <Settings className="h-6 w-6" />
              </div>
              <div>
                <CardTitle>System Settings</CardTitle>
                <CardDescription>Configure system options</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-600">
              Manage roles, permissions, integrations, and advanced system settings.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

