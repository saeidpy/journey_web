type TokenType = 'refresh' | 'access'
const tokenHeaders = {typ: 'JWT', alg: 'HS256'}
const tokenBody = (type: TokenType) => ({
  exp: Math.round(new Date().getTime() / 1_000 + 1 * 60 * 60),
  fresh: false,
  iat: new Date().getTime() / 1_000,
  jti: '7be86ea5-e3ad-4f74-a330-3e9414cd957a',
  nbf: new Date().getTime() / 1_000,
  sub: 2,
  type,
})
const tokenFooter = {rand: false}

export const tokenCreator = (type: TokenType) =>
  [tokenHeaders, tokenBody(type), tokenFooter].map((item) => window.btoa(JSON.stringify(item))).join('.')
