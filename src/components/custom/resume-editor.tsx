"use client"

import { useState, useEffect, useRef } from "react"
import { Download, Save, Trash2, Plus, Eye, Edit3, Upload, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import jsPDF from "jspdf"
import html2canvas from "html2canvas"

interface Experience {
  id: string
  company: string
  position: string
  period: string
  description: string
}

interface Education {
  id: string
  institution: string
  degree: string
  period: string
}

interface Language {
  id: string
  language: string
  level: string
  course: string
  when: string
  duration: string
}

interface ResumeData {
  id: string
  name: string
  email: string
  phone: string
  location: string
  summary: string
  photo: string
  experiences: Experience[]
  education: Education[]
  skills: string[]
  languages: Language[]
  template: string
  color: string
}

const colorOptions = [
  { id: "black", name: "Preto", hex: "#000000" },
  { id: "blue", name: "Azul", hex: "#2563eb" },
  { id: "red", name: "Vermelho", hex: "#dc2626" },
  { id: "green", name: "Verde", hex: "#16a34a" },
  { id: "purple", name: "Roxo", hex: "#9333ea" },
  { id: "orange", name: "Laranja", hex: "#ea580c" },
  { id: "teal", name: "Azul Petróleo", hex: "#0d9488" },
  { id: "pink", name: "Rosa", hex: "#db2777" },
]

const templates = [
  { id: "modern", name: "Moderno", description: "Design contemporâneo com sidebar" },
  { id: "professional", name: "Profissional", description: "Elegante e corporativo" },
  { id: "creative", name: "Criativo", description: "Layout assimétrico único" },
  { id: "minimal", name: "Minimalista", description: "Ultra limpo e centrado" },
  { id: "executive", name: "Executivo", description: "Sofisticado com linhas elegantes" },
  { id: "tech", name: "Tecnologia", description: "Grid moderno para TI" },
  { id: "classic", name: "Clássico", description: "Tradicional com bordas" },
]

const languageLevels = [
  { value: "basic", label: "Básico" },
  { value: "intermediate", label: "Intermediário" },
  { value: "advanced", label: "Avançado" },
  { value: "fluent", label: "Fluente" },
  { value: "native", label: "Nativo" },
]

export default function ResumeEditor() {
  const [resumes, setResumes] = useState<ResumeData[]>([])
  const [currentResume, setCurrentResume] = useState<ResumeData | null>(null)
  const [previewMode, setPreviewMode] = useState(false)
  const previewRef = useRef<HTMLDivElement>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    const saved = localStorage.getItem("resumes")
    if (saved) {
      const parsed = JSON.parse(saved)
      setResumes(parsed)
      if (parsed.length > 0) {
        setCurrentResume(parsed[0])
      }
    } else {
      createNewResume()
    }
  }, [])

  const createNewResume = () => {
    const newResume: ResumeData = {
      id: Date.now().toString(),
      name: "",
      email: "",
      phone: "",
      location: "",
      summary: "",
      photo: "",
      experiences: [],
      education: [],
      skills: [],
      languages: [],
      template: "modern",
      color: "black",
    }
    setCurrentResume(newResume)
    setResumes([...resumes, newResume])
  }

  const saveResume = () => {
    if (!currentResume) return
    const updated = resumes.map(r => r.id === currentResume.id ? currentResume : r)
    const exists = resumes.find(r => r.id === currentResume.id)
    const final = exists ? updated : [...resumes, currentResume]
    setResumes(final)
    localStorage.setItem("resumes", JSON.stringify(final))
  }

  const deleteResume = (id: string) => {
    const filtered = resumes.filter(r => r.id !== id)
    setResumes(filtered)
    localStorage.setItem("resumes", JSON.stringify(filtered))
    if (currentResume?.id === id) {
      setCurrentResume(filtered[0] || null)
    }
  }

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    if (!file.type.startsWith('image/')) {
      alert('Por favor, selecione apenas arquivos de imagem.')
      return
    }

    if (file.size > 5 * 1024 * 1024) {
      alert('A imagem deve ter no máximo 5MB.')
      return
    }

    const reader = new FileReader()
    reader.onloadend = () => {
      if (!currentResume) return
      setCurrentResume({
        ...currentResume,
        photo: reader.result as string
      })
    }
    reader.readAsDataURL(file)
  }

  const removePhoto = () => {
    if (!currentResume) return
    setCurrentResume({
      ...currentResume,
      photo: ""
    })
    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
  }

  const addExperience = () => {
    if (!currentResume) return
    setCurrentResume({
      ...currentResume,
      experiences: [...currentResume.experiences, {
        id: Date.now().toString(),
        company: "",
        position: "",
        period: "",
        description: ""
      }]
    })
  }

  const updateExperience = (id: string, field: keyof Experience, value: string) => {
    if (!currentResume) return
    setCurrentResume({
      ...currentResume,
      experiences: currentResume.experiences.map(exp =>
        exp.id === id ? { ...exp, [field]: value } : exp
      )
    })
  }

  const removeExperience = (id: string) => {
    if (!currentResume) return
    setCurrentResume({
      ...currentResume,
      experiences: currentResume.experiences.filter(exp => exp.id !== id)
    })
  }

  const addEducation = () => {
    if (!currentResume) return
    setCurrentResume({
      ...currentResume,
      education: [...currentResume.education, {
        id: Date.now().toString(),
        institution: "",
        degree: "",
        period: ""
      }]
    })
  }

  const updateEducation = (id: string, field: keyof Education, value: string) => {
    if (!currentResume) return
    setCurrentResume({
      ...currentResume,
      education: currentResume.education.map(edu =>
        edu.id === id ? { ...edu, [field]: value } : edu
      )
    })
  }

  const removeEducation = (id: string) => {
    if (!currentResume) return
    setCurrentResume({
      ...currentResume,
      education: currentResume.education.filter(edu => edu.id !== id)
    })
  }

  const addLanguage = () => {
    if (!currentResume) return
    setCurrentResume({
      ...currentResume,
      languages: [...currentResume.languages, {
        id: Date.now().toString(),
        language: "",
        level: "intermediate",
        course: "",
        when: "",
        duration: ""
      }]
    })
  }

  const updateLanguage = (id: string, field: keyof Language, value: string) => {
    if (!currentResume) return
    setCurrentResume({
      ...currentResume,
      languages: currentResume.languages.map(lang =>
        lang.id === id ? { ...lang, [field]: value } : lang
      )
    })
  }

  const removeLanguage = (id: string) => {
    if (!currentResume) return
    setCurrentResume({
      ...currentResume,
      languages: currentResume.languages.filter(lang => lang.id !== id)
    })
  }

  const addSkill = (skill: string) => {
    if (!currentResume || !skill.trim()) return
    setCurrentResume({
      ...currentResume,
      skills: [...currentResume.skills, skill.trim()]
    })
  }

  const removeSkill = (index: number) => {
    if (!currentResume) return
    setCurrentResume({
      ...currentResume,
      skills: currentResume.skills.filter((_, i) => i !== index)
    })
  }

  const downloadPDF = async () => {
    if (!previewRef.current || !currentResume) return
    
    const element = previewRef.current
    const canvas = await html2canvas(element, {
      scale: 2,
      useCORS: true,
      logging: false,
      backgroundColor: '#ffffff',
    })
    
    const imgData = canvas.toDataURL("image/png")
    const pdf = new jsPDF({
      orientation: "portrait",
      unit: "mm",
      format: "a4",
    })
    
    const pdfWidth = pdf.internal.pageSize.getWidth()
    const pdfHeight = pdf.internal.pageSize.getHeight()
    const imgWidth = canvas.width
    const imgHeight = canvas.height
    const ratio = Math.min(pdfWidth / imgWidth, pdfHeight / imgHeight)
    const imgX = (pdfWidth - imgWidth * ratio) / 2
    const imgY = 0
    
    pdf.addImage(imgData, "PNG", imgX, imgY, imgWidth * ratio, imgHeight * ratio)
    pdf.save(`curriculo-${currentResume.name || 'sem-nome'}.pdf`)
  }

  if (!currentResume) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-600 mb-4">Nenhum currículo encontrado</p>
        <Button onClick={createNewResume}>Criar Novo Currículo</Button>
      </div>
    )
  }

  const selectedColor = colorOptions.find(c => c.id === currentResume.color) || colorOptions[0]

  const renderResumePreview = () => {
    const template = currentResume.template
    const primaryColor = selectedColor.hex
    const textColor = "#ffffff"

    // TEMPLATE 1: MODERNO - Sidebar à esquerda
    if (template === "modern") {
      return (
        <div className="flex min-h-[842px]">
          <div style={{ backgroundColor: primaryColor, color: textColor }} className="w-1/3 p-6">
            {currentResume.photo && (
              <div className="mb-6">
                <img src={currentResume.photo} alt="Foto" className="w-32 h-32 rounded-full mx-auto object-cover border-4 border-white shadow-lg" />
              </div>
            )}
            <div className="mb-6">
              <h2 className="text-lg font-bold mb-3 border-b-2 border-white/30 pb-2">CONTATO</h2>
              <div className="space-y-2 text-sm">
                {currentResume.email && <p className="break-words">{currentResume.email}</p>}
                {currentResume.phone && <p>{currentResume.phone}</p>}
                {currentResume.location && <p>{currentResume.location}</p>}
              </div>
            </div>
            {currentResume.skills.length > 0 && (
              <div className="mb-6">
                <h2 className="text-lg font-bold mb-3 border-b-2 border-white/30 pb-2">HABILIDADES</h2>
                <div className="space-y-2">
                  {currentResume.skills.map((skill, index) => (
                    <div key={index} className="text-sm bg-white/20 px-3 py-1 rounded">{skill}</div>
                  ))}
                </div>
              </div>
            )}
            {currentResume.languages.length > 0 && (
              <div>
                <h2 className="text-lg font-bold mb-3 border-b-2 border-white/30 pb-2">IDIOMAS</h2>
                <div className="space-y-2">
                  {currentResume.languages.map((lang) => (
                    <div key={lang.id} className="text-sm">
                      <p className="font-semibold">{lang.language}</p>
                      <p className="text-xs opacity-90">{languageLevels.find(l => l.value === lang.level)?.label}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
          <div className="w-2/3 p-8 bg-white">
            <h1 className="text-4xl font-bold text-gray-800 mb-2">{currentResume.name || "Seu Nome"}</h1>
            {currentResume.summary && <p className="text-gray-600 text-sm mb-6 leading-relaxed">{currentResume.summary}</p>}
            {currentResume.experiences.length > 0 && (
              <div className="mb-6">
                <h2 className="text-xl font-bold text-gray-800 mb-4 border-b-2 border-gray-300 pb-1">EXPERIÊNCIA</h2>
                {currentResume.experiences.map((exp) => (
                  <div key={exp.id} className="mb-4">
                    <h3 className="font-bold text-gray-800">{exp.position}</h3>
                    <p className="text-sm text-gray-600 font-semibold">{exp.company}</p>
                    <p className="text-xs text-gray-500 mb-2">{exp.period}</p>
                    <p className="text-sm text-gray-700">{exp.description}</p>
                  </div>
                ))}
              </div>
            )}
            {currentResume.education.length > 0 && (
              <div>
                <h2 className="text-xl font-bold text-gray-800 mb-4 border-b-2 border-gray-300 pb-1">FORMAÇÃO</h2>
                {currentResume.education.map((edu) => (
                  <div key={edu.id} className="mb-3">
                    <h3 className="font-bold text-gray-800">{edu.degree}</h3>
                    <p className="text-sm text-gray-600">{edu.institution}</p>
                    <p className="text-xs text-gray-500">{edu.period}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )
    }

    // TEMPLATE 2: PROFISSIONAL - Header com foto
    if (template === "professional") {
      return (
        <div className="bg-white min-h-[842px]">
          <div style={{ backgroundColor: primaryColor, color: textColor }} className="p-8">
            <div className="flex items-center gap-6">
              {currentResume.photo && <img src={currentResume.photo} alt="Foto" className="w-24 h-24 rounded-full object-cover border-4 border-white" />}
              <div>
                <h1 className="text-3xl font-bold mb-2">{currentResume.name || "Seu Nome"}</h1>
                <div className="text-sm space-y-1">
                  {currentResume.email && <p>{currentResume.email}</p>}
                  {currentResume.phone && <p>{currentResume.phone}</p>}
                  {currentResume.location && <p>{currentResume.location}</p>}
                </div>
              </div>
            </div>
          </div>
          <div className="p-8">
            {currentResume.summary && <div className="mb-6 p-4 bg-gray-50 rounded-lg"><p className="text-gray-700 text-sm leading-relaxed italic">{currentResume.summary}</p></div>}
            <div className="grid grid-cols-3 gap-6">
              <div className="col-span-2">
                {currentResume.experiences.length > 0 && (
                  <div className="mb-6">
                    <h2 className="text-xl font-bold text-gray-800 mb-4 uppercase tracking-wide">Experiência Profissional</h2>
                    {currentResume.experiences.map((exp) => (
                      <div key={exp.id} className="mb-4 pb-4 border-b border-gray-200 last:border-0">
                        <h3 className="font-bold text-gray-800 text-lg">{exp.position}</h3>
                        <p className="text-sm text-gray-600 font-semibold">{exp.company} • {exp.period}</p>
                        <p className="text-sm text-gray-700 mt-2">{exp.description}</p>
                      </div>
                    ))}
                  </div>
                )}
                {currentResume.education.length > 0 && (
                  <div>
                    <h2 className="text-xl font-bold text-gray-800 mb-4 uppercase tracking-wide">Formação Acadêmica</h2>
                    {currentResume.education.map((edu) => (
                      <div key={edu.id} className="mb-3">
                        <h3 className="font-bold text-gray-800">{edu.degree}</h3>
                        <p className="text-sm text-gray-600">{edu.institution} • {edu.period}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
              <div>
                {currentResume.skills.length > 0 && (
                  <div className="mb-6">
                    <h2 className="text-lg font-bold text-gray-800 mb-3 uppercase tracking-wide">Habilidades</h2>
                    <div className="space-y-2">
                      {currentResume.skills.map((skill, index) => (
                        <div key={index} style={{ borderLeftColor: primaryColor }} className="text-sm text-gray-700 pl-3 border-l-2">{skill}</div>
                      ))}
                    </div>
                  </div>
                )}
                {currentResume.languages.length > 0 && (
                  <div>
                    <h2 className="text-lg font-bold text-gray-800 mb-3 uppercase tracking-wide">Idiomas</h2>
                    <div className="space-y-2">
                      {currentResume.languages.map((lang) => (
                        <div key={lang.id} className="text-sm">
                          <p className="font-semibold text-gray-800">{lang.language}</p>
                          <p className="text-xs text-gray-600">{languageLevels.find(l => l.value === lang.level)?.label}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )
    }

    // TEMPLATE 3: CRIATIVO - Layout diagonal
    if (template === "creative") {
      return (
        <div className="bg-white min-h-[842px] relative overflow-hidden">
          <div style={{ backgroundColor: primaryColor }} className="absolute top-0 right-0 w-64 h-64 opacity-10 rounded-bl-full"></div>
          <div style={{ backgroundColor: primaryColor }} className="absolute bottom-0 left-0 w-48 h-48 opacity-10 rounded-tr-full"></div>
          <div className="relative z-10 p-8">
            <div className="flex items-start justify-between mb-8">
              <div>
                <h1 style={{ color: primaryColor }} className="text-5xl font-black mb-3">{currentResume.name || "Seu Nome"}</h1>
                {currentResume.summary && <p className="text-gray-600 text-sm max-w-2xl leading-relaxed">{currentResume.summary}</p>}
              </div>
              {currentResume.photo && <img src={currentResume.photo} alt="Foto" style={{ borderColor: primaryColor }} className="w-32 h-32 rounded-2xl object-cover shadow-xl border-4" />}
            </div>
            <div className="grid grid-cols-4 gap-6 mb-6">
              {currentResume.email && (
                <div style={{ backgroundColor: primaryColor, color: textColor }} className="p-3 rounded-lg">
                  <p className="text-xs uppercase font-semibold mb-1">Email</p>
                  <p className="text-sm break-words">{currentResume.email}</p>
                </div>
              )}
              {currentResume.phone && (
                <div style={{ backgroundColor: primaryColor, color: textColor }} className="p-3 rounded-lg">
                  <p className="text-xs uppercase font-semibold mb-1">Telefone</p>
                  <p className="text-sm">{currentResume.phone}</p>
                </div>
              )}
              {currentResume.location && (
                <div style={{ backgroundColor: primaryColor, color: textColor }} className="p-3 rounded-lg">
                  <p className="text-xs uppercase font-semibold mb-1">Localização</p>
                  <p className="text-sm">{currentResume.location}</p>
                </div>
              )}
            </div>
            {currentResume.experiences.length > 0 && (
              <div className="mb-6">
                <h2 style={{ color: primaryColor }} className="text-2xl font-bold mb-4">Experiência</h2>
                <div className="space-y-4">
                  {currentResume.experiences.map((exp) => (
                    <div key={exp.id} style={{ borderLeftColor: primaryColor }} className="border-l-4 pl-4">
                      <h3 className="font-bold text-gray-800 text-lg">{exp.position}</h3>
                      <p className="text-sm text-gray-600 font-semibold">{exp.company} | {exp.period}</p>
                      <p className="text-sm text-gray-700 mt-2">{exp.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
            <div className="grid grid-cols-2 gap-6">
              <div>
                {currentResume.education.length > 0 && (
                  <div className="mb-6">
                    <h2 style={{ color: primaryColor }} className="text-2xl font-bold mb-4">Formação</h2>
                    {currentResume.education.map((edu) => (
                      <div key={edu.id} className="mb-3 bg-gray-50 p-3 rounded-lg">
                        <h3 className="font-bold text-gray-800">{edu.degree}</h3>
                        <p className="text-sm text-gray-600">{edu.institution}</p>
                        <p className="text-xs text-gray-500">{edu.period}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
              <div>
                {currentResume.skills.length > 0 && (
                  <div className="mb-6">
                    <h2 style={{ color: primaryColor }} className="text-2xl font-bold mb-4">Habilidades</h2>
                    <div className="flex flex-wrap gap-2">
                      {currentResume.skills.map((skill, index) => (
                        <span key={index} style={{ backgroundColor: primaryColor, color: textColor }} className="px-3 py-1 rounded-full text-xs font-semibold">{skill}</span>
                      ))}
                    </div>
                  </div>
                )}
                {currentResume.languages.length > 0 && (
                  <div>
                    <h2 style={{ color: primaryColor }} className="text-2xl font-bold mb-4">Idiomas</h2>
                    <div className="space-y-2">
                      {currentResume.languages.map((lang) => (
                        <div key={lang.id} className="flex justify-between items-center bg-gray-50 p-2 rounded">
                          <span className="font-semibold text-gray-800 text-sm">{lang.language}</span>
                          <span className="text-xs text-gray-600">{languageLevels.find(l => l.value === lang.level)?.label}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )
    }

    // TEMPLATE 4: MINIMALISTA - Centrado com linhas finas
    if (template === "minimal") {
      return (
        <div className="bg-white min-h-[842px] p-12">
          <div className="max-w-3xl mx-auto">
            <div style={{ borderBottomColor: primaryColor }} className="text-center mb-12 pb-6 border-b-2">
              {currentResume.photo && <img src={currentResume.photo} alt="Foto" style={{ borderColor: primaryColor }} className="w-24 h-24 rounded-full mx-auto mb-4 object-cover border-2" />}
              <h1 style={{ color: primaryColor }} className="text-4xl font-light mb-2 tracking-wide">{currentResume.name || "Seu Nome"}</h1>
              <div className="flex justify-center gap-4 text-sm text-gray-600 mb-4">
                {currentResume.email && <span>{currentResume.email}</span>}
                {currentResume.phone && <span>•</span>}
                {currentResume.phone && <span>{currentResume.phone}</span>}
                {currentResume.location && <span>•</span>}
                {currentResume.location && <span>{currentResume.location}</span>}
              </div>
              {currentResume.summary && <p className="text-gray-600 text-sm leading-relaxed max-w-2xl mx-auto">{currentResume.summary}</p>}
            </div>
            {currentResume.experiences.length > 0 && (
              <div className="mb-12">
                <h2 style={{ color: primaryColor }} className="text-xs uppercase tracking-widest mb-6 text-center font-bold">Experiência</h2>
                <div className="space-y-8">
                  {currentResume.experiences.map((exp) => (
                    <div key={exp.id} className="text-center">
                      <h3 className="font-semibold text-gray-900 text-lg">{exp.position}</h3>
                      <p className="text-sm text-gray-600 mb-2">{exp.company} • {exp.period}</p>
                      <p className="text-sm text-gray-700 leading-relaxed max-w-xl mx-auto">{exp.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
            {currentResume.education.length > 0 && (
              <div className="mb-12">
                <h2 style={{ color: primaryColor }} className="text-xs uppercase tracking-widest mb-6 text-center font-bold">Formação</h2>
                <div className="space-y-4">
                  {currentResume.education.map((edu) => (
                    <div key={edu.id} className="text-center">
                      <h3 className="font-semibold text-gray-900">{edu.degree}</h3>
                      <p className="text-sm text-gray-600">{edu.institution} • {edu.period}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
            <div className="grid grid-cols-2 gap-8">
              {currentResume.skills.length > 0 && (
                <div>
                  <h2 style={{ color: primaryColor }} className="text-xs uppercase tracking-widest mb-4 text-center font-bold">Habilidades</h2>
                  <div className="flex flex-wrap justify-center gap-2">
                    {currentResume.skills.map((skill, index) => (
                      <span key={index} style={{ borderColor: primaryColor }} className="text-xs text-gray-700 px-3 py-1 border rounded-full">{skill}</span>
                    ))}
                  </div>
                </div>
              )}
              {currentResume.languages.length > 0 && (
                <div>
                  <h2 style={{ color: primaryColor }} className="text-xs uppercase tracking-widest mb-4 text-center font-bold">Idiomas</h2>
                  <div className="space-y-2">
                    {currentResume.languages.map((lang) => (
                      <div key={lang.id} className="text-center">
                        <p className="text-sm font-semibold text-gray-900">{lang.language}</p>
                        <p className="text-xs text-gray-600">{languageLevels.find(l => l.value === lang.level)?.label}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )
    }

    // TEMPLATE 5: EXECUTIVO - Sidebar à direita
    if (template === "executive") {
      return (
        <div className="bg-white min-h-[842px] flex">
          <div className="w-3/4 p-10">
            <h1 style={{ color: primaryColor }} className="text-4xl font-bold mb-1 tracking-tight">{currentResume.name || "Seu Nome"}</h1>
            <div style={{ backgroundColor: primaryColor }} className="h-1 w-20 mb-6"></div>
            {currentResume.summary && <p className="text-gray-700 text-sm mb-8 leading-relaxed">{currentResume.summary}</p>}
            {currentResume.experiences.length > 0 && (
              <div className="mb-8">
                <h2 style={{ color: primaryColor }} className="text-xs uppercase tracking-widest mb-4 font-bold">Trajetória Profissional</h2>
                <div className="space-y-6">
                  {currentResume.experiences.map((exp) => (
                    <div key={exp.id}>
                      <div className="flex justify-between items-baseline mb-1">
                        <h3 className="font-bold text-gray-900">{exp.position}</h3>
                        <span className="text-xs text-gray-500">{exp.period}</span>
                      </div>
                      <p className="text-sm text-gray-600 font-semibold mb-2">{exp.company}</p>
                      <p className="text-sm text-gray-700 leading-relaxed">{exp.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
            {currentResume.education.length > 0 && (
              <div>
                <h2 style={{ color: primaryColor }} className="text-xs uppercase tracking-widest mb-4 font-bold">Formação Acadêmica</h2>
                <div className="space-y-3">
                  {currentResume.education.map((edu) => (
                    <div key={edu.id}>
                      <h3 className="font-bold text-gray-900">{edu.degree}</h3>
                      <p className="text-sm text-gray-600">{edu.institution} • {edu.period}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
          <div style={{ backgroundColor: primaryColor, color: textColor }} className="w-1/4 p-6">
            {currentResume.photo && <img src={currentResume.photo} alt="Foto" className="w-full aspect-square object-cover mb-6" />}
            <div className="mb-6">
              <h2 className="text-xs uppercase tracking-widest mb-3 text-gray-400">Contato</h2>
              <div className="space-y-2 text-xs">
                {currentResume.email && <p className="break-words">{currentResume.email}</p>}
                {currentResume.phone && <p>{currentResume.phone}</p>}
                {currentResume.location && <p>{currentResume.location}</p>}
              </div>
            </div>
            {currentResume.skills.length > 0 && (
              <div className="mb-6">
                <h2 className="text-xs uppercase tracking-widest mb-3 text-gray-400">Competências</h2>
                <div className="space-y-1">
                  {currentResume.skills.map((skill, index) => (
                    <p key={index} className="text-xs">{skill}</p>
                  ))}
                </div>
              </div>
            )}
            {currentResume.languages.length > 0 && (
              <div>
                <h2 className="text-xs uppercase tracking-widest mb-3 text-gray-400">Idiomas</h2>
                <div className="space-y-2">
                  {currentResume.languages.map((lang) => (
                    <div key={lang.id} className="text-xs">
                      <p className="font-semibold">{lang.language}</p>
                      <p className="text-gray-400">{languageLevels.find(l => l.value === lang.level)?.label}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )
    }

    // TEMPLATE 6: TECH
    if (template === "tech") {
      return (
        <div className="bg-gray-50 min-h-[842px] p-8">
          <div style={{ borderColor: primaryColor }} className="bg-white rounded-lg border-4 overflow-hidden">
            <div style={{ backgroundColor: primaryColor, color: textColor }} className="p-6">
              <div className="flex items-center gap-4">
                {currentResume.photo && <img src={currentResume.photo} alt="Foto" className="w-20 h-20 rounded-lg object-cover border-2 border-white" />}
                <div>
                  <h1 className="text-3xl font-bold mb-1">{currentResume.name || "Seu Nome"}</h1>
                  <div className="flex gap-3 text-sm opacity-90">
                    {currentResume.email && <span>{currentResume.email}</span>}
                    {currentResume.phone && <span>|</span>}
                    {currentResume.phone && <span>{currentResume.phone}</span>}
                    {currentResume.location && <span>|</span>}
                    {currentResume.location && <span>{currentResume.location}</span>}
                  </div>
                </div>
              </div>
            </div>
            <div className="p-8">
              {currentResume.summary && <div style={{ borderLeftColor: primaryColor }} className="mb-6 p-4 border-l-4 rounded"><p className="text-gray-700 text-sm leading-relaxed">{currentResume.summary}</p></div>}
              <div className="grid grid-cols-3 gap-6">
                <div className="col-span-2 space-y-6">
                  {currentResume.experiences.length > 0 && (
                    <div>
                      <h2 style={{ color: primaryColor }} className="text-lg font-bold mb-4 flex items-center gap-2">
                        <span style={{ backgroundColor: primaryColor }} className="w-2 h-2 rounded-full"></span>EXPERIÊNCIA
                      </h2>
                      <div className="space-y-4">
                        {currentResume.experiences.map((exp) => (
                          <div key={exp.id} style={{ borderLeftColor: primaryColor }} className="pl-4 border-l-2">
                            <h3 className="font-bold text-gray-900">{exp.position}</h3>
                            <p style={{ color: primaryColor }} className="text-sm font-semibold">{exp.company}</p>
                            <p className="text-xs text-gray-500 mb-2">{exp.period}</p>
                            <p className="text-sm text-gray-700">{exp.description}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                  {currentResume.education.length > 0 && (
                    <div>
                      <h2 style={{ color: primaryColor }} className="text-lg font-bold mb-4 flex items-center gap-2">
                        <span style={{ backgroundColor: primaryColor }} className="w-2 h-2 rounded-full"></span>FORMAÇÃO
                      </h2>
                      <div className="space-y-3">
                        {currentResume.education.map((edu) => (
                          <div key={edu.id} style={{ borderLeftColor: primaryColor }} className="pl-4 border-l-2">
                            <h3 className="font-bold text-gray-900">{edu.degree}</h3>
                            <p className="text-sm text-gray-600">{edu.institution}</p>
                            <p className="text-xs text-gray-500">{edu.period}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
                <div className="space-y-6">
                  {currentResume.skills.length > 0 && (
                    <div>
                      <h2 style={{ color: primaryColor }} className="text-lg font-bold mb-4 flex items-center gap-2">
                        <span style={{ backgroundColor: primaryColor }} className="w-2 h-2 rounded-full"></span>SKILLS
                      </h2>
                      <div className="space-y-2">
                        {currentResume.skills.map((skill, index) => (
                          <div key={index} style={{ backgroundColor: primaryColor, color: textColor }} className="px-3 py-2 rounded text-sm font-mono">{skill}</div>
                        ))}
                      </div>
                    </div>
                  )}
                  {currentResume.languages.length > 0 && (
                    <div>
                      <h2 style={{ color: primaryColor }} className="text-lg font-bold mb-4 flex items-center gap-2">
                        <span style={{ backgroundColor: primaryColor }} className="w-2 h-2 rounded-full"></span>IDIOMAS
                      </h2>
                      <div className="space-y-2">
                        {currentResume.languages.map((lang) => (
                          <div key={lang.id} style={{ borderColor: primaryColor }} className="border px-3 py-2 rounded">
                            <p className="font-semibold text-gray-900 text-sm">{lang.language}</p>
                            <p className="text-xs text-gray-600">{languageLevels.find(l => l.value === lang.level)?.label}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )
    }

    // TEMPLATE 7: CLÁSSICO - Layout tradicional com bordas
    if (template === "classic") {
      return (
        <div className="bg-white min-h-[842px] p-8">
          <div style={{ borderColor: primaryColor }} className="border-4 p-8">
            <div className="text-center mb-8 pb-6 border-b-2 border-gray-300">
              {currentResume.photo && <img src={currentResume.photo} alt="Foto" style={{ borderColor: primaryColor }} className="w-28 h-28 rounded-full mx-auto mb-4 object-cover border-4" />}
              <h1 style={{ color: primaryColor }} className="text-4xl font-bold mb-3">{currentResume.name || "Seu Nome"}</h1>
              <div className="flex justify-center gap-3 text-sm text-gray-600">
                {currentResume.email && <span>{currentResume.email}</span>}
                {currentResume.phone && <span>•</span>}
                {currentResume.phone && <span>{currentResume.phone}</span>}
                {currentResume.location && <span>•</span>}
                {currentResume.location && <span>{currentResume.location}</span>}
              </div>
            </div>
            {currentResume.summary && (
              <div className="mb-8 text-center">
                <p className="text-gray-700 text-sm leading-relaxed max-w-3xl mx-auto italic">{currentResume.summary}</p>
              </div>
            )}
            {currentResume.experiences.length > 0 && (
              <div className="mb-8">
                <h2 style={{ color: primaryColor, borderBottomColor: primaryColor }} className="text-2xl font-bold mb-4 pb-2 border-b-2 text-center">EXPERIÊNCIA PROFISSIONAL</h2>
                <div className="space-y-6">
                  {currentResume.experiences.map((exp) => (
                    <div key={exp.id} className="border-l-4 pl-4" style={{ borderLeftColor: primaryColor }}>
                      <h3 className="font-bold text-gray-900 text-lg">{exp.position}</h3>
                      <p className="text-sm text-gray-600 font-semibold">{exp.company} | {exp.period}</p>
                      <p className="text-sm text-gray-700 mt-2 leading-relaxed">{exp.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
            <div className="grid grid-cols-2 gap-8">
              <div>
                {currentResume.education.length > 0 && (
                  <div className="mb-8">
                    <h2 style={{ color: primaryColor, borderBottomColor: primaryColor }} className="text-2xl font-bold mb-4 pb-2 border-b-2">FORMAÇÃO</h2>
                    <div className="space-y-4">
                      {currentResume.education.map((edu) => (
                        <div key={edu.id}>
                          <h3 className="font-bold text-gray-900">{edu.degree}</h3>
                          <p className="text-sm text-gray-600">{edu.institution}</p>
                          <p className="text-xs text-gray-500">{edu.period}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
              <div>
                {currentResume.skills.length > 0 && (
                  <div className="mb-8">
                    <h2 style={{ color: primaryColor, borderBottomColor: primaryColor }} className="text-2xl font-bold mb-4 pb-2 border-b-2">HABILIDADES</h2>
                    <div className="space-y-2">
                      {currentResume.skills.map((skill, index) => (
                        <div key={index} className="flex items-center gap-2">
                          <span style={{ backgroundColor: primaryColor }} className="w-2 h-2 rounded-full"></span>
                          <span className="text-sm text-gray-700">{skill}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                {currentResume.languages.length > 0 && (
                  <div>
                    <h2 style={{ color: primaryColor, borderBottomColor: primaryColor }} className="text-2xl font-bold mb-4 pb-2 border-b-2">IDIOMAS</h2>
                    <div className="space-y-3">
                      {currentResume.languages.map((lang) => (
                        <div key={lang.id}>
                          <p className="font-semibold text-gray-900">{lang.language}</p>
                          <p className="text-xs text-gray-600">{languageLevels.find(l => l.value === lang.level)?.label}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )
    }

    // Fallback para templates restantes (aplicando cores dinamicamente)
    return (
      <div className="bg-white p-8 min-h-[842px]">
        <div style={{ backgroundColor: primaryColor, color: textColor }} className="p-6 -m-8 mb-6 relative">
          {currentResume.photo && (
            <div className="absolute top-6 right-6">
              <img src={currentResume.photo} alt="Foto" className="w-24 h-24 rounded-full object-cover border-4 border-white shadow-lg" />
            </div>
          )}
          <h1 className="text-3xl font-bold mb-2">{currentResume.name || "Seu Nome"}</h1>
          <div className="text-sm space-y-1 opacity-90">
            {currentResume.email && <p>{currentResume.email}</p>}
            {currentResume.phone && <p>{currentResume.phone}</p>}
            {currentResume.location && <p>{currentResume.location}</p>}
          </div>
        </div>
        {currentResume.summary && (
          <div className="mb-6">
            <h2 style={{ borderBottomColor: primaryColor }} className="text-xl font-bold mb-2 text-gray-800 border-b-2 pb-1">Resumo Profissional</h2>
            <p className="text-gray-700 text-sm leading-relaxed">{currentResume.summary}</p>
          </div>
        )}
        {currentResume.experiences.length > 0 && (
          <div className="mb-6">
            <h2 style={{ borderBottomColor: primaryColor }} className="text-xl font-bold mb-3 text-gray-800 border-b-2 pb-1">Experiência Profissional</h2>
            <div className="space-y-4">
              {currentResume.experiences.map((exp) => (
                <div key={exp.id}>
                  <h3 className="font-bold text-gray-800">{exp.position}</h3>
                  <p className="text-sm text-gray-600 font-semibold">{exp.company}</p>
                  <p className="text-xs text-gray-500 mb-2">{exp.period}</p>
                  <p className="text-sm text-gray-700 leading-relaxed">{exp.description}</p>
                </div>
              ))}
            </div>
          </div>
        )}
        {currentResume.education.length > 0 && (
          <div className="mb-6">
            <h2 style={{ borderBottomColor: primaryColor }} className="text-xl font-bold mb-3 text-gray-800 border-b-2 pb-1">Formação Acadêmica</h2>
            <div className="space-y-3">
              {currentResume.education.map((edu) => (
                <div key={edu.id}>
                  <h3 className="font-bold text-gray-800">{edu.degree}</h3>
                  <p className="text-sm text-gray-600">{edu.institution}</p>
                  <p className="text-xs text-gray-500">{edu.period}</p>
                </div>
              ))}
            </div>
          </div>
        )}
        {currentResume.languages.length > 0 && (
          <div className="mb-6">
            <h2 style={{ borderBottomColor: primaryColor }} className="text-xl font-bold mb-3 text-gray-800 border-b-2 pb-1">Idiomas</h2>
            <div className="space-y-3">
              {currentResume.languages.map((lang) => (
                <div key={lang.id}>
                  <div className="flex items-baseline gap-2">
                    <h3 className="font-bold text-gray-800">{lang.language}</h3>
                    <span className="text-sm text-gray-600">- {languageLevels.find(l => l.value === lang.level)?.label || lang.level}</span>
                  </div>
                  {lang.course && <p className="text-sm text-gray-600">Curso: {lang.course}</p>}
                  {(lang.when || lang.duration) && (
                    <p className="text-xs text-gray-500">
                      {lang.when && `Ano: ${lang.when}`}
                      {lang.when && lang.duration && " • "}
                      {lang.duration && `Duração: ${lang.duration}`}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
        {currentResume.skills.length > 0 && (
          <div>
            <h2 style={{ borderBottomColor: primaryColor }} className="text-xl font-bold mb-3 text-gray-800 border-b-2 pb-1">Habilidades</h2>
            <div className="flex flex-wrap gap-2">
              {currentResume.skills.map((skill, index) => (
                <span key={index} style={{ backgroundColor: primaryColor, color: textColor }} className="px-3 py-1 rounded-full text-sm font-medium">
                  {skill}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Editor Panel */}
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Editor de Currículo</CardTitle>
                <CardDescription>Preencha suas informações profissionais</CardDescription>
              </div>
              <div className="flex gap-2">
                <Button onClick={saveResume} size="sm" className="gap-2">
                  <Save className="w-4 h-4" />
                  Salvar
                </Button>
                <Button onClick={createNewResume} size="sm" variant="outline" className="gap-2">
                  <Plus className="w-4 h-4" />
                  Novo
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Template Selection */}
            <div>
              <Label className="text-base font-semibold mb-3 block">Escolha o Modelo</Label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {templates.map(template => (
                  <button
                    key={template.id}
                    onClick={() => setCurrentResume({ ...currentResume, template: template.id })}
                    className={`p-4 rounded-lg border-2 transition-all text-left ${
                      currentResume.template === template.id
                        ? 'border-blue-500 bg-blue-50 shadow-md'
                        : 'border-gray-200 hover:border-gray-300 hover:shadow-sm'
                    }`}
                  >
                    <div style={{ backgroundColor: selectedColor.hex }} className="h-3 w-full rounded-full mb-2"></div>
                    <h4 className="font-semibold text-sm mb-1">{template.name}</h4>
                    <p className="text-xs text-gray-600">{template.description}</p>
                  </button>
                ))}
              </div>
            </div>

            {/* Color Selection */}
            <div>
              <Label className="text-base font-semibold mb-3 block">Escolha a Cor</Label>
              <div className="grid grid-cols-4 gap-3">
                {colorOptions.map(color => (
                  <button
                    key={color.id}
                    onClick={() => setCurrentResume({ ...currentResume, color: color.id })}
                    className={`p-3 rounded-lg border-2 transition-all ${
                      currentResume.color === color.id
                        ? 'border-blue-500 shadow-md'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div style={{ backgroundColor: color.hex }} className="h-8 w-full rounded mb-2"></div>
                    <p className="text-xs text-center font-medium">{color.name}</p>
                  </button>
                ))}
              </div>
            </div>

            {/* Photo Upload */}
            <div className="space-y-3">
              <Label>Foto de Perfil</Label>
              <div className="flex items-center gap-4">
                {currentResume.photo ? (
                  <div className="relative">
                    <img
                      src={currentResume.photo}
                      alt="Foto de perfil"
                      className="w-24 h-24 rounded-full object-cover border-2 border-gray-300"
                    />
                    <Button
                      onClick={removePhoto}
                      size="sm"
                      variant="destructive"
                      className="absolute -top-2 -right-2 h-6 w-6 rounded-full p-0"
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  </div>
                ) : (
                  <div className="w-24 h-24 rounded-full bg-gray-200 flex items-center justify-center border-2 border-dashed border-gray-400">
                    <Upload className="w-8 h-8 text-gray-400" />
                  </div>
                )}
                <div className="flex-1">
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handlePhotoUpload}
                    className="hidden"
                    id="photo-upload"
                  />
                  <Button
                    onClick={() => fileInputRef.current?.click()}
                    variant="outline"
                    className="gap-2 w-full"
                  >
                    <Upload className="w-4 h-4" />
                    {currentResume.photo ? "Alterar Foto" : "Adicionar Foto"}
                  </Button>
                  <p className="text-xs text-gray-500 mt-2">
                    Formatos aceitos: JPG, PNG, GIF (máx. 5MB)
                  </p>
                </div>
              </div>
            </div>

            {/* Personal Info */}
            <div className="space-y-4">
              <h3 className="font-semibold text-lg">Informações Pessoais</h3>
              <div>
                <Label>Nome Completo</Label>
                <Input
                  value={currentResume.name}
                  onChange={(e) => setCurrentResume({ ...currentResume, name: e.target.value })}
                  placeholder="João Silva"
                />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <Label>Email</Label>
                  <Input
                    type="email"
                    value={currentResume.email}
                    onChange={(e) => setCurrentResume({ ...currentResume, email: e.target.value })}
                    placeholder="joao@email.com"
                  />
                </div>
                <div>
                  <Label>Telefone</Label>
                  <Input
                    value={currentResume.phone}
                    onChange={(e) => setCurrentResume({ ...currentResume, phone: e.target.value })}
                    placeholder="(11) 99999-9999"
                  />
                </div>
              </div>
              <div>
                <Label>Localização</Label>
                <Input
                  value={currentResume.location}
                  onChange={(e) => setCurrentResume({ ...currentResume, location: e.target.value })}
                  placeholder="São Paulo, SP"
                />
              </div>
              <div>
                <Label>Resumo Profissional</Label>
                <Textarea
                  value={currentResume.summary}
                  onChange={(e) => setCurrentResume({ ...currentResume, summary: e.target.value })}
                  placeholder="Descreva brevemente sua experiência e objetivos profissionais..."
                  rows={4}
                />
              </div>
            </div>

            {/* Experience */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold text-lg">Experiência Profissional</h3>
                <Button onClick={addExperience} size="sm" variant="outline" className="gap-2">
                  <Plus className="w-4 h-4" />
                  Adicionar
                </Button>
              </div>
              {currentResume.experiences.map((exp) => (
                <Card key={exp.id} className="p-4">
                  <div className="space-y-3">
                    <div className="flex justify-between items-start">
                      <Input
                        value={exp.company}
                        onChange={(e) => updateExperience(exp.id, "company", e.target.value)}
                        placeholder="Nome da Empresa"
                        className="font-semibold"
                      />
                      <Button
                        onClick={() => removeExperience(exp.id)}
                        size="sm"
                        variant="ghost"
                        className="ml-2"
                      >
                        <Trash2 className="w-4 h-4 text-red-500" />
                      </Button>
                    </div>
                    <Input
                      value={exp.position}
                      onChange={(e) => updateExperience(exp.id, "position", e.target.value)}
                      placeholder="Cargo"
                    />
                    <Input
                      value={exp.period}
                      onChange={(e) => updateExperience(exp.id, "period", e.target.value)}
                      placeholder="Jan 2020 - Dez 2023"
                    />
                    <Textarea
                      value={exp.description}
                      onChange={(e) => updateExperience(exp.id, "description", e.target.value)}
                      placeholder="Descreva suas responsabilidades e conquistas..."
                      rows={3}
                    />
                  </div>
                </Card>
              ))}
            </div>

            {/* Education */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold text-lg">Formação Acadêmica</h3>
                <Button onClick={addEducation} size="sm" variant="outline" className="gap-2">
                  <Plus className="w-4 h-4" />
                  Adicionar
                </Button>
              </div>
              {currentResume.education.map((edu) => (
                <Card key={edu.id} className="p-4">
                  <div className="space-y-3">
                    <div className="flex justify-between items-start">
                      <Input
                        value={edu.institution}
                        onChange={(e) => updateEducation(edu.id, "institution", e.target.value)}
                        placeholder="Nome da Instituição"
                        className="font-semibold"
                      />
                      <Button
                        onClick={() => removeEducation(edu.id)}
                        size="sm"
                        variant="ghost"
                        className="ml-2"
                      >
                        <Trash2 className="w-4 h-4 text-red-500" />
                      </Button>
                    </div>
                    <Input
                      value={edu.degree}
                      onChange={(e) => updateEducation(edu.id, "degree", e.target.value)}
                      placeholder="Curso / Grau"
                    />
                    <Input
                      value={edu.period}
                      onChange={(e) => updateEducation(edu.id, "period", e.target.value)}
                      placeholder="2018 - 2022"
                    />
                  </div>
                </Card>
              ))}
            </div>

            {/* Languages */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold text-lg">Idiomas</h3>
                <Button onClick={addLanguage} size="sm" variant="outline" className="gap-2">
                  <Plus className="w-4 h-4" />
                  Adicionar
                </Button>
              </div>
              {currentResume.languages.map((lang) => (
                <Card key={lang.id} className="p-4">
                  <div className="space-y-3">
                    <div className="flex justify-between items-start">
                      <Input
                        value={lang.language}
                        onChange={(e) => updateLanguage(lang.id, "language", e.target.value)}
                        placeholder="Nome do Idioma (ex: Inglês, Espanhol)"
                        className="font-semibold"
                      />
                      <Button
                        onClick={() => removeLanguage(lang.id)}
                        size="sm"
                        variant="ghost"
                        className="ml-2"
                      >
                        <Trash2 className="w-4 h-4 text-red-500" />
                      </Button>
                    </div>
                    <div>
                      <Label className="text-xs text-gray-600">Nível de Proficiência</Label>
                      <Select
                        value={lang.level}
                        onValueChange={(value) => updateLanguage(lang.id, "level", value)}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {languageLevels.map(level => (
                            <SelectItem key={level.value} value={level.value}>
                              {level.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <Input
                      value={lang.course}
                      onChange={(e) => updateLanguage(lang.id, "course", e.target.value)}
                      placeholder="Curso realizado (opcional)"
                    />
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <Label className="text-xs text-gray-600">Quando</Label>
                        <Input
                          value={lang.when}
                          onChange={(e) => updateLanguage(lang.id, "when", e.target.value)}
                          placeholder="Ex: 2020"
                        />
                      </div>
                      <div>
                        <Label className="text-xs text-gray-600">Duração</Label>
                        <Input
                          value={lang.duration}
                          onChange={(e) => updateLanguage(lang.id, "duration", e.target.value)}
                          placeholder="Ex: 2 anos"
                        />
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>

            {/* Skills */}
            <div className="space-y-4">
              <h3 className="font-semibold text-lg">Habilidades</h3>
              <div className="flex gap-2">
                <Input
                  placeholder="Digite uma habilidade e pressione Enter"
                  onKeyPress={(e) => {
                    if (e.key === "Enter") {
                      addSkill(e.currentTarget.value)
                      e.currentTarget.value = ""
                    }
                  }}
                />
              </div>
              <div className="flex flex-wrap gap-2">
                {currentResume.skills.map((skill, index) => (
                  <div
                    key={index}
                    className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm flex items-center gap-2"
                  >
                    {skill}
                    <button onClick={() => removeSkill(index)} className="hover:text-blue-900">
                      ×
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Preview Panel */}
      <div className="space-y-4 lg:sticky lg:top-24 lg:self-start">
        <div className="flex gap-2">
          <Button onClick={() => setPreviewMode(!previewMode)} variant="outline" className="gap-2 flex-1">
            {previewMode ? <Edit3 className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            {previewMode ? "Editar" : "Visualizar"}
          </Button>
          <Button onClick={downloadPDF} className="gap-2 flex-1">
            <Download className="w-4 h-4" />
            Download PDF
          </Button>
        </div>

        <Card className="overflow-hidden">
          <div ref={previewRef}>
            {renderResumePreview()}
          </div>
        </Card>
      </div>
    </div>
  )
}
