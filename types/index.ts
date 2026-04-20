export type RiskLevel = 'low' | 'medium' | 'high' | 'critical'
export type AuditStatus = 'draft' | 'in_progress' | 'completed'
export type ResponseStatus = 'pending' | 'compliant' | 'non_compliant' | 'partial' | 'na'

export interface ChecklistItem {
  id: string
  sectionId: string
  question: string
  guidance: string
  riskLevel: RiskLevel
  isMandatory: boolean
  orderIndex: number
}

export interface TemplateSection {
  id: string
  title: string
  orderIndex: number
  items: ChecklistItem[]
}

export interface Template {
  id: string
  name: string
  slug: string
  description: string
  category: string
  sections: TemplateSection[]
}

export interface Audit {
  id: string
  templateId: string
  userId: string
  title: string
  clientName: string
  status: AuditStatus
  dueDate: string
  createdAt: string
}

export interface AuditResponse {
  id: string
  auditId: string
  checklistItemId: string
  status: ResponseStatus
  notes: string
  evidenceUrl: string
}