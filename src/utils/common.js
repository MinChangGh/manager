import Cookies from 'js-cookie'

const TokenKey = 'Access-Token'
const Cno = 'Access-Cno'

export function getToken() {
  return Cookies.get(TokenKey)
}

export function setToken(token) {
  return Cookies.set(TokenKey, token)
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}

export function getCno() {
  return Cookies.get(Cno)
}

export function setCno(cno) {
  return Cookies.set(Cno, cno)
}

export function removeCno() {
  return Cookies.remove(Cno)
}
