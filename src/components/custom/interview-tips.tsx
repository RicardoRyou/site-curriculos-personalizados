"use client"

import { useState } from "react"
import { Search, Briefcase, Code, Heart, TrendingUp, Users, Wrench, BookOpen, ChevronDown, ChevronUp, Lightbulb, ShoppingCart, Package, Building2, UserCog, Crown, Target, ClipboardCheck, Award, Sparkles, Scale, GraduationCap, Dumbbell, DollarSign, Megaphone, ShoppingBag, Palette, Utensils, Plane, Home, Car, Stethoscope, Hammer, Shirt, Camera, Music, Scissors, Dog, Baby, Flower, Truck, Warehouse, Factory, HardHat, Zap, Droplet, Paintbrush, Cpu, Shield, Globe, Video, CheckCircle2, XCircle, AlertCircle, Info } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface Tip {
  id: string
  question: string
  answer: string
  category: string
}

interface VideoTip {
  id: string
  title: string
  description: string
  url: string
  duration: string
  category: string
}

const categories = [
  { id: "all", name: "Todas as Áreas", icon: Briefcase, color: "bg-blue-500" },
  { id: "tech", name: "Tecnologia", icon: Code, color: "bg-purple-500" },
  { id: "health", name: "Saúde", icon: Heart, color: "bg-red-500" },
  { id: "business", name: "Negócios", icon: TrendingUp, color: "bg-green-500" },
  { id: "hr", name: "Recursos Humanos", icon: Users, color: "bg-orange-500" },
  { id: "engineering", name: "Engenharia", icon: Wrench, color: "bg-gray-500" },
  { id: "education", name: "Educação", icon: BookOpen, color: "bg-yellow-500" },
  { id: "retail", name: "Varejo", icon: ShoppingCart, color: "bg-pink-500" },
  { id: "logistics", name: "Logística", icon: Package, color: "bg-indigo-500" },
  { id: "executive", name: "Executivos", icon: Crown, color: "bg-amber-600" },
  { id: "management", name: "Gestão", icon: Target, color: "bg-teal-500" },
  { id: "analyst", name: "Analistas", icon: ClipboardCheck, color: "bg-cyan-500" },
  { id: "specialist", name: "Especialistas", icon: Award, color: "bg-violet-500" },
  { id: "law", name: "Advocacia", icon: Scale, color: "bg-slate-700" },
  { id: "teacher", name: "Professor", icon: GraduationCap, color: "bg-blue-600" },
  { id: "fitness", name: "Personal Trainer", icon: Dumbbell, color: "bg-red-600" },
  { id: "finance", name: "Financeiro", icon: DollarSign, color: "bg-emerald-600" },
  { id: "marketing", name: "Marketing", icon: Megaphone, color: "bg-fuchsia-500" },
  { id: "sales", name: "Vendas", icon: ShoppingBag, color: "bg-orange-600" },
  { id: "design", name: "Design", icon: Palette, color: "bg-rose-500" },
  { id: "culinary", name: "Gastronomia", icon: Utensils, color: "bg-amber-500" },
  { id: "tourism", name: "Turismo", icon: Plane, color: "bg-sky-500" },
  { id: "realestate", name: "Imobiliário", icon: Home, color: "bg-lime-600" },
  { id: "automotive", name: "Automotivo", icon: Car, color: "bg-zinc-600" },
  { id: "construction", name: "Construção Civil", icon: HardHat, color: "bg-orange-700" },
  { id: "fashion", name: "Moda", icon: Shirt, color: "bg-purple-600" },
  { id: "photography", name: "Fotografia", icon: Camera, color: "bg-gray-700" },
  { id: "music", name: "Música", icon: Music, color: "bg-indigo-600" },
  { id: "beauty", name: "Beleza e Estética", icon: Scissors, color: "bg-pink-600" },
  { id: "veterinary", name: "Veterinária", icon: Dog, color: "bg-green-600" },
  { id: "childcare", name: "Cuidados Infantis", icon: Baby, color: "bg-blue-400" },
  { id: "agriculture", name: "Agricultura", icon: Flower, color: "bg-lime-700" },
  { id: "transport", name: "Transporte", icon: Truck, color: "bg-slate-600" },
  { id: "warehouse", name: "Armazenagem", icon: Warehouse, color: "bg-gray-600" },
  { id: "manufacturing", name: "Manufatura", icon: Factory, color: "bg-zinc-700" },
  { id: "maintenance", name: "Manutenção", icon: Hammer, color: "bg-yellow-700" },
  { id: "electrical", name: "Elétrica", icon: Zap, color: "bg-yellow-600" },
  { id: "plumbing", name: "Hidráulica", icon: Droplet, color: "bg-blue-700" },
  { id: "painting", name: "Pintura", icon: Paintbrush, color: "bg-teal-600" },
  { id: "it", name: "TI e Suporte", icon: Cpu, color: "bg-purple-700" },
  { id: "security", name: "Segurança", icon: Shield, color: "bg-red-700" },
  { id: "consulting", name: "Consultoria", icon: Globe, color: "bg-cyan-700" },
]

const videoTips: VideoTip[] = [
  {
    id: "v1",
    title: "Como se Comportar em uma Entrevista de Emprego",
    description: "Aprenda as melhores práticas de comportamento, linguagem corporal e comunicação para impressionar o recrutador.",
    url: "https://www.youtube.com/watch?v=naIkpQ_cIt0",
    duration: "12:45",
    category: "comportamento"
  },
  {
    id: "v2",
    title: "Linguagem Corporal na Entrevista",
    description: "Descubra como sua postura, gestos e expressões faciais podem influenciar positivamente sua entrevista.",
    url: "https://www.youtube.com/watch?v=PCRx20qXYfk",
    duration: "8:30",
    category: "comportamento"
  },
  {
    id: "v3",
    title: "Como Responder 'Fale Sobre Você'",
    description: "Estratégias eficazes para responder a pergunta mais comum em entrevistas de forma memorável e profissional.",
    url: "https://www.youtube.com/watch?v=es7XtrloDIQ",
    duration: "10:15",
    category: "perguntas"
  },
  {
    id: "v4",
    title: "Erros Mais Comuns em Entrevistas",
    description: "Conheça os principais erros que candidatos cometem e como evitá-los para aumentar suas chances de sucesso.",
    url: "https://www.youtube.com/watch?v=Tt08KmFfIYQ",
    duration: "15:20",
    category: "dicas"
  },
  {
    id: "v5",
    title: "Como Negociar Salário na Entrevista",
    description: "Técnicas profissionais para negociar sua remuneração com confiança e obter a melhor oferta possível.",
    url: "https://www.youtube.com/watch?v=WChJzRqVxuQ",
    duration: "11:40",
    category: "negociacao"
  },
  {
    id: "v6",
    title: "Preparação Completa para Entrevista",
    description: "Guia passo a passo de tudo que você precisa fazer antes, durante e depois da entrevista.",
    url: "https://www.youtube.com/watch?v=HG68Ymazo18",
    duration: "18:50",
    category: "preparacao"
  },
  {
    id: "v7",
    title: "Entrevista Online: Dicas Essenciais",
    description: "Como se destacar em entrevistas virtuais, configurar seu ambiente e usar a tecnologia a seu favor.",
    url: "https://www.youtube.com/watch?v=Qvw9vN_GGXU",
    duration: "9:25",
    category: "online"
  },
  {
    id: "v8",
    title: "Perguntas para Fazer ao Entrevistador",
    description: "Aprenda quais perguntas inteligentes fazer para demonstrar interesse e avaliar se a empresa é ideal para você.",
    url: "https://www.youtube.com/watch?v=Y95eI-ek_E8",
    duration: "7:55",
    category: "perguntas"
  }
]

