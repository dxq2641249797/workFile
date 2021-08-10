import md5 from 'js-md5'
export function md5_salt(password) {
  // return Cookies.get(TokenKey)
  return md5(md5(password) + '45fduuULwS')
}
