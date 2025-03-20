const env = import.meta.env

interface IEnvironment {
  ROWS_PER_PAGE: string
  API_URL: string
  RECAPTCHA_SITE_KEY: string
}

export const Environment: IEnvironment = {
  /**
   * Define a quantidade de linhas a ser carregada por padrão nas listagens
   */
  ROWS_PER_PAGE: env.VITE_LIMITE_DE_LINHAS || '4',
  API_URL: env.VITE_API_URL || 'http://localhost:8080',
  RECAPTCHA_SITE_KEY: env.VITE_RECAPTCHA_SITE_KEY || ''
}
