"use client"

import { updateAdminPassword } from "@/app/actions/admin"
import { adminLogout } from "@/app/actions/auth"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Shield, LayoutDashboard, LogOut } from "lucide-react"
import { ProjectManager } from "@/components/admin/project-manager"
import { CertificateManager } from "@/components/admin/certificate-manager"

interface AdminDashboardClientProps {
  data: {
    projects: any[];
    certificates: any[];
  }
}

export function AdminDashboardClient({ data }: AdminDashboardClientProps) {
  return (
    <div className="min-h-screen bg-background text-foreground p-6 lg:p-12 lg:ml-20">
      <div className="max-w-7xl mx-auto space-y-10">
        
        {/* Header */}
        <header className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 pb-8 border-b border-border/50">
          <div className="space-y-2">
            <h1 className="text-4xl font-bold tracking-tight flex items-center gap-3">
              <LayoutDashboard className="w-10 h-10 text-primary" />
              Dashboard
            </h1>
            <p className="text-muted-foreground">Manage your content, projects, and certifications.</p>
          </div>
          <form action={adminLogout}>
            <Button variant="destructive" className="shadow-lg hover:shadow-red-500/20 transition-all">
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </Button>
          </form>
        </header>

        <Tabs defaultValue="projects" className="space-y-8">
          <TabsList className="bg-muted/50 p-1 border border-border/50 rounded-xl">
            <TabsTrigger value="projects" className="rounded-lg data-[state=active]:bg-background data-[state=active]:shadow-sm">Projects</TabsTrigger>
            <TabsTrigger value="certificates" className="rounded-lg data-[state=active]:bg-background data-[state=active]:shadow-sm">Certificates</TabsTrigger>
            <TabsTrigger value="settings" className="rounded-lg data-[state=active]:bg-background data-[state=active]:shadow-sm">Settings</TabsTrigger>
          </TabsList>

          {/* PROJECTS TAB */}
          <TabsContent value="projects" className="space-y-8">
            <ProjectManager projects={data.projects} />
          </TabsContent>

          {/* CERTIFICATES TAB */}
          <TabsContent value="certificates" className="space-y-8">
            <CertificateManager certificates={data.certificates} />
          </TabsContent>

          {/* SETTINGS TAB */}
          <TabsContent value="settings">
            <div className="max-w-md">
              <Card className="border-destructive/30">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-destructive">
                    <Shield className="w-5 h-5" />
                    Security Settings
                  </CardTitle>
                  <CardDescription>Change the password used to access this dashboard.</CardDescription>
                </CardHeader>
                <CardContent>
                  <form action={updateAdminPassword} className="space-y-4">
                    <div className="space-y-2">
                        <label className="text-xs font-medium uppercase text-muted-foreground">New Access Code</label>
                        <Input 
                          name="newPassword" 
                          type="password" 
                          placeholder="New Password" 
                          className="bg-background/50" 
                          required 
                        />
                    </div>
                    <Button type="submit" variant="destructive" className="w-full">
                      Update Password
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}