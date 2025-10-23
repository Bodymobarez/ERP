"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Plus, Wrench, CheckCircle2, AlertCircle, Clock } from "lucide-react"
import { useLanguage } from "@/lib/language-context"

export default function EquipmentPage() {
  const { t } = useLanguage()
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">{t.equipmentTitle}</h1>
          <p className="text-gray-600 mt-1">{t.equipmentDesc}</p>
        </div>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          {t.addEquipment}
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">{t.totalEquipment}</p>
                <p className="text-2xl font-bold mt-2">124</p>
              </div>
              <div className="bg-blue-500 text-white p-3 rounded-lg">
                <Wrench className="h-5 w-5" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">{t.available}</p>
                <p className="text-2xl font-bold mt-2">89</p>
              </div>
              <div className="bg-green-500 text-white p-3 rounded-lg">
                <CheckCircle2 className="h-5 w-5" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">{t.inUse}</p>
                <p className="text-2xl font-bold mt-2">28</p>
              </div>
              <div className="bg-yellow-500 text-white p-3 rounded-lg">
                <Clock className="h-5 w-5" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">{t.maintenance}</p>
                <p className="text-2xl font-bold mt-2">7</p>
              </div>
              <div className="bg-red-500 text-white p-3 rounded-lg">
                <AlertCircle className="h-5 w-5" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Equipment List</CardTitle>
          <CardDescription>All equipment in the system</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8 text-gray-600">
            No equipment yet. Add your first equipment to get started.
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

