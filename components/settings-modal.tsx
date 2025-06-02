"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface SettingsModalProps {
  onClose: () => void
}

export default function SettingsModal({ onClose }: SettingsModalProps) {
  const [settings, setSettings] = useState({
    language: "en",
    theme: "dark",
    cloudProvider: "aws",
    cloudCredentials: {
      accessKey: "",
      secretKey: "",
      region: "us-east-1",
    },
    localDevice: {
      ip: "192.168.1.100",
      port: "8080",
      protocol: "http",
    },
  })

  const handleSettingChange = (key: string, value: string) => {
    setSettings((prev) => ({
      ...prev,
      [key]: value,
    }))
  }

  const handleNestedChange = (parent: string, key: string, value: string) => {
    setSettings((prev) => ({
      ...prev,
      [parent]: {
        ...(prev[parent as keyof typeof prev] as Record<string, string>),
        [key]: value,
      },
    }))
  }

  const handleSave = () => {
    // Save settings logic here
    console.log("Saving settings:", settings)
    onClose()
  }

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Settings</DialogTitle>
        </DialogHeader>

        <Tabs defaultValue="general" className="w-full">
          <TabsList className="grid grid-cols-3 mb-4">
            <TabsTrigger value="general">General</TabsTrigger>
            <TabsTrigger value="cloud">Cloud</TabsTrigger>
            <TabsTrigger value="local">Local Device</TabsTrigger>
          </TabsList>

          <TabsContent value="general" className="space-y-4">
            <div className="grid w-full items-center gap-1.5">
              <Label htmlFor="language">Language</Label>
              <Select value={settings.language} onValueChange={(value) => handleSettingChange("language", value)}>
                <SelectTrigger id="language">
                  <SelectValue placeholder="Select language" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="en">English</SelectItem>
                  <SelectItem value="ru">Русский</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="grid w-full items-center gap-1.5">
              <Label htmlFor="theme">Theme</Label>
              <Select value={settings.theme} onValueChange={(value) => handleSettingChange("theme", value)}>
                <SelectTrigger id="theme">
                  <SelectValue placeholder="Select theme" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="dark">Dark</SelectItem>
                  <SelectItem value="light">Light</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </TabsContent>

          <TabsContent value="cloud" className="space-y-4">
            <div className="grid w-full items-center gap-1.5">
              <Label htmlFor="cloud-provider">Cloud Provider</Label>
              <Select
                value={settings.cloudProvider}
                onValueChange={(value) => handleSettingChange("cloudProvider", value)}
              >
                <SelectTrigger id="cloud-provider">
                  <SelectValue placeholder="Select cloud provider" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="aws">AWS</SelectItem>
                  <SelectItem value="gcp">Google Cloud</SelectItem>
                  <SelectItem value="azure">Azure</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="grid w-full items-center gap-1.5">
              <Label htmlFor="access-key">Access Key</Label>
              <Input
                id="access-key"
                type="password"
                value={settings.cloudCredentials.accessKey}
                onChange={(e) => handleNestedChange("cloudCredentials", "accessKey", e.target.value)}
                placeholder="Enter access key"
              />
            </div>

            <div className="grid w-full items-center gap-1.5">
              <Label htmlFor="secret-key">Secret Key</Label>
              <Input
                id="secret-key"
                type="password"
                value={settings.cloudCredentials.secretKey}
                onChange={(e) => handleNestedChange("cloudCredentials", "secretKey", e.target.value)}
                placeholder="Enter secret key"
              />
            </div>

            <div className="grid w-full items-center gap-1.5">
              <Label htmlFor="region">Region</Label>
              <Input
                id="region"
                type="text"
                value={settings.cloudCredentials.region}
                onChange={(e) => handleNestedChange("cloudCredentials", "region", e.target.value)}
                placeholder="us-east-1"
              />
            </div>
          </TabsContent>

          <TabsContent value="local" className="space-y-4">
            <div className="grid w-full items-center gap-1.5">
              <Label htmlFor="ip-address">IP Address</Label>
              <Input
                id="ip-address"
                type="text"
                value={settings.localDevice.ip}
                onChange={(e) => handleNestedChange("localDevice", "ip", e.target.value)}
                placeholder="192.168.1.100"
              />
            </div>

            <div className="grid w-full items-center gap-1.5">
              <Label htmlFor="port">Port</Label>
              <Input
                id="port"
                type="text"
                value={settings.localDevice.port}
                onChange={(e) => handleNestedChange("localDevice", "port", e.target.value)}
                placeholder="8080"
              />
            </div>

            <div className="grid w-full items-center gap-1.5">
              <Label htmlFor="protocol">Protocol</Label>
              <Select
                value={settings.localDevice.protocol}
                onValueChange={(value) => handleNestedChange("localDevice", "protocol", value)}
              >
                <SelectTrigger id="protocol">
                  <SelectValue placeholder="Select protocol" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="http">HTTP</SelectItem>
                  <SelectItem value="https">HTTPS</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </TabsContent>
        </Tabs>

        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleSave}>Save Settings</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
