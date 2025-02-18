const env = import.meta.env

interface IEnvironment {
  ROWS_PER_PAGE: string
}

export const Environment: IEnvironment = {
  /**
   * Define a quantidade de linhas a ser carregada por padrão nas listagens
   */
  ROWS_PER_PAGE: env.VITE_LIMITE_DE_LINHAS || '4'
}
