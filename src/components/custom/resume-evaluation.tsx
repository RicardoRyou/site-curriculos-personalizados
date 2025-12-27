"use client"

import { useState } from "react"
import { Upload, FileText, CheckCircle, AlertCircle, TrendingUp, Award, Target, Zap } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"

interface EvaluationResult {
  score: number
  strengths: string[]
  improvements: string[]
  suggestions: string[]
  categories: {
    name: string
    score: number
    feedback: string
  }[]
}

export default function ResumeEvaluation() {
  const [resumeText, setResumeText] = useState("")
  const [isEvaluating, setIsEvaluating] = useState(false)
  const [evaluation, setEvaluation] = useState<EvaluationResult | null>(null)

  const evaluateResume = () => {
    if (!resumeText.trim()) return

    setIsEvaluating(true)

    // Simulação de avaliação (em produção, isso seria uma API)
    setTimeout(() => {
      const wordCount = resumeText.split(/\s+/).length
      const hasEmail = /\S+@\S+\.\S+/.test(resumeText)
      const hasPhone = /\(\d{2}\)\s?\d{4,5}-?\d{4}/.test(resumeText)
      const hasExperience = /experiência|trabalh|empresa|cargo/i.test(resumeText)
      const hasEducation = /formação|graduação|curso|universidade/i.test(resumeText)
      const hasSkills = /habilidades|competências|skills/i.test(resumeText)

      let score = 50
      const strengths: string[] = []
      const improvements: string[] = []
      const suggestions: string[] = []

      // Análise de contato
      let contactScore = 50
      if (hasEmail) {
        contactScore += 25
        strengths.push("Email profissional incluído")
      } else {
        improvements.push("Adicione um email de contato")
      }
      if (hasPhone) {
        contactScore += 25
        strengths.push("Telefone de contato incluído")
      } else {
        improvements.push("Adicione um telefone de contato")
      }

      // Análise de conteúdo
      let contentScore = 40
      if (wordCount > 100) {
        contentScore += 20
        strengths.push("Currículo com conteúdo substancial")
      } else {
        improvements.push("Adicione mais detalhes sobre suas experiências")
      }
      if (wordCount < 500) {
        contentScore += 20
        strengths.push("Currículo conciso e objetivo")
      } else {
        suggestions.push("Considere resumir algumas seções para manter o currículo em 1-2 páginas")
      }
      if (hasExperience) {
        contentScore += 20
        strengths.push("Experiência profissional bem documentada")
      } else {
        improvements.push("Detalhe suas experiências profissionais")
      }

      // Análise de formação
      let educationScore = hasEducation ? 80 : 40
      if (hasEducation) {
        strengths.push("Formação acadêmica presente")
      } else {
        improvements.push("Adicione sua formação acadêmica")
      }

      // Análise de habilidades
      let skillsScore = hasSkills ? 85 : 45
      if (hasSkills) {
        strengths.push("Habilidades claramente listadas")
      } else {
        improvements.push("Crie uma seção de habilidades técnicas e comportamentais")
      }

      // Análise de formatação
      let formatScore = 70
      const hasSections = (resumeText.match(/\n\n/g) || []).length > 2
      if (hasSections) {
        formatScore += 15
        strengths.push("Boa organização em seções")
      } else {
        improvements.push("Organize o conteúdo em seções claras")
      }
      if (wordCount > 50 && wordCount < 600) {
        formatScore += 15
        strengths.push("Tamanho adequado para leitura")
      }

      // Sugestões gerais
      suggestions.push("Use verbos de ação para descrever suas responsabilidades")
      suggestions.push("Quantifique suas conquistas sempre que possível")
      suggestions.push("Adapte seu currículo para cada vaga específica")
      suggestions.push("Revise cuidadosamente para evitar erros de ortografia")

      const finalScore = Math.round((contactScore + contentScore + educationScore + skillsScore + formatScore) / 5)

      setEvaluation({
        score: finalScore,
        strengths,
        improvements,
        suggestions,
        categories: [
          {
            name: "Informações de Contato",
            score: contactScore,
            feedback: hasEmail && hasPhone 
              ? "Excelente! Todas as informações de contato essenciais estão presentes."
              : "Certifique-se de incluir email e telefone atualizados."
          },
          {
            name: "Conteúdo e Experiência",
            score: contentScore,
            feedback: hasExperience
              ? "Bom detalhamento das experiências profissionais."
              : "Adicione mais detalhes sobre suas experiências e conquistas."
          },
          {
            name: "Formação Acadêmica",
            score: educationScore,
            feedback: hasEducation
              ? "Formação acadêmica bem documentada."
              : "Inclua sua formação acadêmica completa."
          },
          {
            name: "Habilidades",
            score: skillsScore,
            feedback: hasSkills
              ? "Ótima apresentação de habilidades relevantes."
              : "Crie uma seção destacando suas principais habilidades."
          },
          {
            name: "Formatação",
            score: formatScore,
            feedback: "Mantenha uma formatação limpa e profissional com seções bem definidas."
          }
        ]
      })

      setIsEvaluating(false)
    }, 2000)
  }

  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-green-600"
    if (score >= 60) return "text-yellow-600"
    return "text-red-600"
  }

  const getScoreBgColor = (score: number) => {
    if (score >= 80) return "bg-green-500"
    if (score >= 60) return "bg-yellow-500"
    return "bg-red-500"
  }

  const getScoreLabel = (score: number) => {
    if (score >= 80) return "Excelente"
    if (score >= 60) return "Bom"
    return "Precisa Melhorar"
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card className="bg-gradient-to-r from-green-600 to-blue-600 text-white border-0">
        <CardHeader>
          <CardTitle className="text-2xl md:text-3xl flex items-center gap-3">
            <Award className="w-8 h-8" />
            Avaliação de Currículo
          </CardTitle>
          <CardDescription className="text-green-100">
            Receba feedback automatizado e melhore seu currículo
          </CardDescription>
        </CardHeader>
      </Card>

      {/* Input Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="w-5 h-5" />
            Cole seu currículo aqui
          </CardTitle>
          <CardDescription>
            Cole o texto do seu currículo para receber uma avaliação detalhada
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Textarea
            value={resumeText}
            onChange={(e) => setResumeText(e.target.value)}
            placeholder="Cole o conteúdo do seu currículo aqui...

Exemplo:
João Silva
Email: joao@email.com | Telefone: (11) 99999-9999

RESUMO PROFISSIONAL
Desenvolvedor Full Stack com 5 anos de experiência...

EXPERIÊNCIA PROFISSIONAL
Empresa XYZ - Desenvolvedor Senior (2020-2024)
- Liderou equipe de 5 desenvolvedores...
- Implementou sistema que aumentou eficiência em 40%...

FORMAÇÃO ACADÊMICA
Universidade ABC - Ciência da Computação (2015-2019)

HABILIDADES
JavaScript, React, Node.js, Python, SQL..."
            rows={12}
            className="font-mono text-sm"
          />
          <Button
            onClick={evaluateResume}
            disabled={!resumeText.trim() || isEvaluating}
            className="w-full sm:w-auto gap-2"
            size="lg"
          >
            {isEvaluating ? (
              <>
                <Zap className="w-5 h-5 animate-pulse" />
                Avaliando...
              </>
            ) : (
              <>
                <Target className="w-5 h-5" />
                Avaliar Currículo
              </>
            )}
          </Button>
        </CardContent>
      </Card>

      {/* Results Section */}
      {evaluation && (
        <div className="space-y-6 animate-in fade-in duration-500">
          {/* Overall Score */}
          <Card className="border-2 border-blue-200">
            <CardHeader>
              <CardTitle className="text-center">Pontuação Geral</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex flex-col items-center gap-4">
                <div className="relative">
                  <div className="w-32 h-32 rounded-full border-8 border-gray-200 flex items-center justify-center">
                    <div className={`text-4xl font-bold ${getScoreColor(evaluation.score)}`}>
                      {evaluation.score}
                    </div>
                  </div>
                  <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2">
                    <Badge className={getScoreBgColor(evaluation.score)}>
                      {getScoreLabel(evaluation.score)}
                    </Badge>
                  </div>
                </div>
                <p className="text-center text-gray-600 max-w-md">
                  {evaluation.score >= 80 && "Parabéns! Seu currículo está muito bem estruturado."}
                  {evaluation.score >= 60 && evaluation.score < 80 && "Bom trabalho! Algumas melhorias podem tornar seu currículo ainda melhor."}
                  {evaluation.score < 60 && "Há espaço para melhorias significativas no seu currículo."}
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Category Scores */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5" />
                Avaliação por Categoria
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {evaluation.categories.map((category, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-gray-900">{category.name}</span>
                    <span className={`font-bold ${getScoreColor(category.score)}`}>
                      {category.score}%
                    </span>
                  </div>
                  <Progress value={category.score} className="h-2" />
                  <p className="text-sm text-gray-600">{category.feedback}</p>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Strengths */}
          {evaluation.strengths.length > 0 && (
            <Card className="border-green-200 bg-green-50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-green-800">
                  <CheckCircle className="w-5 h-5" />
                  Pontos Fortes
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {evaluation.strengths.map((strength, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700">{strength}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          )}

          {/* Improvements */}
          {evaluation.improvements.length > 0 && (
            <Card className="border-orange-200 bg-orange-50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-orange-800">
                  <AlertCircle className="w-5 h-5" />
                  Áreas para Melhorar
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {evaluation.improvements.map((improvement, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <AlertCircle className="w-5 h-5 text-orange-600 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700">{improvement}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          )}

          {/* Suggestions */}
          {evaluation.suggestions.length > 0 && (
            <Card className="border-blue-200 bg-blue-50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-blue-800">
                  <Target className="w-5 h-5" />
                  Sugestões de Melhoria
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {evaluation.suggestions.map((suggestion, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <div className="bg-blue-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">
                        {index + 1}
                      </div>
                      <span className="text-gray-700">{suggestion}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          )}
        </div>
      )}
    </div>
  )
}
