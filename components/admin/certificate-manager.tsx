
"use client"

import { useState } from "react"
import { addCertificate, updateCertificate, deleteCertificate } from "@/app/actions/admin"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Award, Trash2, Pencil, Plus, X } from "lucide-react"
import { toast } from "sonner"
import { Badge } from "@/components/ui/badge"

export function CertificateManager({ certificates }: { certificates: any[] }) {
  const [editingCert, setEditingCert] = useState<any | null>(null)

  const handleEdit = (cert: any) => {
    setEditingCert(cert)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleCancelEdit = () => {
    setEditingCert(null)
  }

  const handleSubmit = async (formData: FormData) => {
    if (editingCert) {
        const result = await updateCertificate(formData)
        if (result.success) {
            toast.success("Certificate updated successfully")
            setEditingCert(null)
        } else {
            toast.error("Failed to update certificate")
        }
    } else {
        const result = await addCertificate(formData)
        if (result.success) {
            toast.success("Certificate added successfully")
            const form = document.getElementById("cert-form") as HTMLFormElement;
            if(form) form.reset();
        } else {
            toast.error("Failed to add certificate")
        }
    }
  }

  return (
    <div className="grid lg:grid-cols-12 gap-8">
      {/* Form Section */}
      <div className="lg:col-span-4">
        <Card className={`glass-card sticky top-10 border-primary/20 ${editingCert ? "border-yellow-500/50 shadow-yellow-500/10 shadow-lg" : ""}`}>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              {editingCert ? <Pencil className="w-5 h-5 text-yellow-500" /> : <Award className="w-5 h-5 text-primary" />}
              {editingCert ? "Edit Certificate" : "Add Certificate"}
            </CardTitle>
            <CardDescription>
                {editingCert ? "Update credential details." : "Showcase your new credentials."}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form id="cert-form" action={handleSubmit} className="space-y-4">
              {editingCert && <input type="hidden" name="id" value={editingCert.id} />}
              
              <div className="space-y-2">
                <label className="text-xs font-medium uppercase text-muted-foreground">Title</label>
                <Input 
                    key={editingCert?.id || 'new-title'}
                    name="title" 
                    defaultValue={editingCert?.title || ''} 
                    placeholder="e.g. IBM Data Analyst" 
                    className="bg-background/50" 
                    required 
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-medium uppercase text-muted-foreground">Issuer</label>
                <Input 
                    key={editingCert?.id || 'new-issuer'}
                    name="issuer" 
                    defaultValue={editingCert?.issuer || ''} 
                    placeholder="e.g. Coursera" 
                    className="bg-background/50" 
                    required 
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-medium uppercase text-muted-foreground">Date</label>
                <Input 
                    key={editingCert?.id || 'new-date'}
                    name="date" 
                    defaultValue={editingCert?.date || ''} 
                    placeholder="Dec 2024" 
                    className="bg-background/50" 
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-medium uppercase text-muted-foreground">Verify URL</label>
                <Input 
                    key={editingCert?.id || 'new-url'}
                    name="verifyUrl" 
                    defaultValue={editingCert?.verifyUrl || ''} 
                    placeholder="https://..." 
                    className="bg-background/50" 
                />
              </div>

              <div className="flex gap-2 pt-2">
                  <Button type="submit" className={`flex-1 text-primary-foreground hover:opacity-90 ${editingCert ? "bg-yellow-600 hover:bg-yellow-700" : "bg-primary hover:bg-primary/90"}`}>
                    {editingCert ? "Update Certificate" : "Add Certificate"}
                  </Button>
                  
                  {editingCert && (
                      <Button type="button" variant="outline" onClick={handleCancelEdit}>
                          <X className="w-4 h-4" /> Cancel
                      </Button>
                  )}
              </div>
            </form>
          </CardContent>
        </Card>
      </div>

      {/* List Section */}
      <div className="lg:col-span-8 space-y-4">
        <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-semibold">Verified Credentials</h3>
            {editingCert && (
                <Button variant="ghost" size="sm" onClick={handleCancelEdit} className="text-muted-foreground">
                    <Plus className="w-4 h-4 mr-2" /> Switch to Add Mode
                </Button>
            )}
        </div>

        {certificates.length === 0 ? (
          <div className="text-muted-foreground italic text-center py-10 border border-dashed rounded-xl">No certificates found.</div>
        ) : (
          <div className="grid gap-4">
            {certificates.map((cert: any) => (
              <div key={cert.id} className={`flex items-center justify-between bg-card/50 hover:bg-card border rounded-xl p-5 transition-all duration-300 ${editingCert?.id === cert.id ? "border-yellow-500/50 bg-yellow-500/5" : "border-border/50"}`}>
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-primary/10 rounded-lg text-primary">
                    <Award className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                        <h4 className="font-bold text-lg">{cert.title}</h4>
                        {editingCert?.id === cert.id && <Badge variant="outline" className="text-yellow-500 border-yellow-500/20 bg-yellow-500/10">Editing</Badge>}
                    </div>
                    <p className="text-sm text-muted-foreground">{cert.issuer} • {cert.date}</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-2">
                    <Button 
                        variant="secondary" 
                        size="icon" 
                        onClick={() => handleEdit(cert)}
                        className="text-muted-foreground hover:text-yellow-600 hover:bg-yellow-500/10"
                        title="Edit"
                    >
                      <Pencil className="w-4 h-4" />
                    </Button>
                    
                    <form action={async (fd) => {
                        await deleteCertificate(fd);
                        if(editingCert?.id === cert.id) setEditingCert(null);
                        toast.success("Certificate deleted");
                    }}>
                        <input type="hidden" name="id" value={cert.id} />
                        <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-destructive hover:bg-destructive/10" title="Delete">
                            <Trash2 className="w-4 h-4" />
                        </Button>
                    </form>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