const interviewTips: Tip[] = [
  // Geral (expandido)
  {
    id: "1",
    question: "Fale sobre você",
    answer: "Prepare um resumo de 2-3 minutos destacando sua formação, experiências relevantes e o que você busca. Foque em conquistas mensuráveis e conecte sua história com a vaga.",
    category: "all"
  },
  {
    id: "2",
    question: "Quais são seus pontos fortes?",
    answer: "Escolha 2-3 pontos fortes relevantes para a vaga. Use exemplos concretos de como você aplicou essas qualidades e os resultados obtidos. Seja específico e honesto.",
    category: "all"
  },
  {
    id: "3",
    question: "Quais são seus pontos fracos?",
    answer: "Escolha uma fraqueza real mas não crítica para a função. Mostre autoconsciência e, principalmente, explique as ações que você está tomando para melhorar.",
    category: "all"
  },
  {
    id: "4",
    question: "Por que você quer trabalhar aqui?",
    answer: "Pesquise sobre a empresa antes. Mencione valores alinhados, projetos interessantes, cultura organizacional ou oportunidades de crescimento específicas. Seja genuíno.",
    category: "all"
  },
  {
    id: "5",
    question: "Onde você se vê em 5 anos?",
    answer: "Demonstre ambição realista e alinhamento com a carreira na empresa. Foque em desenvolvimento de habilidades, contribuições crescentes e possível progressão na área.",
    category: "all"
  },
  {
    id: "6a",
    question: "Por que devemos contratar você?",
    answer: "Combine suas habilidades únicas com as necessidades da empresa. Destaque experiências relevantes, resultados comprovados e como você pode agregar valor imediato ao time.",
    category: "all"
  },
  {
    id: "7a",
    question: "Conte sobre um desafio que você superou",
    answer: "Use o método STAR: descreva a Situação, a Tarefa, as Ações que tomou e os Resultados alcançados. Foque em como você cresceu com a experiência.",
    category: "all"
  },
  {
    id: "8a",
    question: "Como você lida com críticas?",
    answer: "Demonstre maturidade emocional. Explique como você ouve feedback com mente aberta, reflete sobre ele, implementa melhorias e agradece pela oportunidade de crescimento.",
    category: "all"
  },

  // Tecnologia (expandido para 8 perguntas)
  {
    id: "6",
    question: "Descreva um projeto técnico desafiador que você trabalhou",
    answer: "Use o método STAR (Situação, Tarefa, Ação, Resultado). Explique o problema técnico, sua abordagem, tecnologias usadas e o impacto mensurável da solução.",
    category: "tech"
  },
  {
    id: "7",
    question: "Como você se mantém atualizado com novas tecnologias?",
    answer: "Mencione recursos específicos: cursos online, conferências, blogs técnicos, projetos pessoais, comunidades de desenvolvedores. Dê exemplos recentes de aprendizado.",
    category: "tech"
  },
  {
    id: "8",
    question: "Explique um bug complexo que você resolveu",
    answer: "Descreva o problema, seu processo de debugging (logs, testes, reprodução), como identificou a causa raiz e a solução implementada. Mostre pensamento analítico.",
    category: "tech"
  },
  {
    id: "9",
    question: "Como você garante a qualidade do código?",
    answer: "Fale sobre testes (unitários, integração), code reviews, padrões de código, documentação, CI/CD. Dê exemplos de como essas práticas evitaram problemas.",
    category: "tech"
  },
  {
    id: "9a",
    question: "Descreva sua experiência com trabalho em equipe ágil",
    answer: "Explique metodologias que você usou (Scrum, Kanban), seu papel em sprints, como você colabora com o time, participa de dailies e contribui para retrospectivas.",
    category: "tech"
  },
  {
    id: "9b",
    question: "Como você lida com prazos apertados em projetos?",
    answer: "Priorize funcionalidades críticas, comunique riscos antecipadamente, negocie escopo quando possível, mantenha qualidade mínima e trabalhe de forma focada sem comprometer saúde.",
    category: "tech"
  },
  {
    id: "9c",
    question: "Qual foi seu maior erro técnico e o que aprendeu?",
    answer: "Seja honesto sobre um erro real, explique o contexto, como você identificou e corrigiu, o impacto, e principalmente as lições aprendidas e mudanças implementadas.",
    category: "tech"
  },
  {
    id: "9d",
    question: "Como você aborda a refatoração de código legado?",
    answer: "Analise o código existente, identifique pontos críticos, crie testes antes de modificar, refatore incrementalmente, documente mudanças e garanta que funcionalidades continuem operando.",
    category: "tech"
  },

  // Saúde (expandido para 6 perguntas)
  {
    id: "10",
    question: "Como você lida com situações de emergência?",
    answer: "Demonstre calma sob pressão, capacidade de priorização, trabalho em equipe e seguimento de protocolos. Use exemplos reais mantendo confidencialidade dos pacientes.",
    category: "health"
  },
  {
    id: "11",
    question: "Como você lida com pacientes difíceis?",
    answer: "Enfatize empatia, escuta ativa, paciência e comunicação clara. Explique como você mantém profissionalismo mesmo em situações desafiadoras.",
    category: "health"
  },
  {
    id: "12",
    question: "Como você se mantém atualizado na área da saúde?",
    answer: "Mencione educação continuada, congressos, publicações científicas, treinamentos e certificações. Mostre compromisso com excelência no cuidado ao paciente.",
    category: "health"
  },
  {
    id: "12a",
    question: "Descreva uma situação onde você teve que tomar uma decisão rápida",
    answer: "Use STAR para explicar a urgência, como você avaliou opções rapidamente, a decisão tomada baseada em protocolos e conhecimento, e o resultado para o paciente.",
    category: "health"
  },
  {
    id: "12b",
    question: "Como você trabalha em equipe multidisciplinar?",
    answer: "Demonstre respeito por outros profissionais, comunicação efetiva, colaboração em planos de cuidado, compartilhamento de informações e foco no bem-estar do paciente.",
    category: "health"
  },
  {
    id: "12c",
    question: "Como você lida com o estresse e burnout na área da saúde?",
    answer: "Fale sobre autocuidado, limites saudáveis, apoio de colegas, técnicas de gerenciamento de estresse, busca por ajuda quando necessário e manutenção do equilíbrio vida-trabalho.",
    category: "health"
  },

  // Negócios (expandido para 6 perguntas)
  {
    id: "13",
    question: "Descreva uma negociação bem-sucedida",
    answer: "Use o método STAR. Explique os interesses de ambas as partes, sua estratégia de negociação, como criou valor mútuo e os resultados alcançados.",
    category: "business"
  },
  {
    id: "14",
    question: "Como você analisa a viabilidade de um novo negócio?",
    answer: "Fale sobre análise de mercado, concorrência, viabilidade financeira, riscos, oportunidades. Mencione frameworks como SWOT, Canvas ou análise de Porter.",
    category: "business"
  },
  {
    id: "15",
    question: "Como você lida com metas agressivas?",
    answer: "Demonstre planejamento estratégico, priorização, delegação eficaz e monitoramento de KPIs. Use exemplos de metas desafiadoras que você alcançou ou superou.",
    category: "business"
  },
  {
    id: "15a",
    question: "Como você identifica oportunidades de crescimento?",
    answer: "Analise tendências de mercado, ouça feedback de clientes, monitore concorrência, identifique gaps no mercado, avalie capacidades internas e teste hipóteses com MVPs.",
    category: "business"
  },
  {
    id: "15b",
    question: "Descreva sua experiência com gestão de stakeholders",
    answer: "Explique como você identifica stakeholders-chave, entende suas necessidades, mantém comunicação regular, gerencia expectativas e constrói relacionamentos de longo prazo.",
    category: "business"
  },
  {
    id: "15c",
    question: "Como você toma decisões estratégicas com informações limitadas?",
    answer: "Use dados disponíveis, consulte especialistas, avalie riscos e benefícios, considere cenários alternativos, tome decisão informada e esteja preparado para ajustar o curso.",
    category: "business"
  },

  // RH (expandido para 6 perguntas)
  {
    id: "16",
    question: "Como você resolve conflitos entre funcionários?",
    answer: "Enfatize escuta imparcial, mediação, busca por soluções win-win e seguimento de políticas da empresa. Mantenha confidencialidade ao dar exemplos.",
    category: "hr"
  },
  {
    id: "17",
    question: "Como você avalia o fit cultural de um candidato?",
    answer: "Fale sobre entendimento dos valores da empresa, perguntas comportamentais específicas, avaliação de soft skills e alinhamento de expectativas.",
    category: "hr"
  },
  {
    id: "18",
    question: "Como você mede o sucesso de iniciativas de RH?",
    answer: "Mencione métricas como turnover, engajamento, tempo de contratação, satisfação dos funcionários, ROI de treinamentos. Use dados para demonstrar impacto.",
    category: "hr"
  },
  {
    id: "18a",
    question: "Como você desenvolve programas de retenção de talentos?",
    answer: "Identifique fatores de satisfação, crie planos de carreira, ofereça desenvolvimento contínuo, reconheça contribuições, promova equilíbrio vida-trabalho e monitore indicadores.",
    category: "hr"
  },
  {
    id: "18b",
    question: "Descreva sua experiência com processos de onboarding",
    answer: "Explique como você estrutura a integração, apresenta cultura e valores, facilita conexões com o time, define expectativas claras e acompanha os primeiros meses.",
    category: "hr"
  },
  {
    id: "18c",
    question: "Como você lida com questões sensíveis de compliance e ética?",
    answer: "Demonstre conhecimento de legislação trabalhista, confidencialidade, imparcialidade, seguimento de políticas, documentação adequada e busca por orientação jurídica quando necessário.",
    category: "hr"
  },

  // Engenharia (expandido para 6 perguntas)
  {
    id: "19",
    question: "Descreva um projeto de engenharia complexo que você liderou",
    answer: "Use STAR. Explique escopo, desafios técnicos, gestão de equipe, orçamento, prazos e resultados. Destaque inovações ou otimizações implementadas.",
    category: "engineering"
  },
  {
    id: "20",
    question: "Como você garante segurança em projetos de engenharia?",
    answer: "Fale sobre normas técnicas, análise de riscos, inspeções, documentação, treinamento de equipe. Dê exemplos de como preveniu acidentes ou problemas.",
    category: "engineering"
  },
  {
    id: "20a",
    question: "Como você lida com mudanças de escopo durante o projeto?",
    answer: "Avalie impacto técnico e financeiro, documente formalmente, comunique stakeholders, ajuste cronograma e recursos, obtenha aprovações e atualize documentação do projeto.",
    category: "engineering"
  },
  {
    id: "20b",
    question: "Descreva sua experiência com otimização de processos",
    answer: "Identifique gargalos, colete dados, analise causas raiz, proponha melhorias baseadas em engenharia, implemente mudanças, monitore resultados e ajuste continuamente.",
    category: "engineering"
  },
  {
    id: "20c",
    question: "Como você equilibra qualidade técnica com restrições de custo?",
    answer: "Priorize requisitos críticos, busque alternativas criativas, negocie com fornecedores, otimize processos, mantenha padrões mínimos de segurança e qualidade.",
    category: "engineering"
  },
  {
    id: "20d",
    question: "Como você gerencia equipes técnicas multidisciplinares?",
    answer: "Estabeleça comunicação clara, respeite especialidades de cada área, facilite colaboração, resolva conflitos técnicos, alinhe objetivos e reconheça contribuições individuais.",
    category: "engineering"
  },

  // Educação (expandido para 6 perguntas)
  {
    id: "21",
    question: "Como você adapta seu ensino para diferentes estilos de aprendizagem?",
    answer: "Mencione metodologias variadas (visual, auditivo, cinestésico), uso de tecnologia, avaliações diversificadas e atenção individual. Dê exemplos práticos.",
    category: "education"
  },
  {
    id: "22",
    question: "Como você lida com alunos com dificuldades de aprendizagem?",
    answer: "Demonstre paciência, estratégias de ensino diferenciadas, colaboração com pais e especialistas, e compromisso com o sucesso de todos os alunos.",
    category: "education"
  },
  {
    id: "22a",
    question: "Como você avalia o progresso dos alunos de forma justa?",
    answer: "Use múltiplas formas de avaliação (provas, trabalhos, participação), considere progresso individual, forneça feedback construtivo, adapte critérios quando necessário.",
    category: "education"
  },
  {
    id: "22b",
    question: "Descreva uma estratégia inovadora que você implementou em sala",
    answer: "Explique o problema identificado, a solução criativa desenvolvida, como você implementou, reação dos alunos e resultados mensuráveis no aprendizado.",
    category: "education"
  },
  {
    id: "22c",
    question: "Como você mantém os alunos motivados e engajados?",
    answer: "Conecte conteúdo com realidade dos alunos, use metodologias ativas, celebre conquistas, crie ambiente positivo, varie atividades e demonstre entusiasmo pela matéria.",
    category: "education"
  },
  {
    id: "22d",
    question: "Como você lida com pais preocupados ou exigentes?",
    answer: "Mantenha comunicação aberta e respeitosa, ouça preocupações, compartilhe observações objetivas, colabore em soluções, estabeleça expectativas realistas e documente interações.",
    category: "education"
  },

  // Varejo (expandido para 6 perguntas)
  {
    id: "23",
    question: "Como você lida com filas longas e clientes impacientes?",
    answer: "Mantenha a calma, seja eficiente sem sacrificar a precisão, comunique-se educadamente com os clientes, peça ajuda quando necessário e mantenha um sorriso profissional.",
    category: "retail"
  },
  {
    id: "24",
    question: "O que você faz se perceber um erro no troco?",
    answer: "Seja honesto imediatamente, corrija o erro com transparência, informe o supervisor se necessário e documente a situação. A integridade é fundamental no cargo de caixa.",
    category: "retail"
  },
  {
    id: "25",
    question: "Como você lida com clientes difíceis ou insatisfeitos?",
    answer: "Ouça ativamente sem interromper, demonstre empatia, mantenha a calma, ofereça soluções dentro das políticas da loja e chame um supervisor quando necessário.",
    category: "retail"
  },
  {
    id: "26",
    question: "Descreva sua experiência com sistemas de ponto de venda (PDV)",
    answer: "Mencione sistemas específicos que você conhece, sua velocidade de aprendizado com novas tecnologias, atenção aos detalhes e capacidade de resolver problemas técnicos básicos.",
    category: "retail"
  },
  {
    id: "26a",
    question: "Como você aumenta as vendas através de upselling?",
    answer: "Identifique necessidades do cliente, sugira produtos complementares de forma natural, destaque benefícios, respeite o orçamento do cliente e evite ser insistente.",
    category: "retail"
  },
  {
    id: "26b",
    question: "Como você lida com tentativas de fraude ou furto?",
    answer: "Siga protocolos de segurança da loja, mantenha vigilância discreta, não confronte diretamente, acione segurança ou gerência, documente incidentes e priorize sua segurança.",
    category: "retail"
  },

  // Logística (expandido para 6 perguntas)
  {
    id: "27",
    question: "Como você organiza e mantém o controle do estoque?",
    answer: "Fale sobre sistemas de organização (FIFO/LIFO), uso de códigos e etiquetas, inventários regulares, atenção a datas de validade e manutenção da limpeza e ordem.",
    category: "logistics"
  },
  {
    id: "28",
    question: "Como você lida com divergências no inventário?",
    answer: "Investigue a causa (erro de contagem, furto, erro de sistema), documente adequadamente, comunique ao supervisor, implemente medidas preventivas e refaça a contagem.",
    category: "logistics"
  },
  {
    id: "29",
    question: "Descreva sua experiência com equipamentos de movimentação de carga",
    answer: "Mencione equipamentos que você opera (empilhadeira, paleteira, transpalete), certificações que possui, práticas de segurança e manutenção preventiva.",
    category: "logistics"
  },
  {
    id: "30",
    question: "Como você prioriza tarefas quando há múltiplas demandas urgentes?",
    answer: "Avalie a urgência e impacto de cada tarefa, comunique-se com a equipe, organize por prioridade (produtos perecíveis, pedidos urgentes), e mantenha o supervisor informado.",
    category: "logistics"
  },
  {
    id: "30a",
    question: "Como você garante a acuracidade no picking e packing?",
    answer: "Siga procedimentos padrão, confira códigos e quantidades, use tecnologia de verificação, organize workspace, mantenha foco, faça double-check em pedidos críticos.",
    category: "logistics"
  },
  {
    id: "30b",
    question: "Descreva sua experiência com sistemas WMS",
    answer: "Explique sistemas que você usou, funcionalidades principais, como você otimiza processos através do sistema, resolução de problemas e treinamento de novos usuários.",
    category: "logistics"
  },

  // Executivos (mantido em 5 perguntas - já está bem completo)
  {
    id: "31",
    question: "Qual sua visão estratégica para os próximos 3-5 anos?",
    answer: "Demonstre pensamento estratégico de longo prazo, análise de tendências de mercado, inovação, sustentabilidade financeira e alinhamento com a missão da empresa.",
    category: "executive"
  },
  {
    id: "32",
    question: "Como você lida com crises e situações de alto risco?",
    answer: "Mostre liderança sob pressão, tomada de decisão baseada em dados, comunicação transparente com stakeholders, gestão de riscos e capacidade de mobilizar recursos rapidamente.",
    category: "executive"
  },
  {
    id: "33",
    question: "Descreva uma transformação organizacional que você liderou",
    answer: "Use STAR detalhando o contexto, desafios, estratégia de mudança, gestão de resistências, resultados financeiros e impacto cultural. Mostre liderança transformacional.",
    category: "executive"
  },
  {
    id: "34",
    question: "Como você equilibra crescimento com sustentabilidade financeira?",
    answer: "Fale sobre análise de ROI, gestão de fluxo de caixa, investimentos estratégicos, controle de custos, diversificação de receitas e planejamento financeiro de longo prazo.",
    category: "executive"
  },
  {
    id: "35",
    question: "Qual seu estilo de liderança e como você desenvolve talentos?",
    answer: "Descreva seu estilo (transformacional, situacional, etc.), programas de desenvolvimento, sucessão, mentoria, cultura de feedback e como você constrói equipes de alta performance.",
    category: "executive"
  },

  // Gestão (expandido para 8 perguntas)
  {
    id: "36",
    question: "Como você motiva uma equipe desmotivada?",
    answer: "Identifique as causas da desmotivação, ouça individualmente, reconheça conquistas, estabeleça metas claras, ofereça desenvolvimento e crie um ambiente de trabalho positivo.",
    category: "management"
  },
  {
    id: "37",
    question: "Descreva como você gerencia conflitos dentro da equipe",
    answer: "Aja rapidamente, ouça todas as partes imparcialmente, busque a raiz do problema, facilite o diálogo construtivo, encontre soluções colaborativas e faça follow-up.",
    category: "management"
  },
  {
    id: "38",
    question: "Como você delega tarefas e responsabilidades?",
    answer: "Avalie competências da equipe, comunique expectativas claramente, forneça recursos necessários, estabeleça prazos realistas, acompanhe o progresso e dê autonomia com suporte.",
    category: "management"
  },
  {
    id: "39",
    question: "Como você mede o desempenho da sua equipe?",
    answer: "Use KPIs específicos, estabeleça metas SMART, faça avaliações regulares, forneça feedback contínuo, reconheça bom desempenho e crie planos de melhoria quando necessário.",
    category: "management"
  },
  {
    id: "40",
    question: "Descreva uma situação onde você teve que tomar uma decisão impopular",
    answer: "Explique o contexto, a decisão tomada, como você comunicou transparentemente, lidou com resistências, manteve a equipe engajada e os resultados alcançados.",
    category: "management"
  },
  {
    id: "41",
    question: "Como você desenvolve as habilidades da sua equipe?",
    answer: "Identifique gaps de competências, crie planos de desenvolvimento individual, ofereça treinamentos, delegue projetos desafiadores, faça mentoria e acompanhe o progresso.",
    category: "management"
  },
  {
    id: "41a",
    question: "Como você lida com membros da equipe de baixo desempenho?",
    answer: "Identifique causas do baixo desempenho, tenha conversas honestas, estabeleça plano de melhoria com metas claras, ofereça suporte e recursos, monitore progresso e tome ações quando necessário.",
    category: "management"
  },
  {
    id: "41b",
    question: "Como você gerencia mudanças organizacionais com sua equipe?",
    answer: "Comunique mudanças claramente e antecipadamente, explique o 'porquê', ouça preocupações, envolva a equipe no processo, ofereça suporte durante transição e celebre marcos.",
    category: "management"
  },

  // Analistas (expandido para 7 perguntas)
  {
    id: "42",
    question: "Como você aborda a análise de um problema complexo?",
    answer: "Defina o problema claramente, colete dados relevantes, use ferramentas analíticas apropriadas, identifique padrões, valide hipóteses e apresente insights acionáveis com recomendações.",
    category: "analyst"
  },
  {
    id: "43",
    question: "Quais ferramentas e metodologias você usa para análise de dados?",
    answer: "Mencione ferramentas específicas (Excel, SQL, Python, Power BI, Tableau), metodologias (análise estatística, modelagem preditiva) e como você escolhe a abordagem adequada.",
    category: "analyst"
  },
  {
    id: "44",
    question: "Como você comunica insights complexos para não-especialistas?",
    answer: "Use visualizações claras, evite jargões técnicos, conte histórias com dados, foque no impacto para o negócio, use analogias e adapte a comunicação ao público.",
    category: "analyst"
  },
  {
    id: "45",
    question: "Descreva um projeto onde sua análise gerou impacto significativo",
    answer: "Use STAR detalhando o problema de negócio, sua abordagem analítica, insights descobertos, recomendações implementadas e resultados mensuráveis (economia, receita, eficiência).",
    category: "analyst"
  },
  {
    id: "46",
    question: "Como você garante a qualidade e precisão das suas análises?",
    answer: "Valide fontes de dados, faça limpeza e tratamento adequado, use múltiplas fontes quando possível, documente metodologia, faça peer review e teste suas conclusões.",
    category: "analyst"
  },
  {
    id: "46a",
    question: "Como você lida com dados incompletos ou inconsistentes?",
    answer: "Documente limitações, busque fontes alternativas, use técnicas de imputação quando apropriado, comunique incertezas, faça análise de sensibilidade e seja transparente sobre premissas.",
    category: "analyst"
  },
  {
    id: "46b",
    question: "Descreva sua experiência com análise preditiva ou machine learning",
    answer: "Explique projetos onde você aplicou modelos preditivos, algoritmos usados, processo de validação, métricas de performance, implementação e impacto nos resultados de negócio.",
    category: "analyst"
  },

  // Especialistas (expandido para 7 perguntas)
  {
    id: "47",
    question: "Como você se mantém atualizado na sua área de especialização?",
    answer: "Participe de conferências, leia publicações especializadas, faça cursos avançados, participe de comunidades profissionais, conduza pesquisas e compartilhe conhecimento.",
    category: "specialist"
  },
  {
    id: "48",
    question: "Descreva uma situação onde você foi consultado como especialista",
    answer: "Explique o problema complexo, como você aplicou seu conhecimento especializado, as soluções propostas, como você treinou outros e o impacto da sua expertise.",
    category: "specialist"
  },
  {
    id: "49",
    question: "Como você lida com situações onde não tem todas as respostas?",
    answer: "Seja honesto sobre limitações, pesquise fontes confiáveis, consulte outros especialistas, use pensamento crítico, teste hipóteses e comunique incertezas de forma transparente.",
    category: "specialist"
  },
  {
    id: "50",
    question: "Como você equilibra profundidade técnica com comunicação efetiva?",
    answer: "Adapte o nível de detalhe ao público, use analogias e exemplos práticos, crie documentação em camadas (executiva e técnica), e valide o entendimento continuamente.",
    category: "specialist"
  },
  {
    id: "51",
    question: "Descreva uma inovação ou melhoria que você implementou na sua área",
    answer: "Use STAR explicando o problema identificado, sua solução inovadora, como você superou resistências, implementação prática e resultados mensuráveis (tempo, custo, qualidade).",
    category: "specialist"
  },
  {
    id: "51a",
    question: "Como você treina e mentora outros profissionais?",
    answer: "Avalie nível de conhecimento, adapte abordagem de ensino, use exemplos práticos, encoraje perguntas, forneça feedback construtivo, acompanhe progresso e celebre conquistas.",
    category: "specialist"
  },
  {
    id: "51b",
    question: "Como você avalia novas metodologias ou tecnologias na sua área?",
    answer: "Pesquise evidências científicas, avalie aplicabilidade ao contexto, faça testes piloto, compare com métodos atuais, considere custo-benefício e implemente gradualmente.",
    category: "specialist"
  },

  // Advocacia (expandido para 6 perguntas)
  {
    id: "52",
    question: "Como você constrói uma estratégia jurídica para um caso complexo?",
    answer: "Analise profundamente os fatos, pesquise jurisprudência relevante, identifique precedentes favoráveis, avalie riscos e benefícios de diferentes abordagens, e desenvolva argumentos sólidos baseados em lei e doutrina.",
    category: "law"
  },
  {
    id: "53",
    question: "Como você lida com clientes insatisfeitos com resultados judiciais?",
    answer: "Mantenha comunicação transparente desde o início sobre expectativas realistas, explique as razões jurídicas do resultado, demonstre empatia, revise opções de recurso e mantenha profissionalismo.",
    category: "law"
  },
  {
    id: "54",
    question: "Descreva sua experiência com negociações e acordos extrajudiciais",
    answer: "Explique como você avalia quando um acordo é vantajoso, sua estratégia de negociação, como você protege os interesses do cliente, e exemplos de acordos bem-sucedidos que você mediou.",
    category: "law"
  },
  {
    id: "55",
    question: "Como você se mantém atualizado com mudanças na legislação?",
    answer: "Acompanhe publicações do Diário Oficial, participe de cursos de atualização, leia doutrinas especializadas, participe de grupos de estudo, e use plataformas jurídicas de pesquisa.",
    category: "law"
  },
  {
    id: "55a",
    question: "Como você gerencia múltiplos casos simultaneamente?",
    answer: "Use sistema de gestão de processos, priorize por prazos e urgência, delegue tarefas quando possível, mantenha comunicação regular com clientes, organize documentação e monitore prazos processuais.",
    category: "law"
  },
  {
    id: "55b",
    question: "Descreva uma situação onde você teve que lidar com questões éticas complexas",
    answer: "Explique o dilema ético, como você consultou o código de ética da OAB, buscou orientação quando necessário, priorizou interesses do cliente dentro dos limites legais e manteve integridade profissional.",
    category: "law"
  },

  // Professor (expandido para 6 perguntas)
  {
    id: "56",
    question: "Como você mantém os alunos engajados durante as aulas?",
    answer: "Use metodologias ativas, varie as estratégias de ensino, conecte o conteúdo com a realidade dos alunos, use tecnologia de forma criativa, promova discussões e atividades práticas.",
    category: "teacher"
  },
  {
    id: "57",
    question: "Como você avalia o progresso dos alunos além de provas tradicionais?",
    answer: "Use avaliação formativa contínua, portfólios, projetos, apresentações, autoavaliação, observação em sala, participação e diferentes formas de demonstrar conhecimento.",
    category: "teacher"
  },
  {
    id: "58",
    question: "Descreva como você lida com indisciplina em sala de aula",
    answer: "Estabeleça regras claras desde o início, seja consistente, use reforço positivo, entenda as causas do comportamento, converse individualmente com o aluno, envolva a família quando necessário.",
    category: "teacher"
  },
  {
    id: "59",
    question: "Como você integra tecnologia no processo de ensino-aprendizagem?",
    answer: "Use ferramentas digitais relevantes ao conteúdo, promova pesquisas orientadas, crie atividades interativas, use plataformas educacionais, desenvolva competências digitais e mantenha equilíbrio com métodos tradicionais.",
    category: "teacher"
  },
  {
    id: "59a",
    question: "Como você trabalha com alunos de diferentes níveis na mesma turma?",
    answer: "Faça diagnóstico inicial, crie atividades diferenciadas, use grupos heterogêneos, ofereça desafios extras para avançados, dê suporte adicional aos que precisam e valorize progresso individual.",
    category: "teacher"
  },
  {
    id: "59b",
    question: "Descreva um projeto interdisciplinar que você desenvolveu",
    answer: "Explique o tema, como você integrou diferentes disciplinas, colaboração com outros professores, metodologia usada, envolvimento dos alunos e resultados de aprendizagem alcançados.",
    category: "teacher"
  },

  // Personal Trainer (expandido para 6 perguntas)
  {
    id: "60",
    question: "Como você desenvolve um programa de treino personalizado?",
    answer: "Faça avaliação física completa, entenda objetivos e limitações do aluno, considere histórico de lesões, nível de condicionamento, disponibilidade de tempo, e crie progressão gradual e segura.",
    category: "fitness"
  },
  {
    id: "61",
    question: "Como você motiva clientes que querem desistir?",
    answer: "Celebre pequenas conquistas, ajuste metas quando necessário, varie os treinos para evitar monotonia, mostre progresso com dados, entenda barreiras emocionais e mantenha comunicação positiva.",
    category: "fitness"
  },
  {
    id: "62",
    question: "Como você lida com clientes com restrições médicas ou lesões?",
    answer: "Solicite liberação médica, adapte exercícios às limitações, foque em movimentos seguros, trabalhe em conjunto com fisioterapeutas quando necessário, e monitore sinais de dor ou desconforto.",
    category: "fitness"
  },
  {
    id: "63",
    question: "Como você se mantém atualizado sobre novas técnicas de treinamento?",
    answer: "Faça cursos de especialização, participe de workshops, leia estudos científicos, teste novas metodologias, troque experiências com outros profissionais e mantenha certificações atualizadas.",
    category: "fitness"
  },
  {
    id: "63a",
    question: "Como você orienta clientes sobre nutrição?",
    answer: "Forneça orientações gerais sobre alimentação saudável, enfatize importância da nutrição para resultados, recomende consulta com nutricionista para planos específicos, não prescreva dietas sem qualificação.",
    category: "fitness"
  },
  {
    id: "63b",
    question: "Descreva uma transformação significativa de um cliente",
    answer: "Explique o perfil inicial do cliente, objetivos estabelecidos, programa desenvolvido, desafios enfrentados, ajustes realizados e resultados alcançados (físicos, saúde, autoestima).",
    category: "fitness"
  },

  // Financeiro (expandido para 6 perguntas)
  {
    id: "64",
    question: "Como você analisa a saúde financeira de uma empresa?",
    answer: "Analise demonstrações financeiras (DRE, balanço, fluxo de caixa), calcule indicadores (liquidez, rentabilidade, endividamento), compare com benchmarks do setor e identifique tendências.",
    category: "finance"
  },
  {
    id: "65",
    question: "Descreva sua experiência com planejamento orçamentário",
    answer: "Explique como você coleta dados históricos, projeta receitas e despesas, envolve stakeholders, define metas realistas, monitora desvios e ajusta o orçamento quando necessário.",
    category: "finance"
  },
  {
    id: "66",
    question: "Como você identifica e mitiga riscos financeiros?",
    answer: "Faça análise de cenários, identifique exposições (câmbio, crédito, liquidez), implemente controles internos, diversifique investimentos, use hedging quando apropriado e monitore continuamente.",
    category: "finance"
  },
  {
    id: "67",
    question: "Como você comunica informações financeiras complexas para não-especialistas?",
    answer: "Use visualizações claras (gráficos, dashboards), evite jargões técnicos, foque no impacto para o negócio, use comparações e analogias, e adapte a linguagem ao público.",
    category: "finance"
  },
  {
    id: "67a",
    question: "Descreva sua experiência com auditoria e compliance",
    answer: "Explique processos de auditoria que você conduziu ou participou, como você garante conformidade com regulamentações, controles internos implementados e resolução de não-conformidades.",
    category: "finance"
  },
  {
    id: "67b",
    question: "Como você avalia oportunidades de investimento?",
    answer: "Analise viabilidade financeira (VPL, TIR, payback), avalie riscos, considere alinhamento estratégico, compare alternativas, faça análise de sensibilidade e recomende baseado em dados.",
    category: "finance"
  },

  // Marketing (expandido para 6 perguntas)
  {
    id: "68",
    question: "Como você desenvolve uma estratégia de marketing para um novo produto?",
    answer: "Faça pesquisa de mercado, defina público-alvo e personas, analise concorrência, estabeleça posicionamento único, escolha canais apropriados, defina KPIs e crie plano de lançamento integrado.",
    category: "marketing"
  },
  {
    id: "69",
    question: "Como você mede o ROI de campanhas de marketing?",
    answer: "Defina objetivos claros e mensuráveis, use ferramentas de analytics, acompanhe métricas relevantes (CAC, LTV, conversão, engajamento), atribua receitas às campanhas e otimize continuamente.",
    category: "marketing"
  },
  {
    id: "70",
    question: "Descreva uma campanha de marketing bem-sucedida que você liderou",
    answer: "Use STAR explicando o objetivo, público-alvo, estratégia criativa, canais utilizados, execução, desafios superados e resultados mensuráveis (alcance, conversões, ROI).",
    category: "marketing"
  },
  {
    id: "71",
    question: "Como você se mantém atualizado com tendências de marketing digital?",
    answer: "Acompanhe blogs especializados, participe de webinars e conferências, teste novas plataformas e ferramentas, faça cursos de atualização, participe de comunidades e analise cases de sucesso.",
    category: "marketing"
  },
  {
    id: "71a",
    question: "Como você desenvolve e gerencia a identidade de marca?",
    answer: "Defina valores e personalidade da marca, crie guia de identidade visual e verbal, garanta consistência em todos os pontos de contato, monitore percepção do público e evolua estrategicamente.",
    category: "marketing"
  },
  {
    id: "71b",
    question: "Descreva sua experiência com marketing de conteúdo",
    answer: "Explique estratégia de conteúdo desenvolvida, tipos de conteúdo criados, canais de distribuição, processo de criação, métricas de engajamento e impacto em geração de leads ou vendas.",
    category: "marketing"
  },

  // Vendas (expandido para 6 perguntas)
  {
    id: "72",
    question: "Como você aborda um cliente em potencial pela primeira vez?",
    answer: "Pesquise sobre o cliente e empresa, identifique necessidades potenciais, faça abordagem personalizada, foque em criar valor não em vender, faça perguntas abertas e construa relacionamento.",
    category: "sales"
  },
  {
    id: "73",
    question: "Como você lida com objeções de clientes?",
    answer: "Ouça atentamente sem interromper, valide a preocupação, faça perguntas para entender a raiz da objeção, apresente soluções específicas, use provas sociais e mantenha postura consultiva.",
    category: "sales"
  },
  {
    id: "74",
    question: "Descreva uma venda complexa que você fechou",
    answer: "Use STAR explicando o contexto, desafios do cliente, seu processo de vendas, como você construiu confiança, superou objeções, negociou termos e o valor entregue ao cliente.",
    category: "sales"
  },
  {
    id: "75",
    question: "Como você gerencia seu pipeline de vendas?",
    answer: "Use CRM para organizar leads, qualifique oportunidades (BANT, MEDDIC), priorize por potencial e probabilidade, faça follow-ups consistentes, analise métricas e ajuste estratégias.",
    category: "sales"
  },
  {
    id: "75a",
    question: "Como você constrói relacionamentos de longo prazo com clientes?",
    answer: "Entregue valor consistente, mantenha comunicação regular, antecipe necessidades, seja proativo em resolver problemas, celebre sucessos juntos e busque oportunidades de expansão.",
    category: "sales"
  },
  {
    id: "75b",
    question: "Como você lida com metas de vendas desafiadoras?",
    answer: "Quebre metas em objetivos menores, crie plano de ação detalhado, priorize atividades de alto impacto, monitore progresso diariamente, ajuste estratégias e mantenha disciplina e persistência.",
    category: "sales"
  },

  // Design (expandido para 6 perguntas)
  {
    id: "76",
    question: "Como você equilibra criatividade com requisitos do cliente?",
    answer: "Entenda profundamente o briefing e objetivos, proponha soluções criativas alinhadas às necessidades, apresente opções com justificativas, esteja aberto a feedback e mantenha comunicação constante.",
    category: "design"
  },
  {
    id: "77",
    question: "Descreva seu processo criativo do conceito à entrega",
    answer: "Pesquisa e imersão no problema, brainstorming e ideação, desenvolvimento de conceitos, criação de protótipos/mockups, iteração baseada em feedback, refinamento e entrega final com documentação.",
    category: "design"
  },
  {
    id: "78",
    question: "Como você lida com feedback negativo sobre seu trabalho?",
    answer: "Ouça sem defensividade, faça perguntas para entender melhor, separe opinião pessoal de requisitos do projeto, use feedback para melhorar, mantenha profissionalismo e foque na solução.",
    category: "design"
  },
  {
    id: "79",
    question: "Como você se mantém atualizado com tendências de design?",
    answer: "Acompanhe portfolios de referência (Behance, Dribbble), participe de comunidades de design, faça cursos de novas ferramentas, analise trabalhos premiados e experimente novas técnicas.",
    category: "design"
  },
  {
    id: "79a",
    question: "Como você garante acessibilidade nos seus designs?",
    answer: "Siga diretrizes WCAG, use contraste adequado, considere navegação por teclado, teste com leitores de tela, use textos alternativos, considere diferentes habilidades e dispositivos.",
    category: "design"
  },
  {
    id: "79b",
    question: "Descreva um projeto onde você teve que redesenhar algo existente",
    answer: "Explique problemas identificados no design original, pesquisa com usuários, objetivos do redesign, processo de iteração, testes de usabilidade e melhorias mensuráveis alcançadas.",
    category: "design"
  },

  // Gastronomia (expandido para 6 perguntas)
  {
    id: "80",
    question: "Como você desenvolve um novo prato para o menu?",
    answer: "Pesquise tendências e ingredientes sazonais, considere custos e margens, teste combinações de sabores, ajuste receita baseado em feedback, padronize o preparo e treine a equipe.",
    category: "culinary"
  },
  {
    id: "81",
    question: "Como você gerencia uma cozinha durante horários de pico?",
    answer: "Organize mise en place adequadamente, delegue tarefas claramente, mantenha comunicação eficiente, priorize pedidos estrategicamente, mantenha calma sob pressão e garanta qualidade consistente.",
    category: "culinary"
  },
  {
    id: "82",
    question: "Como você garante segurança alimentar e higiene?",
    answer: "Siga normas da vigilância sanitária, implemente APPCC, treine equipe em boas práticas, monitore temperaturas, controle validades, mantenha limpeza rigorosa e faça auditorias regulares.",
    category: "culinary"
  },
  {
    id: "82a",
    question: "Como você controla custos e desperdícios na cozinha?",
    answer: "Faça planejamento de compras, controle porcionamento, aproveite ingredientes integralmente, monitore validades, negocie com fornecedores, calcule food cost e treine equipe em economia.",
    category: "culinary"
  },
  {
    id: "82b",
    question: "Como você lida com reclamações sobre pratos?",
    answer: "Ouça o cliente atentamente, peça desculpas sinceras, ofereça solução imediata (refazer ou substituir), investigue a causa, corrija o problema e faça follow-up para garantir satisfação.",
    category: "culinary"
  },
  {
    id: "82c",
    question: "Descreva sua experiência com diferentes tipos de culinária",
    answer: "Mencione estilos culinários que você domina, técnicas específicas, experiências em diferentes estabelecimentos, especialidades desenvolvidas e disposição para aprender novas cozinhas.",
    category: "culinary"
  },

  // Turismo (expandido para 6 perguntas)
  {
    id: "83",
    question: "Como você cria um roteiro de viagem personalizado?",
    answer: "Entenda perfil do cliente (interesses, orçamento, ritmo), pesquise destinos e atrações, equilibre atividades e descanso, considere logística e deslocamentos, ofereça opções e prepare documentação completa.",
    category: "tourism"
  },
  {
    id: "84",
    question: "Como você lida com imprevistos durante uma viagem de grupo?",
    answer: "Mantenha calma e tranquilize o grupo, tenha planos B preparados, comunique-se rapidamente com fornecedores, seja transparente com clientes, resolva problemas proativamente e documente tudo.",
    category: "tourism"
  },
  {
    id: "84a",
    question: "Como você vende pacotes turísticos de forma efetiva?",
    answer: "Entenda sonhos e expectativas do cliente, apresente destinos alinhados ao perfil, destaque experiências únicas, use storytelling, mostre fotos e depoimentos, explique valor agregado.",
    category: "tourism"
  },
  {
    id: "84b",
    question: "Descreva sua experiência com turismo sustentável",
    answer: "Explique práticas de turismo responsável que você promove, parcerias com comunidades locais, minimização de impactos ambientais, educação de viajantes e benefícios para destinos.",
    category: "tourism"
  },
  {
    id: "84c",
    question: "Como você se mantém atualizado sobre destinos e tendências?",
    answer: "Viaje quando possível, participe de fam trips, acompanhe feiras de turismo, leia publicações especializadas, mantenha rede de contatos no setor e monitore feedback de clientes.",
    category: "tourism"
  },
  {
    id: "84d",
    question: "Como você gerencia expectativas de clientes?",
    answer: "Seja realista desde o início, forneça informações detalhadas, mostre fotos reais, explique limitações, prepare para diferenças culturais, documente acordos e mantenha comunicação aberta.",
    category: "tourism"
  },

  // Imobiliário (expandido para 6 perguntas)
  {
    id: "85",
    question: "Como você avalia o valor de um imóvel?",
    answer: "Analise localização, metragem, estado de conservação, compare com imóveis similares na região, considere infraestrutura do bairro, potencial de valorização e tendências do mercado.",
    category: "realestate"
  },
  {
    id: "86",
    question: "Como você fecha uma venda imobiliária?",
    answer: "Entenda necessidades reais do cliente, apresente opções adequadas, destaque diferenciais, seja transparente sobre prós e contras, negocie com flexibilidade, facilite o processo burocrático e mantenha follow-up.",
    category: "realestate"
  },
  {
    id: "86a",
    question: "Como você qualifica leads imobiliários?",
    answer: "Identifique necessidades e urgência, avalie capacidade financeira, entenda motivações, determine timeline de decisão, verifique pré-aprovação de crédito e priorize leads quentes.",
    category: "realestate"
  },
  {
    id: "86b",
    question: "Como você lida com negociações difíceis?",
    answer: "Mantenha profissionalismo, entenda interesses de ambas as partes, busque soluções criativas, seja paciente, use dados de mercado para embasar argumentos e foque em acordo win-win.",
    category: "realestate"
  },
  {
    id: "86c",
    question: "Descreva sua estratégia de marketing para imóveis",
    answer: "Faça fotos profissionais, crie descrições atrativas, use múltiplos canais (portais, redes sociais), faça tours virtuais, organize open houses, segmente público e monitore resultados.",
    category: "realestate"
  },
  {
    id: "86d",
    question: "Como você constrói uma carteira de clientes?",
    answer: "Ofereça excelente atendimento, peça indicações, mantenha contato pós-venda, use networking, esteja presente em eventos locais, invista em marketing pessoal e construa reputação sólida.",
    category: "realestate"
  },

  // Automotivo (expandido para 6 perguntas)
  {
    id: "87",
    question: "Como você diagnostica um problema mecânico complexo?",
    answer: "Ouça o cliente sobre sintomas, faça inspeção visual, use ferramentas de diagnóstico, teste componentes sistematicamente, consulte manuais técnicos, valide a solução e explique o problema claramente.",
    category: "automotive"
  },
  {
    id: "88",
    question: "Como você garante qualidade no serviço automotivo?",
    answer: "Use peças de qualidade, siga procedimentos do fabricante, faça testes após reparos, mantenha ferramentas calibradas, documente serviços realizados e ofereça garantia adequada.",
    category: "automotive"
  },
  {
    id: "88a",
    question: "Como você lida com clientes insatisfeitos com o serviço?",
    answer: "Ouça a reclamação completamente, demonstre empatia, assuma responsabilidade, ofereça solução imediata, corrija o problema sem custo adicional e faça follow-up para garantir satisfação.",
    category: "automotive"
  },
  {
    id: "88b",
    question: "Descreva sua experiência com manutenção preventiva",
    answer: "Explique importância da manutenção preventiva, itens verificados em cada revisão, como você orienta clientes sobre prazos, benefícios de seguir o plano e como você documenta histórico.",
    category: "automotive"
  },
  {
    id: "88c",
    question: "Como você se atualiza sobre novas tecnologias automotivas?",
    answer: "Faça cursos de fabricantes, participe de treinamentos técnicos, leia manuais de novos modelos, acompanhe inovações do setor, troque experiências com colegas e pratique em veículos modernos.",
    category: "automotive"
  },
  {
    id: "88d",
    question: "Como você gerencia seu tempo em múltiplos serviços?",
    answer: "Priorize por urgência e complexidade, estime tempos realisticamente, comunique prazos aos clientes, organize ferramentas e peças, trabalhe de forma focada e peça ajuda quando necessário.",
    category: "automotive"
  },

  // Construção Civil (mantido em 3 - já bem completo)
  {
    id: "89",
    question: "Como você gerencia prazos em projetos de construção?",
    answer: "Crie cronograma detalhado, identifique caminho crítico, coordene equipes e fornecedores, monitore progresso diariamente, antecipe problemas, ajuste recursos quando necessário e comunique mudanças rapidamente.",
    category: "construction"
  },
  {
    id: "90",
    question: "Como você garante segurança no canteiro de obras?",
    answer: "Implemente NRs aplicáveis, forneça EPIs adequados, faça DDS diários, sinalize áreas de risco, treine equipe continuamente, faça inspeções regulares e mantenha documentação atualizada.",
    category: "construction"
  },
  {
    id: "91",
    question: "Como você lida com mudanças no projeto durante a execução?",
    answer: "Avalie impacto em custo e prazo, documente formalmente, comunique todas as partes, ajuste cronograma e orçamento, obtenha aprovações necessárias e registre lições aprendidas.",
    category: "construction"
  },

  // Moda (expandido para 6 perguntas)
  {
    id: "92",
    question: "Como você identifica tendências de moda?",
    answer: "Acompanhe desfiles internacionais, analise street style, monitore redes sociais, estude comportamento do consumidor, participe de feiras do setor e adapte tendências ao público-alvo.",
    category: "fashion"
  },
  {
    id: "93",
    question: "Como você desenvolve uma coleção?",
    answer: "Defina conceito e inspiração, pesquise materiais e cores, crie mood board, desenvolva sketches, selecione tecidos, faça protótipos, ajuste modelagem e planeje produção considerando custos.",
    category: "fashion"
  },
  {
    id: "93a",
    question: "Como você garante qualidade e caimento das peças?",
    answer: "Faça prova de roupa em modelos, ajuste modelagem, verifique acabamentos, teste tecidos, controle qualidade na produção, solicite feedback e faça ajustes finais antes da produção em escala.",
    category: "fashion"
  },
  {
    id: "93b",
    question: "Como você equilibra criatividade com viabilidade comercial?",
    answer: "Entenda seu público-alvo, pesquise o que vende, crie peças-chave comerciais e peças-conceito, controle custos de produção, teste aceitação e ajuste coleção baseado em feedback.",
    category: "fashion"
  },
  {
    id: "93c",
    question: "Descreva sua experiência com produção de moda",
    answer: "Explique etapas de produção que você gerencia, relacionamento com fornecedores e confecções, controle de qualidade, gestão de prazos e custos, e resolução de problemas de produção.",
    category: "fashion"
  },
  {
    id: "93d",
    question: "Como você promove suas criações?",
    answer: "Use redes sociais estrategicamente, crie lookbooks, participe de eventos de moda, faça parcerias com influenciadores, organize desfiles ou apresentações e construa identidade de marca forte.",
    category: "fashion"
  },

  // Fotografia (expandido para 6 perguntas)
  {
    id: "94",
    question: "Como você se prepara para uma sessão fotográfica importante?",
    answer: "Entenda expectativas do cliente, faça scouting de locação, planeje iluminação e equipamentos, prepare shot list, teste equipamentos, tenha plano B para clima/imprevistos e comunique cronograma.",
    category: "photography"
  },
  {
    id: "95",
    question: "Como você desenvolve seu estilo fotográfico único?",
    answer: "Estude trabalhos de referência, experimente técnicas diferentes, identifique o que te emociona, pratique consistentemente, receba feedback, refine sua visão e mantenha coerência no portfólio.",
    category: "photography"
  },
  {
    id: "95a",
    question: "Como você dirige pessoas durante uma sessão?",
    answer: "Crie ambiente confortável, dê instruções claras e positivas, demonstre poses quando necessário, elogie e encoraje, mantenha energia alta, seja paciente e capture momentos naturais.",
    category: "photography"
  },
  {
    id: "95b",
    question: "Descreva seu processo de pós-produção",
    answer: "Selecione melhores fotos, faça ajustes de cor e exposição, retoque quando apropriado, mantenha estilo consistente, use presets personalizados, entregue em formatos adequados e dentro do prazo.",
    category: "photography"
  },
  {
    id: "95c",
    question: "Como você precifica seus serviços fotográficos?",
    answer: "Considere custos de equipamento e manutenção, tempo de trabalho (sessão + edição), experiência, mercado local, tipo de serviço, uso das imagens e valor entregue ao cliente.",
    category: "photography"
  },
  {
    id: "95d",
    question: "Como você lida com condições de iluminação desafiadoras?",
    answer: "Avalie luz disponível, use refletores ou difusores, ajuste configurações da câmera, use flash quando apropriado, aproveite luz natural estrategicamente e seja criativo com limitações.",
    category: "photography"
  },

  // Música (expandido para 6 perguntas)
  {
    id: "96",
    question: "Como você ensina música para iniciantes?",
    answer: "Avalie nível e objetivos do aluno, comece com fundamentos, use músicas que o aluno goste, equilibre teoria e prática, celebre pequenos progressos, mantenha aulas dinâmicas e adapte ritmo ao aluno.",
    category: "music"
  },
  {
    id: "97",
    question: "Como você se prepara para uma apresentação ao vivo?",
    answer: "Ensaie repertório exaustivamente, faça soundcheck completo, prepare equipamentos backup, conheça o espaço, aqueça adequadamente, gerencie nervosismo e tenha plano para imprevistos técnicos.",
    category: "music"
  },
  {
    id: "97a",
    question: "Como você desenvolve técnica e musicalidade simultaneamente?",
    answer: "Pratique exercícios técnicos com musicalidade, estude interpretação de grandes músicos, trabalhe dinâmica e expressão, conecte técnica com emoção, grave-se para avaliar e busque equilíbrio.",
    category: "music"
  },
  {
    id: "97b",
    question: "Descreva sua experiência com diferentes estilos musicais",
    answer: "Mencione gêneros que você domina, influências musicais, versatilidade, disposição para aprender novos estilos, experiências em diferentes contextos (shows, estúdio, ensino).",
    category: "music"
  },
  {
    id: "97c",
    question: "Como você lida com bloqueio criativo?",
    answer: "Mude de ambiente, ouça músicas diferentes, colabore com outros músicos, experimente novos instrumentos ou técnicas, faça pausas, busque inspiração em outras artes e não force o processo.",
    category: "music"
  },
  {
    id: "97d",
    question: "Como você promove seu trabalho musical?",
    answer: "Use redes sociais estrategicamente, crie conteúdo regular, faça networking com outros músicos, participe de eventos, grave vídeos de qualidade, construa presença online e engaje com público.",
    category: "music"
  },

  // Beleza e Estética (expandido para 6 perguntas)
  {
    id: "98",
    question: "Como você consulta um novo cliente?",
    answer: "Faça anamnese completa, entenda expectativas e histórico, avalie condições da pele/cabelo, explique procedimentos e resultados realistas, discuta contraindicações e crie plano personalizado.",
    category: "beauty"
  },
  {
    id: "99",
    question: "Como você se mantém atualizado com novas técnicas?",
    answer: "Faça cursos de especialização, participe de workshops e congressos, teste novos produtos, acompanhe influenciadores da área, pratique em modelos e mantenha certificações atualizadas.",
    category: "beauty"
  },
  {
    id: "99a",
    question: "Como você lida com clientes insatisfeitos com resultados?",
    answer: "Ouça com empatia, avalie o resultado objetivamente, explique processo e expectativas realistas, ofereça correção quando possível, seja transparente sobre limitações e mantenha profissionalismo.",
    category: "beauty"
  },
  {
    id: "99b",
    question: "Como você garante higiene e biossegurança?",
    answer: "Esterilize instrumentos adequadamente, use materiais descartáveis quando indicado, mantenha ambiente limpo, siga protocolos de biossegurança, use EPIs e eduque clientes sobre cuidados.",
    category: "beauty"
  },
  {
    id: "99c",
    question: "Como você fideliza clientes?",
    answer: "Ofereça atendimento excepcional, lembre-se de detalhes pessoais, faça follow-up pós-procedimento, ofereça programas de fidelidade, mantenha contato regular e supere expectativas.",
    category: "beauty"
  },
  {
    id: "99d",
    question: "Descreva sua experiência com diferentes tipos de pele/cabelo",
    answer: "Explique conhecimento sobre diferentes fototipos, texturas, condições específicas, adaptação de técnicas, produtos adequados para cada tipo e experiência com diversidade de clientes.",
    category: "beauty"
  },

  // Veterinária (expandido para 6 perguntas)
  {
    id: "100",
    question: "Como você lida com animais agressivos ou assustados?",
    answer: "Mantenha calma, use técnicas de contenção apropriadas, leia linguagem corporal do animal, trabalhe gradualmente, use reforço positivo, considere sedação quando necessário e priorize segurança.",
    category: "veterinary"
  },
  {
    id: "101",
    question: "Como você comunica diagnósticos difíceis aos tutores?",
    answer: "Escolha ambiente privado, seja empático mas direto, explique em linguagem acessível, apresente opções de tratamento, discuta prognóstico honestamente, dê tempo para processar e ofereça suporte.",
    category: "veterinary"
  },
  {
    id: "101a",
    question: "Como você lida com emergências veterinárias?",
    answer: "Avalie rapidamente a gravidade, estabilize o paciente, priorize procedimentos críticos, comunique claramente com equipe, mantenha tutores informados, documente tudo e faça follow-up adequado.",
    category: "veterinary"
  },
  {
    id: "101b",
    question: "Como você se mantém atualizado em medicina veterinária?",
    answer: "Participe de congressos e cursos, leia journals científicos, faça especializações, troque experiências com colegas, acompanhe avanços em tratamentos e mantenha educação continuada.",
    category: "veterinary"
  },
  {
    id: "101c",
    question: "Como você educa tutores sobre cuidados preventivos?",
    answer: "Explique importância de vacinação e vermifugação, oriente sobre nutrição adequada, ensine identificação de sinais de doença, promova check-ups regulares e forneça materiais educativos.",
    category: "veterinary"
  },
  {
    id: "101d",
    question: "Como você lida com o estresse emocional da profissão?",
    answer: "Pratique autocuidado, busque apoio de colegas, estabeleça limites saudáveis, procure ajuda profissional quando necessário, celebre sucessos e lembre-se do impacto positivo do seu trabalho.",
    category: "veterinary"
  },

  // Cuidados Infantis (expandido para 6 perguntas)
  {
    id: "102",
    question: "Como você lida com birras e comportamentos desafiadores?",
    answer: "Mantenha calma, valide sentimentos da criança, estabeleça limites claros, ofereça escolhas apropriadas, use distração quando adequado, seja consistente e comunique aos pais.",
    category: "childcare"
  },
  {
    id: "103",
    question: "Como você garante segurança das crianças?",
    answer: "Faça supervisão constante, mantenha ambiente seguro, conheça alergias e condições médicas, tenha treinamento em primeiros socorros, siga protocolos de emergência e comunique incidentes aos pais.",
    category: "childcare"
  },
  {
    id: "103a",
    question: "Como você estimula o desenvolvimento infantil?",
    answer: "Ofereça atividades apropriadas para idade, promova brincadeiras educativas, estimule linguagem e socialização, respeite ritmo individual, crie rotinas estruturadas e celebre conquistas.",
    category: "childcare"
  },
  {
    id: "103b",
    question: "Como você lida com crianças com necessidades especiais?",
    answer: "Entenda necessidades específicas, adapte atividades, seja paciente e flexível, trabalhe em conjunto com pais e terapeutas, celebre pequenos progressos e promova inclusão.",
    category: "childcare"
  },
  {
    id: "103c",
    question: "Como você se comunica com os pais?",
    answer: "Mantenha comunicação diária, compartilhe conquistas e desafios, seja honesto mas sensível, ouça preocupações dos pais, respeite estilos parentais diferentes e documente informações importantes.",
    category: "childcare"
  },
  {
    id: "103d",
    question: "Como você gerencia múltiplas crianças simultaneamente?",
    answer: "Estabeleça rotinas claras, organize atividades em grupos, mantenha ambiente estruturado, priorize segurança, delegue responsabilidades apropriadas para idade e mantenha calma e paciência.",
    category: "childcare"
  },

  // Agricultura (expandido para 6 perguntas)
  {
    id: "104",
    question: "Como você planeja o calendário de plantio?",
    answer: "Analise clima e estação, considere rotação de culturas, avalie condições do solo, planeje irrigação, calcule insumos necessários, prepare maquinário e monitore previsões meteorológicas.",
    category: "agriculture"
  },
  {
    id: "105",
    question: "Como você lida com pragas e doenças nas plantações?",
    answer: "Faça monitoramento preventivo, identifique pragas corretamente, use manejo integrado, aplique defensivos quando necessário seguindo normas, considere controle biológico e registre aplicações.",
    category: "agriculture"
  },
  {
    id: "105a",
    question: "Como você gerencia recursos hídricos na propriedade?",
    answer: "Implemente sistemas de irrigação eficientes, monitore consumo de água, capture água da chuva, use técnicas de conservação de solo, planeje irrigação baseada em necessidades das culturas.",
    category: "agriculture"
  },
  {
    id: "105b",
    question: "Descreva sua experiência com agricultura sustentável",
    answer: "Explique práticas sustentáveis que você implementa, uso de adubação orgânica, rotação de culturas, conservação de solo, redução de químicos e equilíbrio ambiental.",
    category: "agriculture"
  },
  {
    id: "105c",
    question: "Como você controla custos de produção?",
    answer: "Planeje compras de insumos, negocie com fornecedores, otimize uso de recursos, monitore despesas, calcule custo por hectare, busque eficiência operacional e diversifique culturas.",
    category: "agriculture"
  },
  {
    id: "105d",
    question: "Como você se mantém atualizado sobre técnicas agrícolas?",
    answer: "Participe de dias de campo, faça cursos técnicos, acompanhe pesquisas agrícolas, troque experiências com outros produtores, teste novas tecnologias e consulte agrônomos.",
    category: "agriculture"
  },

  // Transporte (expandido para 6 perguntas)
  {
    id: "106",
    question: "Como você garante entregas no prazo?",
    answer: "Planeje rotas otimizadas, considere trânsito e horários, faça manutenção preventiva do veículo, tenha rotas alternativas, comunique atrasos proativamente e mantenha documentação organizada.",
    category: "transport"
  },
  {
    id: "107",
    question: "Como você lida com cargas frágeis ou perecíveis?",
    answer: "Use embalagem adequada, controle temperatura quando necessário, dirija com cuidado extra, faça inspeções antes e depois, documente condições da carga e siga protocolos específicos.",
    category: "transport"
  },
  {
    id: "107a",
    question: "Como você mantém segurança durante o transporte?",
    answer: "Siga leis de trânsito rigorosamente, faça pausas regulares, mantenha veículo em boas condições, use equipamentos de segurança, evite distrações e dirija defensivamente.",
    category: "transport"
  },
  {
    id: "107b",
    question: "Como você lida com imprevistos na rota?",
    answer: "Mantenha calma, avalie alternativas, comunique dispatcher e cliente, ajuste rota quando possível, documente problemas, priorize segurança da carga e resolva situação profissionalmente.",
    category: "transport"
  },
  {
    id: "107c",
    question: "Descreva sua experiência com diferentes tipos de veículos",
    answer: "Mencione categorias de CNH, tipos de veículos que você opera, experiência com cargas especiais, conhecimento de manutenção básica e adaptabilidade a diferentes equipamentos.",
    category: "transport"
  },
  {
    id: "107d",
    question: "Como você gerencia seu tempo e jornada de trabalho?",
    answer: "Planeje rotas considerando tempo de descanso, respeite limites de jornada, registre horas trabalhadas, equilibre produtividade com segurança e mantenha comunicação com gestão.",
    category: "transport"
  },

  // Armazenagem (expandido para 6 perguntas)
  {
    id: "108",
    question: "Como você otimiza o espaço de armazenamento?",
    answer: "Analise curva ABC, use verticalização, implemente endereçamento lógico, agrupe produtos similares, considere giro de estoque, use equipamentos adequados e revise layout periodicamente.",
    category: "warehouse"
  },
  {
    id: "109",
    question: "Como você garante rastreabilidade dos produtos?",
    answer: "Use sistema de código de barras/RFID, registre movimentações, faça inventários cíclicos, mantenha documentação atualizada, treine equipe em procedimentos e audite processos regularmente.",
    category: "warehouse"
  },
  {
    id: "109a",
    question: "Como você gerencia recebimento de mercadorias?",
    answer: "Confira notas fiscais, inspecione qualidade e quantidade, identifique divergências, registre entrada no sistema, organize armazenamento adequado e comunique problemas imediatamente.",
    category: "warehouse"
  },
  {
    id: "109b",
    question: "Como você lida com produtos com validade?",
    answer: "Implemente FIFO rigorosamente, monitore datas de validade, faça inspeções regulares, separe produtos próximos ao vencimento, comunique gestão e descarte adequadamente quando necessário.",
    category: "warehouse"
  },
  {
    id: "109c",
    question: "Como você garante segurança no armazém?",
    answer: "Mantenha corredores desobstruídos, sinalize áreas de risco, use EPIs, opere equipamentos com segurança, empilhe cargas corretamente, faça inspeções e treine equipe continuamente.",
    category: "warehouse"
  },
  {
    id: "109d",
    question: "Como você melhora produtividade no armazém?",
    answer: "Otimize layout, reduza movimentações desnecessárias, use tecnologia, treine equipe, estabeleça metas, monitore indicadores, elimine desperdícios e implemente melhorias contínuas.",
    category: "warehouse"
  },

  // Manufatura (expandido para 6 perguntas)
  {
    id: "110",
    question: "Como você garante qualidade na linha de produção?",
    answer: "Implemente controle de qualidade em etapas críticas, treine operadores, calibre equipamentos, documente não-conformidades, faça análise de causa raiz e implemente ações corretivas.",
    category: "manufacturing"
  },
  {
    id: "111",
    question: "Como você reduz desperdícios na produção?",
    answer: "Aplique metodologia Lean, identifique os 7 desperdícios, otimize processos, treine equipe, monitore indicadores, implemente melhorias contínuas e envolva operadores nas soluções.",
    category: "manufacturing"
  },
  {
    id: "111a",
    question: "Como você lida com paradas não planejadas?",
    answer: "Identifique causa rapidamente, acione manutenção, comunique impactos, implemente solução temporária se possível, documente ocorrência, analise causa raiz e previna recorrência.",
    category: "manufacturing"
  },
  {
    id: "111b",
    question: "Descreva sua experiência com setup de máquinas",
    answer: "Explique processo de preparação de equipamentos, técnicas de redução de tempo de setup (SMED), padronização de procedimentos, treinamento de operadores e ganhos de produtividade.",
    category: "manufacturing"
  },
  {
    id: "111c",
    question: "Como você garante segurança na operação de máquinas?",
    answer: "Siga procedimentos de segurança, use EPIs adequados, faça bloqueio de energia, mantenha proteções, não burle dispositivos de segurança, reporte problemas e treine continuamente.",
    category: "manufacturing"
  },
  {
    id: "111d",
    question: "Como você contribui para melhoria contínua?",
    answer: "Identifique oportunidades de melhoria, sugira soluções, participe de kaizens, documente melhorias implementadas, compartilhe boas práticas e monitore resultados das mudanças.",
    category: "manufacturing"
  },

  // Manutenção (expandido para 6 perguntas)
  {
    id: "112",
    question: "Como você prioriza ordens de manutenção?",
    answer: "Avalie criticidade do equipamento, impacto na produção, segurança, disponibilidade de peças, complexidade do reparo, classifique urgências e comunique prazos realisticamente.",
    category: "maintenance"
  },
  {
    id: "113",
    question: "Como você implementa manutenção preventiva?",
    answer: "Crie cronograma baseado em fabricante e histórico, treine equipe, mantenha estoque de peças críticas, documente intervenções, analise falhas recorrentes e ajuste plano continuamente.",
    category: "maintenance"
  },
  {
    id: "113a",
    question: "Como você diagnostica falhas em equipamentos?",
    answer: "Colete informações do operador, faça inspeção visual, use ferramentas de diagnóstico, teste componentes sistematicamente, consulte manuais, identifique causa raiz e valide solução.",
    category: "maintenance"
  },
  {
    id: "113b",
    question: "Como você gerencia estoque de peças de reposição?",
    answer: "Identifique peças críticas, mantenha estoque mínimo, organize armazenamento, controle entrada e saída, negocie com fornecedores, monitore obsolescência e equilibre custo vs disponibilidade.",
    category: "maintenance"
  },
  {
    id: "113c",
    question: "Descreva sua experiência com manutenção preditiva",
    answer: "Explique técnicas de monitoramento (vibração, termografia, análise de óleo), interpretação de dados, identificação de tendências, planejamento de intervenções e benefícios alcançados.",
    category: "maintenance"
  },
  {
    id: "113d",
    question: "Como você documenta trabalhos de manutenção?",
    answer: "Registre detalhes da intervenção, peças substituídas, tempo gasto, problemas encontrados, soluções aplicadas, recomendações futuras e mantenha histórico organizado para análises.",
    category: "maintenance"
  },

  // Elétrica (expandido para 6 perguntas)
  {
    id: "114",
    question: "Como você diagnostica problemas elétricos?",
    answer: "Faça inspeção visual, use multímetro e ferramentas apropriadas, teste circuitos sistematicamente, consulte diagramas elétricos, isole o problema, valide solução e documente o reparo.",
    category: "electrical"
  },
  {
    id: "115",
    question: "Como você garante segurança em trabalhos elétricos?",
    answer: "Siga NR-10, use EPIs adequados, desenergize circuitos, faça bloqueio e etiquetagem, teste ausência de tensão, use ferramentas isoladas e trabalhe com supervisor quando necessário.",
    category: "electrical"
  },
  {
    id: "115a",
    question: "Como você dimensiona instalações elétricas?",
    answer: "Calcule demanda de carga, considere fator de simultaneidade, dimensione condutores e proteções conforme NBR 5410, preveja expansões futuras e garanta segurança e eficiência.",
    category: "electrical"
  },
  {
    id: "115b",
    question: "Descreva sua experiência com automação elétrica",
    answer: "Explique sistemas de automação que você trabalhou (CLPs, inversores, sensores), programação, troubleshooting, integração de sistemas e benefícios de eficiência alcançados.",
    category: "electrical"
  },
  {
    id: "115c",
    question: "Como você lida com emergências elétricas?",
    answer: "Avalie situação rapidamente, priorize segurança, desenergize área afetada, identifique causa, implemente solução temporária segura, repare definitivamente e previna recorrência.",
    category: "electrical"
  },
  {
    id: "115d",
    question: "Como você se mantém atualizado com normas elétricas?",
    answer: "Acompanhe atualizações da NBR 5410 e NR-10, faça cursos de reciclagem, participe de treinamentos, leia publicações técnicas e mantenha certificações válidas.",
    category: "electrical"
  },

  // Hidráulica (expandido para 6 perguntas)
  {
    id: "116",
    question: "Como você identifica vazamentos ocultos?",
    answer: "Analise consumo de água, use detector acústico, faça teste de pressão, inspecione manchas e umidade, verifique hidrômetro, isole setores e use corantes quando apropriado.",
    category: "plumbing"
  },
  {
    id: "117",
    question: "Como você dimensiona instalações hidráulicas?",
    answer: "Calcule demanda de água, considere pressão disponível, siga normas técnicas (NBR), dimensione tubulações adequadamente, planeje reservatórios e preveja manutenção futura.",
    category: "plumbing"
  },
  {
    id: "117a",
    question: "Como você lida com entupimentos?",
    answer: "Identifique localização, use ferramentas apropriadas (cabo, hidrojato), avalie causa (gordura, objetos, raízes), desentupa efetivamente, oriente prevenção e considere substituição se recorrente.",
    category: "plumbing"
  },
  {
    id: "117b",
    question: "Descreva sua experiência com sistemas de esgoto",
    answer: "Explique conhecimento de sistemas de esgoto, ventilação, caixas de inspeção, fossa séptica, tratamento, manutenção preventiva e resolução de problemas comuns.",
    category: "plumbing"
  },
  {
    id: "117c",
    question: "Como você garante qualidade nas instalações?",
    answer: "Use materiais de qualidade, siga normas técnicas, faça testes de pressão, verifique vedações, garanta caimento adequado, documente instalação e ofereça garantia.",
    category: "plumbing"
  },
  {
    id: "117d",
    question: "Como você lida com emergências hidráulicas?",
    answer: "Feche registro geral rapidamente, contenha vazamento, avalie danos, implemente reparo emergencial, comunique cliente sobre situação e planeje reparo definitivo.",
    category: "plumbing"
  },

  // Pintura (expandido para 6 perguntas)
  {
    id: "118",
    question: "Como você prepara superfícies para pintura?",
    answer: "Limpe e remova sujeiras, raspe tintas soltas, corrija imperfeições com massa, lixe adequadamente, aplique selador/primer quando necessário, proteja áreas adjacentes e aguarde secagem.",
    category: "painting"
  },
  {
    id: "119",
    question: "Como você garante acabamento de qualidade?",
    answer: "Use materiais de qualidade, prepare superfície corretamente, aplique demãos uniformes, respeite tempo de secagem, use técnicas apropriadas, trabalhe com boa iluminação e faça retoques finais.",
    category: "painting"
  },
  {
    id: "119a",
    question: "Como você escolhe tintas e acabamentos?",
    answer: "Considere tipo de superfície, ambiente (interno/externo), exposição a umidade, tráfego, preferência do cliente, durabilidade desejada e orçamento disponível.",
    category: "painting"
  },
  {
    id: "119b",
    question: "Como você lida com superfícies problemáticas?",
    answer: "Identifique problema (mofo, infiltração, descascamento), trate causa raiz, aplique produtos específicos, prepare adequadamente, use seladores apropriados e oriente manutenção.",
    category: "painting"
  },
  {
    id: "119c",
    question: "Descreva sua experiência com técnicas decorativas",
    answer: "Explique técnicas que você domina (textura, efeitos, estêncil, degradê), criatividade, atenção a detalhes, portfólio de trabalhos e disposição para aprender novas técnicas.",
    category: "painting"
  },
  {
    id: "119d",
    question: "Como você estima tempo e custo de projetos?",
    answer: "Avalie área a ser pintada, condição das superfícies, preparação necessária, número de demãos, tipo de tinta, acesso, calcule materiais e mão de obra, adicione margem de segurança.",
    category: "painting"
  },

  // TI e Suporte (expandido para 6 perguntas)
  {
    id: "120",
    question: "Como você prioriza tickets de suporte?",
    answer: "Avalie impacto no negócio, número de usuários afetados, criticidade do sistema, SLA acordado, classifique urgência vs importância e comunique prazos realisticamente.",
    category: "it"
  },
  {
    id: "121",
    question: "Como você documenta soluções de problemas técnicos?",
    answer: "Registre sintomas, passos de diagnóstico, solução aplicada, use linguagem clara, crie base de conhecimento, categorize adequadamente, inclua screenshots e mantenha atualizado.",
    category: "it"
  },
  {
    id: "121a",
    question: "Como você lida com usuários não-técnicos?",
    answer: "Use linguagem simples, seja paciente, evite jargões, demonstre empatia, explique passo a passo, valide entendimento, forneça documentação clara e ofereça treinamento quando necessário.",
    category: "it"
  },
  {
    id: "121b",
    question: "Descreva sua experiência com troubleshooting",
    answer: "Explique metodologia de diagnóstico, ferramentas usadas, como você isola problemas, testa hipóteses, resolve issues complexos e aprende com cada caso.",
    category: "it"
  },
  {
    id: "121c",
    question: "Como você se mantém atualizado com tecnologia?",
    answer: "Faça cursos online, obtenha certificações, pratique em labs, acompanhe blogs técnicos, participe de comunidades, teste novas tecnologias e compartilhe conhecimento.",
    category: "it"
  },
  {
    id: "121d",
    question: "Como você lida com incidentes críticos?",
    answer: "Mantenha calma, avalie impacto, comunique stakeholders, mobilize recursos necessários, implemente solução temporária, resolva definitivamente, documente e faça post-mortem.",
    category: "it"
  },

  // Segurança (expandido para 6 perguntas)
  {
    id: "122",
    question: "Como você lida com situações de emergência?",
    answer: "Mantenha calma, avalie a situação rapidamente, acione autoridades quando necessário, siga protocolos estabelecidos, priorize segurança de pessoas, documente ocorrência e faça relatório detalhado.",
    category: "security"
  },
  {
    id: "123",
    question: "Como você mantém vigilância efetiva?",
    answer: "Faça rondas regulares, monitore câmeras atentamente, conheça pontos críticos, mantenha comunicação com equipe, registre ocorrências, esteja alerta a comportamentos suspeitos e siga procedimentos.",
    category: "security"
  },
  {
    id: "123a",
    question: "Como você lida com pessoas não autorizadas?",
    answer: "Aborde educadamente mas firmemente, verifique identificação, explique políticas de acesso, não permita entrada sem autorização, acione supervisor quando necessário e documente tentativas.",
    category: "security"
  },
  {
    id: "123b",
    question: "Descreva sua experiência com sistemas de segurança",
    answer: "Explique sistemas que você opera (CFTV, alarmes, controle de acesso), monitoramento, resposta a alertas, manutenção básica e integração de sistemas.",
    category: "security"
  },
  {
    id: "123c",
    question: "Como você previne incidentes de segurança?",
    answer: "Faça inspeções preventivas, identifique vulnerabilidades, sugira melhorias, mantenha vigilância constante, eduque sobre segurança, teste sistemas e atualize procedimentos.",
    category: "security"
  },
  {
    id: "123d",
    question: "Como você lida com conflitos ou situações tensas?",
    answer: "Mantenha calma e profissionalismo, use comunicação não-violenta, desescale situação, não use força desnecessária, acione autoridades quando apropriado e priorize segurança de todos.",
    category: "security"
  },

  // Consultoria (expandido para 6 perguntas)
  {
    id: "124",
    question: "Como você estrutura um projeto de consultoria?",
    answer: "Entenda problema do cliente, defina escopo e objetivos, faça diagnóstico detalhado, desenvolva recomendações baseadas em dados, crie plano de implementação e estabeleça métricas de sucesso.",
    category: "consulting"
  },
  {
    id: "125",
    question: "Como você lida com resistência à mudança em projetos?",
    answer: "Entenda causas da resistência, envolva stakeholders cedo, comunique benefícios claramente, demonstre quick wins, ofereça treinamento, seja empático e ajuste abordagem quando necessário.",
    category: "consulting"
  },
  {
    id: "125a",
    question: "Como você constrói credibilidade com clientes?",
    answer: "Demonstre expertise, entregue resultados, seja transparente, cumpra prazos, comunique claramente, ouça ativamente, adapte-se ao contexto do cliente e construa relacionamento de confiança.",
    category: "consulting"
  },
  {
    id: "125b",
    question: "Descreva um projeto de consultoria desafiador",
    answer: "Use STAR explicando o contexto, complexidade do problema, sua abordagem, desafios enfrentados, soluções implementadas, gestão de stakeholders e resultados mensuráveis alcançados.",
    category: "consulting"
  },
  {
    id: "125c",
    question: "Como você transfere conhecimento para o cliente?",
    answer: "Crie documentação clara, conduza treinamentos, faça workshops práticos, desenvolva materiais de referência, acompanhe implementação, esteja disponível para dúvidas e garanta autonomia.",
    category: "consulting"
  },
  {
    id: "125d",
    question: "Como você mede sucesso de projetos de consultoria?",
    answer: "Defina KPIs claros no início, estabeleça baseline, monitore progresso, colete feedback, meça ROI, avalie mudanças comportamentais, documente lições aprendidas e faça follow-up pós-projeto.",
    category: "consulting"
  },
]

