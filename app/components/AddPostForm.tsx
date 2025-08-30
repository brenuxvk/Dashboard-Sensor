// app/components/AddPostForm.tsx

import { addPost } from '@/app/actions';

export default function AddPostForm() {
  return (
    <form action={addPost} style={{ display: 'flex', flexDirection: 'column', gap: '10px', maxWidth: '400px', marginBottom: '40px' }}>
      <h2>Adicionar Novo Post</h2>
      <input
        type="text"
        name="title"
        placeholder="Título do Post"
        required
        style={{ padding: '8px' }}
      />
      <textarea
        name="content"
        placeholder="Conteúdo do post..."
        required
        style={{ padding: '8px', minHeight: '100px' }}
      />
      <button
        type="submit"
        style={{ padding: '10px', cursor: 'pointer' }}
      >
        Salvar Post
      </button>
    </form>
  );
}