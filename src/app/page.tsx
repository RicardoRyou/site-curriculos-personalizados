"use client"

import { useState, useEffect } from "react"
import { FileText, Briefcase, Download, Star, Menu, X, CheckCircle, AlertCircle, Building2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import ResumeEditor from "@/components/custom/resume-editor"
import InterviewTips from "@/components/custom/interview-tips"
import ResumeEvaluation from "@/components/custom/resume-evaluation"
import { useLanguage } from "@/contexts/LanguageContext"

export default function Home() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [activeTab, setActiveTab] = useState("editor")
  const { t } = useLanguage()

  // Empresas brasileiras conhecidas
  const companies = [
    { name: "Petrobras", logo: "🛢️" },
    { name: "Itaú", logo: "🏦" },
    { name: "Bradesco", logo: "🏦" },
    { name: "Vale", logo: "⛏️" },
    { name: "Ambev", logo: "🍺" },
    { name: "Nubank", logo: "💜" },
    { name: "Magazine Luiza", logo: "🛒" },
    { name: "Natura", logo: "🌿" },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-200 shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="bg-gradient-to-br from-blue-600 to-green-600 p-2 rounded-xl shadow-lg">
                <FileText className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl md:text-2xl font-bold bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
                  {t('header.title')}
                </h1>
                <p className="text-xs text-gray-600 hidden sm:block">{t('header.subtitle')}</p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              {/* Desktop Navigation */}
              <nav className="hidden md:flex items-center gap-2">
                <Button
                  variant={activeTab === "editor" ? "default" : "ghost"}
                  onClick={() => setActiveTab("editor")}
                  className="gap-2"
                >
                  <FileText className="w-4 h-4" />
                  {t('header.editor')}
                </Button>
                <Button
                  variant={activeTab === "tips" ? "default" : "ghost"}
                  onClick={() => setActiveTab("tips")}
                  className="gap-2"
                >
                  <Briefcase className="w-4 h-4" />
                  {t('header.tips')}
                </Button>
                <Button
                  variant={activeTab === "evaluation" ? "default" : "ghost"}
                  onClick={() => setActiveTab("evaluation")}
                  className="gap-2"
                >
                  <Star className="w-4 h-4" />
                  {t('header.evaluation')}
                </Button>
              </nav>

              {/* Mobile Menu Button */}
              <Button
                variant="ghost"
                size="icon"
                className="md:hidden"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </Button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {mobileMenuOpen && (
            <nav className="md:hidden mt-4 pb-2 flex flex-col gap-2">
              <Button
                variant={activeTab === "editor" ? "default" : "ghost"}
                onClick={() => {
                  setActiveTab("editor")
                  setMobileMenuOpen(false)
                }}
                className="w-full justify-start gap-2"
              >
                <FileText className="w-4 h-4" />
                {t('header.editorFull')}
              </Button>
              <Button
                variant={activeTab === "tips" ? "default" : "ghost"}
                onClick={() => {
                  setActiveTab("tips")
                  setMobileMenuOpen(false)
                }}
                className="w-full justify-start gap-2"
              >
                <Briefcase className="w-4 h-4" />
                {t('header.tipsFull')}
              </Button>
              <Button
                variant={activeTab === "evaluation" ? "default" : "ghost"}
                onClick={() => {
                  setActiveTab("evaluation")
                  setMobileMenuOpen(false)
                }}
                className="w-full justify-start gap-2"
              >
                <Star className="w-4 h-4" />
                {t('header.evaluationFull')}
              </Button>
            </nav>
          )}
        </div>
      </header>

      {/* Hero Section - Success Stories */}
      <section className="bg-gradient-to-r from-blue-600 to-green-600 text-white py-12 md:py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Nossos usuários conquistaram vagas em grandes empresas!
            </h2>
            <p className="text-lg md:text-xl text-blue-100 max-w-3xl mx-auto">
              Milhares de profissionais já conseguiram emprego usando nossos currículos otimizados
            </p>
          </div>

          {/* Companies Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 max-w-5xl mx-auto">
            {companies.map((company, index) => (
              <div
                key={index}
                className="bg-white/10 backdrop-blur-sm rounded-xl p-6 flex flex-col items-center justify-center gap-3 hover:bg-white/20 transition-all duration-300 hover:scale-105 border border-white/20"
              >
                <div className="text-4xl md:text-5xl">{company.logo}</div>
                <p className="font-semibold text-sm md:text-base text-center">{company.name}</p>
              </div>
            ))}
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12 max-w-4xl mx-auto">
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-center border border-white/20">
              <div className="text-4xl font-bold mb-2">10.000+</div>
              <p className="text-blue-100">Currículos criados</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-center border border-white/20">
              <div className="text-4xl font-bold mb-2">85%</div>
              <p className="text-blue-100">Taxa de aprovação</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-center border border-white/20">
              <div className="text-4xl font-bold mb-2">500+</div>
              <p className="text-blue-100">Empresas parceiras</p>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {activeTab === "editor" && <ResumeEditor />}
        {activeTab === "tips" && <InterviewTips />}
        {activeTab === "evaluation" && <ResumeEvaluation />}
      </main>

      {/* Footer */}
      <footer className="bg-gradient-to-r from-blue-600 to-green-600 text-white mt-16">
        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="font-bold text-lg mb-3 flex items-center gap-2">
                <FileText className="w-5 h-5" />
                {t('header.title')}
              </h3>
              <p className="text-blue-100 text-sm">
                {t('footer.description')}
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-3">{t('footer.resources')}</h4>
              <ul className="space-y-2 text-sm text-blue-100">
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4" />
                  {t('footer.customTemplates')}
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4" />
                  {t('footer.pdfDownload')}
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4" />
                  {t('footer.autoEvaluation')}
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-3">{t('footer.tips')}</h4>
              <ul className="space-y-2 text-sm text-blue-100">
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4" />
                  {t('footer.interviewsByArea')}
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4" />
                  {t('footer.expertAdvice')}
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4" />
                  {t('footer.fullPreparation')}
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-blue-500 mt-8 pt-6 text-center text-sm text-blue-100">
            <p>{t('footer.copyright')}</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
