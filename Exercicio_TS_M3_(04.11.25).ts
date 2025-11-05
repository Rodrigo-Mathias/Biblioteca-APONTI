class Livro {
  Titulo: string;
  Autor: string;
  Disponivel: boolean;

  constructor(titulo: string, autor: string, disponivel: boolean = true) {
    this.Titulo = titulo;
    this.Autor = autor;
    this.Disponivel = disponivel;
  }
}

class Biblioteca {
  Nome: string;
  acervoLivros: Livro[] = [];

  constructor(nome: string) {
    this.Nome = nome;
  }

  addLivro(livro: Livro): void {
    this.acervoLivros.push(livro);
    console.log(`O livro "${livro.Titulo}" foi adicionado à biblioteca ${this.Nome}!`);
  }

  async emprestarLivro(titulo: string): Promise<Livro | null> {
    const livro = this.acervoLivros.find(l => l.Titulo === titulo);

    if (!livro) {
      console.log(`O livro "${titulo}" não foi encontrado no acervo.`);
      return null;
    }
    if (!livro.Disponivel) {
      console.log(`O livro "${livro.Titulo}" não está disponível.`);
      return null;
    }

    livro.Disponivel = false;
    console.log(`O livro "${livro.Titulo}" foi emprestado com sucesso!`);
    return livro;
  }

  devolverLivro(livro: Livro): void {
    if (!livro.Disponivel) {
      livro.Disponivel = true;
      console.log(`O Livro "${livro.Titulo}" devolvido com sucesso!`);
    } else {
      console.log(`O livro "${livro.Titulo}" já foi devolvido!`);
    }
  }
}

async function main() {
  const biblioteca = new Biblioteca("Biblioteca RCMC");

  const livro1 = new Livro("O Hobbit", "J. R. R. Tolkien");
  const livro2 = new Livro("A Ilha do Tesouro", "Robert Louis Stevenson");

  biblioteca.addLivro(livro1);
  biblioteca.addLivro(livro2);

  const emprestado = await biblioteca.emprestarLivro("A Ilha do Tesouro");
  await biblioteca.emprestarLivro("A Ilha do Tesouro");

  if (emprestado) biblioteca.devolverLivro(emprestado);

  await biblioteca.emprestarLivro("A Ilha do Tesouro");
}

main();