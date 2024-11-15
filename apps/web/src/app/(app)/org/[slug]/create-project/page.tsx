import { redirect } from 'next/navigation'

import { ability } from '@/auth/auth'

import { ProjectForm } from './project-form'

export default async function CreateProject() {
  // Verificar permissões do usuário
  const permissions = await ability()

  // Redirecionar caso não tenha permissão para criar projeto
  if (permissions?.cannot('create', 'Project')) {
    redirect('/')
  }

  return (
    <div className="space-y-4 py-4">
      <h1 className="text-2xl font-bold">Create Project😉 😎</h1>

      {/* Renderizar o formulário de criação de projeto */}
      <ProjectForm />
    </div>
  )
}