const generalTips = [
  "Pesquise sobre a empresa antes da entrevista",
  "Prepare perguntas inteligentes para fazer ao entrevistador",
  "Vista-se adequadamente para a cultura da empresa",
  "Chegue 10-15 minutos antes do horário",
  "Traga cópias do seu currículo",
  "Desligue o celular durante a entrevista",
  "Mantenha contato visual e linguagem corporal positiva",
  "Seja honesto sobre suas habilidades e experiências",
  "Envie um email de agradecimento após a entrevista",
  "Pratique suas respostas, mas não decore",
  "Prepare exemplos concretos usando o método STAR",
  "Demonstre entusiasmo genuíno pela oportunidade",
]

const dosDonts = [
  {
    type: "do",
    tip: "Chegue no horário ou alguns minutos antes"
  },
  {
    type: "do",
    tip: "Vista-se de forma profissional e adequada"
  },
  {
    type: "do",
    tip: "Mantenha contato visual e postura confiante"
  },
  {
    type: "do",
    tip: "Prepare perguntas sobre a empresa e a vaga"
  },
  {
    type: "do",
    tip: "Demonstre entusiasmo e interesse genuíno"
  },
  {
    type: "do",
    tip: "Use exemplos concretos ao responder perguntas"
  },
  {
    type: "dont",
    tip: "Não chegue atrasado ou muito cedo demais"
  },
  {
    type: "dont",
    tip: "Não use roupas muito casuais ou inadequadas"
  },
  {
    type: "dont",
    tip: "Não fale mal de empregadores anteriores"
  },
  {
    type: "dont",
    tip: "Não minta sobre suas qualificações"
  },
  {
    type: "dont",
    tip: "Não use o celular durante a entrevista"
  },
  {
    type: "dont",
    tip: "Não interrompa o entrevistador"
  },
]

