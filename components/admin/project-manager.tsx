
"use client"

import { useState } from "react"
import { addProject, updateProject, deleteProject, uploadImage } from "@/app/actions/admin"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { FileCode, Trash2, Pencil, Plus, X, Upload, Loader2, ImageIcon, AlertCircle } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { toast } from "sonner"
import Image from "next/image"

export function ProjectManager({ projects }: { projects: any[] }) {
  const [editingProject, setEditingProject] = useState<any | null>(null)
  const [imageUrl, setImageUrl] = useState("")
  const [isUploading, setIsUploading] = useState(false)
  const [imageError, setImageError] = useState(false)

  const handleEdit = (project: any) => {
    setEditingProject(project)
    setImageUrl(project.image || "")
    setImageError(false)
    // Scroll to top to see the form
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleCancelEdit = () => {
    setEditingProject(null)
    setImageUrl("")
    setImageError(false)
  }

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    try {
      const file = e.target.files?.[0]
      if (!file) return

      setIsUploading(true)
      setImageError(false)
      
      const formData = new FormData()
      formData.append('file', file)

      const result = await uploadImage(formData)

      if (!result.success) {
        throw new Error(result.error)
      }

      setImageUrl(result.url)
      toast.success("Image uploaded successfully")
    } catch (error: any) {
      console.error(error)
      toast.error("Upload failed: " + error.message)
    } finally {
      setIsUploading(false)
    }
  }

  const handleSubmit = async (formData: FormData) => {
    if (editingProject) {
        const result = await updateProject(formData)
        if (result.success) {
            toast.success("Project updated successfully")
            setEditingProject(null)
            setImageUrl("")
        } else {
            toast.error("Failed to update project")
        }
    } else {
        const result = await addProject(formData)
        if (result.success) {
            toast.success("Project added successfully")
            // Reset form manually or by ref if strictly needed, 
            // but Next.js server actions usually reload the page content which clears uncontrolled inputs if key changes
            // simpler approach: clear form by targeting the HTMLFormElement
            const form = document.getElementById("project-form") as HTMLFormElement;
            if(form) form.reset();
            setImageUrl("")
        } else {
            toast.error("Failed to add project")
        }
    }
  }

  return (
    <div className="grid lg:grid-cols-12 gap-8">
      {/* Form Section */}
      <div className="lg:col-span-4">
        <Card className={`glass-card sticky top-10 border-primary/20 ${editingProject ? "border-yellow-500/50 shadow-yellow-500/10 shadow-lg" : ""}`}>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              {editingProject ? <Pencil className="w-5 h-5 text-yellow-500" /> : <FileCode className="w-5 h-5 text-primary" />}
              {editingProject ? "Edit Project" : "Add New Project"}
            </CardTitle>
            <CardDescription>
                {editingProject ? "Update existing project details." : "Deploy a new project to your portfolio."}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form id="project-form" action={handleSubmit} className="space-y-4">
              {editingProject && <input type="hidden" name="id" value={editingProject.id} />}
              
              <div className="space-y-2">
                <label className="text-xs font-medium uppercase text-muted-foreground">Title</label>
                <Input 
                    key={editingProject?.id || 'new-title'} // Force re-render on switch
                    name="title" 
                    defaultValue={editingProject?.title || ''} 
                    placeholder="e.g. Churn Analysis" 
                    className="bg-background/50" 
                    required 
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-medium uppercase text-muted-foreground">Description</label>
                <Textarea 
                    key={editingProject?.id || 'new-desc'}
                    name="description" 
                    defaultValue={editingProject?.description || ''} 
                    placeholder="Project details..." 
                    className="bg-background/50 min-h-[100px]" 
                    required 
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-medium uppercase text-muted-foreground">Tech Stack (comma separated)</label>
                <Input 
                    key={editingProject?.id || 'new-tech'}
                    name="tech" 
                    defaultValue={editingProject?.tech?.join(', ') || ''} 
                    placeholder="Python, SQL, Tableau" 
                    className="bg-background/50" 
                    required 
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-medium uppercase text-muted-foreground">Link</label>
                <Input 
                    key={editingProject?.id || 'new-link'}
                    name="link" 
                    defaultValue={editingProject?.link || ''} 
                    placeholder="https://github.com/..." 
                    className="bg-background/50" 
                />
              </div>
              
              {/* Dynamic Image Uploader */}
              <div className="space-y-2">
                <label className="text-xs font-medium uppercase text-muted-foreground">Project Image</label>
                
                {/* Hidden input to store the URL for form submission */}
                <input type="hidden" name="image" value={imageUrl} />
                
                <div className="flex flex-col gap-3">
                  {/* File Input */}
                  <div className="relative">
                    <Input 
                      type="file" 
                      accept="image/*" 
                      onChange={handleImageUpload} 
                      disabled={isUploading}
                      className="bg-background/50 pl-10 cursor-pointer"
                    />
                    <div className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none">
                      {isUploading ? (
                        <Loader2 className="w-4 h-4 animate-spin text-primary" />
                      ) : (
                        <Upload className="w-4 h-4 text-muted-foreground" />
                      )}
                    </div>
                  </div>

                  {/* Preview Area */}
                  {imageUrl ? (
                    <div className="relative w-full aspect-video rounded-lg overflow-hidden border border-border/50 group bg-black/20">
                      {imageError ? (
                        <div className="flex flex-col items-center justify-center h-full p-4 text-center text-destructive space-y-2">
                          <AlertCircle className="w-8 h-8" />
                          <p className="text-xs font-medium">Image failed to load.</p>
                          <p className="text-[10px] text-muted-foreground">Please check if your Supabase Bucket is set to <strong>Public</strong>.</p>
                        </div>
                      ) : (
                        <Image 
                          src={imageUrl} 
                          alt="Project Preview" 
                          fill 
                          className="object-cover"
                          onError={() => setImageError(true)}
                          unoptimized // Helps with debugging external images in some dev environments
                        />
                      )}
                      
                      <button
                        type="button" 
                        onClick={() => {
                          setImageUrl("");
                          setImageError(false);
                        }}
                        className="absolute top-2 right-2 p-1 bg-black/50 hover:bg-destructive rounded-full text-white opacity-0 group-hover:opacity-100 transition-all z-10"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ) : (
                    <div className="flex items-center justify-center w-full aspect-[2/1] rounded-lg border border-dashed border-border/50 bg-muted/20">
                      <div className="flex flex-col items-center gap-2 text-muted-foreground/50">
                        <ImageIcon className="w-8 h-8" />
                        <span className="text-xs">No image selected</span>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <div className="flex gap-2 pt-2">
                  <Button type="submit" disabled={isUploading} className={`flex-1 text-primary-foreground hover:opacity-90 ${editingProject ? "bg-yellow-600 hover:bg-yellow-700" : "bg-primary hover:bg-primary/90"}`}>
                    {isUploading ? "Uploading..." : (editingProject ? "Update Project" : "Add Project")}
                  </Button>
                  
                  {editingProject && (
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
            <h3 className="text-xl font-semibold">Current Projects</h3>
            {editingProject && (
                <Button variant="ghost" size="sm" onClick={handleCancelEdit} className="text-muted-foreground">
                    <Plus className="w-4 h-4 mr-2" /> Switch to Add Mode
                </Button>
            )}
        </div>
        
        {projects.length === 0 ? (
          <div className="text-muted-foreground italic text-center py-10 border border-dashed rounded-xl">No projects found. Add one on the left.</div>
        ) : (
          <div className="grid gap-4">
            {projects.map((proj: any) => (
              <div key={proj.id} className={`group relative bg-card/50 hover:bg-card border rounded-xl p-6 transition-all duration-300 hover:shadow-lg ${editingProject?.id === proj.id ? "border-yellow-500/50 bg-yellow-500/5" : "border-border/50 hover:border-primary/20"}`}>
                <div className="flex justify-between items-start gap-4">
                  <div className="space-y-2 flex-1">
                    <div className="flex items-center gap-3">
                        <h4 className="text-lg font-bold group-hover:text-primary transition-colors">{proj.title}</h4>
                        {editingProject?.id === proj.id && <Badge variant="outline" className="text-yellow-500 border-yellow-500/20 bg-yellow-500/10">Editing</Badge>}
                    </div>
                    <p className="text-sm text-muted-foreground line-clamp-2">{proj.description}</p>
                    <div className="flex flex-wrap gap-2 pt-2">
                      {proj.tech && proj.tech.map((t: string, i: number) => (
                        <Badge key={i} variant="secondary" className="text-xs bg-secondary/50">{t.trim()}</Badge>
                      ))}
                    </div>
                  </div>
                  
                  <div className="flex flex-col gap-2">
                    <Button 
                        variant="secondary" 
                        size="icon" 
                        onClick={() => handleEdit(proj)}
                        className="text-muted-foreground hover:text-yellow-600 hover:bg-yellow-500/10"
                        title="Edit"
                    >
                      <Pencil className="w-4 h-4" />
                    </Button>
                    <form action={async (fd) => {
                        await deleteProject(fd);
                        if(editingProject?.id === proj.id) setEditingProject(null);
                        toast.success("Project deleted");
                    }}>
                        <input type="hidden" name="id" value={proj.id} />
                        <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-destructive hover:bg-destructive/10" title="Delete">
                        <Trash2 className="w-4 h-4" />
                        </Button>
                    </form>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
