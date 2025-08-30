'use server';

import prisma from '@/lib/prisma';
import { revalidatePath } from 'next/cache';

export async function addPost(formData: FormData) {
  // Pegamos os dados dos campos do formulário pelo atributo 'name'
  const title = formData.get('title') as string;
  const content = formData.get('content') as string;

  // Usamos o Prisma para criar um novo registro na tabela Post
  await prisma.post.create({
    data: {
      title,
      content,
    },
  });

  // Dizemos ao Next.js para atualizar a página inicial ('/')
  // para que o novo post apareça na lista imediatamente.
  revalidatePath('/');
}