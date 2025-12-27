"use client"

import React, { createContext, useContext, useState, useEffect } from 'react'

type Language = 'pt-BR' | 'en'

interface LanguageContextType {
  language: Language
  setLanguage: (lang: Language) => void
  t: (key: string) => string
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<Language>('pt-BR')

  useEffect(() => {
    const savedLanguage = localStorage.getItem('language') as Language
    if (savedLanguage) {
      setLanguageState(savedLanguage)
    }
  }, [])

  const setLanguage = (lang: Language) => {
    setLanguageState(lang)
    localStorage.setItem('language', lang)
  }

  const t = (key: string): string => {
    const keys = key.split('.')
    let value: any = translations[language]
    
    for (const k of keys) {
      value = value?.[k]
    }
    
    return value || key
  }

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider')
  }
  return context
}

const translations = {
  'pt-BR': {
    header: {
      title: 'CurrículoPro',
      subtitle: 'Seu futuro começa aqui',
      editor: 'Editor',
      tips: 'Dicas',
      evaluation: 'Avaliação',
      editorFull: 'Editor de Currículos',
      tipsFull: 'Dicas de Entrevista',
      evaluationFull: 'Avaliação de Currículo'
    },
    footer: {
      description: 'Crie currículos profissionais e prepare-se para entrevistas com nossas dicas especializadas.',
      resources: 'Recursos',
      customTemplates: 'Modelos personalizáveis',
      pdfDownload: 'Download em PDF',
      autoEvaluation: 'Avaliação automatizada',
      tips: 'Dicas',
      interviewsByArea: 'Entrevistas por área',
      expertAdvice: 'Conselhos de especialistas',
      fullPreparation: 'Preparação completa',
      copyright: '© 2024 CurrículoPro. Todos os direitos reservados.'
    },
    resumeEditor: {
      title: 'Editor de Currículo',
      subtitle: 'Preencha suas informações profissionais',
      save: 'Salvar',
      new: 'Novo',
      template: 'Modelo',
      templates: {
        modern: 'Moderno',
        professional: 'Profissional',
        creative: 'Criativo',
        minimal: 'Minimalista'
      },
      personalInfo: 'Informações Pessoais',
      fullName: 'Nome Completo',
      fullNamePlaceholder: 'João Silva',
      email: 'Email',
      emailPlaceholder: 'joao@email.com',
      phone: 'Telefone',
      phonePlaceholder: '(11) 99999-9999',
      location: 'Localização',
      locationPlaceholder: 'São Paulo, SP',
      professionalSummary: 'Resumo Profissional',
      summaryPlaceholder: 'Descreva brevemente sua experiência e objetivos profissionais...',
      experience: 'Experiência Profissional',
      addExperience: 'Adicionar',
      companyPlaceholder: 'Nome da Empresa',
      position: 'Cargo',
      positionPlaceholder: 'Cargo',
      period: 'Período',
      periodPlaceholder: 'Jan 2020 - Dez 2023',
      descriptionPlaceholder: 'Descreva suas responsabilidades e conquistas...',
      education: 'Formação Acadêmica',
      addEducation: 'Adicionar',
      institutionPlaceholder: 'Nome da Instituição',
      degreePlaceholder: 'Curso / Grau',
      periodEducationPlaceholder: '2018 - 2022',
      skills: 'Habilidades',
      skillsPlaceholder: 'Digite uma habilidade e pressione Enter',
      edit: 'Editar',
      preview: 'Visualizar',
      downloadPDF: 'Download PDF',
      noResume: 'Nenhum currículo encontrado',
      createNew: 'Criar Novo Currículo',
      yourName: 'Seu Nome'
    },
    interviewTips: {
      title: 'Dicas de Entrevista',
      subtitle: 'Prepare-se para sua próxima entrevista com dicas especializadas para todos os cargos e áreas',
      searchPlaceholder: 'Buscar perguntas e dicas...',
      categories: {
        all: 'Todas as Áreas',
        tech: 'Tecnologia',
        health: 'Saúde',
        business: 'Negócios',
        hr: 'Recursos Humanos',
        engineering: 'Engenharia',
        education: 'Educação',
        retail: 'Varejo',
        logistics: 'Logística',
        executive: 'Executivos',
        management: 'Gestão',
        analyst: 'Analistas',
        specialist: 'Especialistas'
      },
      generalTipsTitle: 'Dicas Gerais para Entrevistas',
      frequentQuestions: 'Perguntas Frequentes',
      questionsCount: 'perguntas',
      noResults: 'Nenhuma pergunta encontrada. Tente outro termo de busca.'
    },
    evaluation: {
      title: 'Avaliação de Currículo',
      subtitle: 'Receba feedback automatizado e melhore seu currículo',
      pasteTitle: 'Cole seu currículo aqui',
      pasteDescription: 'Cole o texto do seu currículo para receber uma avaliação detalhada',
      placeholder: 'Cole o conteúdo do seu currículo aqui...',
      evaluate: 'Avaliar Currículo',
      evaluating: 'Avaliando...',
      overallScore: 'Pontuação Geral',
      excellent: 'Excelente',
      good: 'Bom',
      needsImprovement: 'Precisa Melhorar',
      excellentMessage: 'Parabéns! Seu currículo está muito bem estruturado.',
      goodMessage: 'Bom trabalho! Algumas melhorias podem tornar seu currículo ainda melhor.',
      needsImprovementMessage: 'Há espaço para melhorias significativas no seu currículo.',
      categoryEvaluation: 'Avaliação por Categoria',
      strengths: 'Pontos Fortes',
      improvements: 'Áreas para Melhorar',
      suggestions: 'Sugestões de Melhoria',
      categories: {
        contact: 'Informações de Contato',
        content: 'Conteúdo e Experiência',
        education: 'Formação Acadêmica',
        skills: 'Habilidades',
        formatting: 'Formatação'
      }
    }
  },
  'en': {
    header: {
      title: 'ResumePro',
      subtitle: 'Your future starts here',
      editor: 'Editor',
      tips: 'Tips',
      evaluation: 'Evaluation',
      editorFull: 'Resume Editor',
      tipsFull: 'Interview Tips',
      evaluationFull: 'Resume Evaluation'
    },
    footer: {
      description: 'Create professional resumes and prepare for interviews with our specialized tips.',
      resources: 'Resources',
      customTemplates: 'Customizable templates',
      pdfDownload: 'PDF Download',
      autoEvaluation: 'Automated evaluation',
      tips: 'Tips',
      interviewsByArea: 'Interviews by area',
      expertAdvice: 'Expert advice',
      fullPreparation: 'Complete preparation',
      copyright: '© 2024 ResumePro. All rights reserved.'
    },
    resumeEditor: {
      title: 'Resume Editor',
      subtitle: 'Fill in your professional information',
      save: 'Save',
      new: 'New',
      template: 'Template',
      templates: {
        modern: 'Modern',
        professional: 'Professional',
        creative: 'Creative',
        minimal: 'Minimal'
      },
      personalInfo: 'Personal Information',
      fullName: 'Full Name',
      fullNamePlaceholder: 'John Smith',
      email: 'Email',
      emailPlaceholder: 'john@email.com',
      phone: 'Phone',
      phonePlaceholder: '+1 (555) 123-4567',
      location: 'Location',
      locationPlaceholder: 'New York, NY',
      professionalSummary: 'Professional Summary',
      summaryPlaceholder: 'Briefly describe your experience and professional goals...',
      experience: 'Work Experience',
      addExperience: 'Add',
      companyPlaceholder: 'Company Name',
      position: 'Position',
      positionPlaceholder: 'Position',
      period: 'Period',
      periodPlaceholder: 'Jan 2020 - Dec 2023',
      descriptionPlaceholder: 'Describe your responsibilities and achievements...',
      education: 'Education',
      addEducation: 'Add',
      institutionPlaceholder: 'Institution Name',
      degreePlaceholder: 'Degree / Course',
      periodEducationPlaceholder: '2018 - 2022',
      skills: 'Skills',
      skillsPlaceholder: 'Type a skill and press Enter',
      edit: 'Edit',
      preview: 'Preview',
      downloadPDF: 'Download PDF',
      noResume: 'No resume found',
      createNew: 'Create New Resume',
      yourName: 'Your Name'
    },
    interviewTips: {
      title: 'Interview Tips',
      subtitle: 'Prepare for your next interview with specialized tips for all positions and areas',
      searchPlaceholder: 'Search questions and tips...',
      categories: {
        all: 'All Areas',
        tech: 'Technology',
        health: 'Healthcare',
        business: 'Business',
        hr: 'Human Resources',
        engineering: 'Engineering',
        education: 'Education',
        retail: 'Retail',
        logistics: 'Logistics',
        executive: 'Executive',
        management: 'Management',
        analyst: 'Analysts',
        specialist: 'Specialists'
      },
      generalTipsTitle: 'General Interview Tips',
      frequentQuestions: 'Frequently Asked Questions',
      questionsCount: 'questions',
      noResults: 'No questions found. Try another search term.'
    },
    evaluation: {
      title: 'Resume Evaluation',
      subtitle: 'Get automated feedback and improve your resume',
      pasteTitle: 'Paste your resume here',
      pasteDescription: 'Paste your resume text to receive a detailed evaluation',
      placeholder: 'Paste your resume content here...',
      evaluate: 'Evaluate Resume',
      evaluating: 'Evaluating...',
      overallScore: 'Overall Score',
      excellent: 'Excellent',
      good: 'Good',
      needsImprovement: 'Needs Improvement',
      excellentMessage: 'Congratulations! Your resume is very well structured.',
      goodMessage: 'Good job! Some improvements can make your resume even better.',
      needsImprovementMessage: 'There is room for significant improvements in your resume.',
      categoryEvaluation: 'Category Evaluation',
      strengths: 'Strengths',
      improvements: 'Areas for Improvement',
      suggestions: 'Improvement Suggestions',
      categories: {
        contact: 'Contact Information',
        content: 'Content and Experience',
        education: 'Education',
        skills: 'Skills',
        formatting: 'Formatting'
      }
    }
  }
}