const additionalInfo = [
  {
    title: "Método STAR",
    description: "Estruture suas respostas usando Situação, Tarefa, Ação e Resultado para demonstrar suas competências com exemplos concretos.",
    icon: Target
  },
  {
    title: "Linguagem Corporal",
    description: "Mantenha postura ereta, aperto de mão firme, contato visual adequado e evite gestos nervosos que possam transmitir insegurança.",
    icon: Users
  },
  {
    title: "Pesquisa Prévia",
    description: "Conheça a missão, valores, produtos e notícias recentes da empresa. Isso demonstra interesse genuíno e preparação.",
    icon: Search
  },
  {
    title: "Perguntas Inteligentes",
    description: "Prepare perguntas sobre cultura, desafios da posição, expectativas e oportunidades de crescimento. Evite perguntar sobre salário logo no início.",
    icon: Lightbulb
  },
]

export default function InterviewTips() {
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [searchTerm, setSearchTerm] = useState("")
  const [expandedTips, setExpandedTips] = useState<Set<string>>(new Set())

  const toggleTip = (id: string) => {
    const newExpanded = new Set(expandedTips)
    if (newExpanded.has(id)) {
      newExpanded.delete(id)
    } else {
      newExpanded.add(id)
    }
    setExpandedTips(newExpanded)
  }

  const filteredTips = interviewTips.filter(tip => {
    const matchesCategory = selectedCategory === "all" || tip.category === selectedCategory
    const matchesSearch = tip.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         tip.answer.toLowerCase().includes(searchTerm.toLowerCase())
    return matchesCategory && matchesSearch
  })

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card className="bg-gradient-to-r from-blue-600 to-green-600 text-white border-0">
        <CardHeader>
          <CardTitle className="text-2xl md:text-3xl">Dicas de Entrevista</CardTitle>
          <CardDescription className="text-blue-100">
            Prepare-se para sua próxima entrevista com dicas especializadas, vídeos educativos e informações completas
          </CardDescription>
        </CardHeader>
      </Card>

      {/* Tabs */}
      <Tabs defaultValue="perguntas" className="w-full">
        <TabsList className="grid w-full grid-cols-4 lg:w-auto lg:inline-grid">
          <TabsTrigger value="perguntas">Perguntas</TabsTrigger>
          <TabsTrigger value="videos">Vídeos</TabsTrigger>
          <TabsTrigger value="dicas">Dicas Gerais</TabsTrigger>
          <TabsTrigger value="info">Informações</TabsTrigger>
        </TabsList>

        {/* Perguntas Tab */}
        <TabsContent value="perguntas" className="space-y-6">
          {/* Search */}
          <Card>
            <CardContent className="pt-6">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <Input
                  placeholder="Buscar perguntas e dicas..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </CardContent>
          </Card>

          {/* Categories */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3">
            {categories.map((category) => {
              const Icon = category.icon
              const isSelected = selectedCategory === category.id
              return (
                <Button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  variant={isSelected ? "default" : "outline"}
                  className={`h-auto py-4 flex flex-col items-center gap-2 ${
                    isSelected ? "shadow-lg" : ""
                  }`}
                >
                  <div className={`${category.color} p-2 rounded-lg ${isSelected ? "bg-white/20" : ""}`}>
                    <Icon className={`w-5 h-5 ${isSelected ? "text-white" : "text-white"}`} />
                  </div>
                  <span className="text-xs sm:text-sm font-medium text-center">{category.name}</span>
                </Button>
              )
            })}
          </div>

          {/* Interview Questions */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold">
                Perguntas Frequentes
                <Badge variant="secondary" className="ml-3">
                  {filteredTips.length} perguntas
                </Badge>
              </h2>
            </div>

            {filteredTips.length === 0 ? (
              <Card>
                <CardContent className="py-12 text-center">
                  <p className="text-gray-500">Nenhuma pergunta encontrada. Tente outro termo de busca.</p>
                </CardContent>
              </Card>
            ) : (
              <div className="space-y-3">
                {filteredTips.map((tip) => {
                  const isExpanded = expandedTips.has(tip.id)
                  const category = categories.find(c => c.id === tip.category)
                  const Icon = category?.icon || Briefcase

                  return (
                    <Card key={tip.id} className="overflow-hidden hover:shadow-md transition-shadow">
                      <button
                        onClick={() => toggleTip(tip.id)}
                        className="w-full text-left p-4 sm:p-6 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        <div className="flex items-start justify-between gap-4">
                          <div className="flex items-start gap-3 flex-1">
                            <div className={`${category?.color} p-2 rounded-lg flex-shrink-0`}>
                              <Icon className="w-4 h-4 text-white" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <h3 className="font-semibold text-gray-900 mb-1 pr-4">
                                {tip.question}
                              </h3>
                              {isExpanded && (
                                <p className="text-sm text-gray-700 mt-3 leading-relaxed">
                                  {tip.answer}
                                </p>
                              )}
                            </div>
                          </div>
                          <div className="flex-shrink-0">
                            {isExpanded ? (
                              <ChevronUp className="w-5 h-5 text-gray-400" />
                            ) : (
                              <ChevronDown className="w-5 h-5 text-gray-400" />
                            )}
                          </div>
                        </div>
                      </button>
                    </Card>
                  )
                })}
              </div>
            )}
          </div>
        </TabsContent>

        {/* Vídeos Tab */}
        <TabsContent value="videos" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Video className="w-5 h-5 text-red-500" />
                Vídeos Educativos sobre Entrevistas
              </CardTitle>
              <CardDescription>
                Aprenda com especialistas através de vídeos práticos sobre como se comportar e se destacar em entrevistas
              </CardDescription>
            </CardHeader>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {videoTips.map((video) => (
              <Card key={video.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                <CardContent className="p-0">
                  <div className="aspect-video bg-gray-200 relative group">
                    <iframe
                      src={video.url.replace('watch?v=', 'embed/')}
                      title={video.title}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      className="w-full h-full"
                    />
                  </div>
                  <div className="p-4">
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <h3 className="font-semibold text-gray-900">{video.title}</h3>
                      <Badge variant="secondary" className="flex-shrink-0">{video.duration}</Badge>
                    </div>
                    <p className="text-sm text-gray-600">{video.description}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Dicas Gerais Tab */}
        <TabsContent value="dicas" className="space-y-6">
          {/* General Tips */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Lightbulb className="w-5 h-5 text-yellow-500" />
                Dicas Essenciais para Entrevistas
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {generalTips.map((tip, index) => (
                  <div key={index} className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                    <div className="bg-green-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">
                      {index + 1}
                    </div>
                    <p className="text-sm text-gray-700">{tip}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Do's and Don'ts */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="border-green-200 bg-green-50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-green-700">
                  <CheckCircle2 className="w-5 h-5" />
                  O Que Fazer
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {dosDonts.filter(item => item.type === "do").map((item, index) => (
                    <div key={index} className="flex items-start gap-3 p-3 bg-white rounded-lg">
                      <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                      <p className="text-sm text-gray-700">{item.tip}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="border-red-200 bg-red-50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-red-700">
                  <XCircle className="w-5 h-5" />
                  O Que Evitar
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {dosDonts.filter(item => item.type === "dont").map((item, index) => (
                    <div key={index} className="flex items-start gap-3 p-3 bg-white rounded-lg">
                      <XCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                      <p className="text-sm text-gray-700">{item.tip}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Informações Tab */}
        <TabsContent value="info" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Info className="w-5 h-5 text-blue-500" />
                Informações Importantes
              </CardTitle>
              <CardDescription>
                Conceitos e estratégias fundamentais para se destacar em entrevistas de emprego
              </CardDescription>
            </CardHeader>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {additionalInfo.map((info, index) => {
              const Icon = info.icon
              return (
                <Card key={index} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-3">
                      <div className="bg-blue-100 p-2 rounded-lg">
                        <Icon className="w-5 h-5 text-blue-600" />
                      </div>
                      {info.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-700 leading-relaxed">{info.description}</p>
                  </CardContent>
                </Card>
              )
            })}
          </div>

          {/* Preparação Completa */}
          <Card className="bg-gradient-to-r from-purple-50 to-blue-50 border-purple-200">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-purple-900">
                <AlertCircle className="w-5 h-5" />
                Checklist de Preparação
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <h4 className="font-semibold text-purple-900 mb-3">Antes da Entrevista</h4>
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-green-500 mt-1 flex-shrink-0" />
                    <p className="text-sm">Pesquise sobre a empresa e a vaga</p>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-green-500 mt-1 flex-shrink-0" />
                    <p className="text-sm">Prepare exemplos usando método STAR</p>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-green-500 mt-1 flex-shrink-0" />
                    <p className="text-sm">Escolha roupa adequada e profissional</p>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-green-500 mt-1 flex-shrink-0" />
                    <p className="text-sm">Imprima cópias do currículo</p>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-green-500 mt-1 flex-shrink-0" />
                    <p className="text-sm">Planeje rota e chegue cedo</p>
                  </div>
                </div>
                <div className="space-y-2">
                  <h4 className="font-semibold text-purple-900 mb-3">Durante a Entrevista</h4>
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-green-500 mt-1 flex-shrink-0" />
                    <p className="text-sm">Cumprimente com aperto de mão firme</p>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-green-500 mt-1 flex-shrink-0" />
                    <p className="text-sm">Mantenha contato visual e postura</p>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-green-500 mt-1 flex-shrink-0" />
                    <p className="text-sm">Responda com clareza e objetividade</p>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-green-500 mt-1 flex-shrink-0" />
                    <p className="text-sm">Faça perguntas inteligentes</p>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-green-500 mt-1 flex-shrink-0" />
                    <p className="text-sm">Agradeça pela oportunidade</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
