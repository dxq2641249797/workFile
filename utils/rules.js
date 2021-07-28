
function telephoneRule(rules, value, callback) {
  const RE = /^1([38][0-9]|4[579]|5[0-3,5-9]|6[6]|7[0135678]|9[89])\d{8}$/
  if (RE.test(value)) {
    callback()
  } else {
    callback(new Error('请正确输入手机号'))
  }
}
function emailRule(rules, value, callback) {
  const RE = /^(\w-*\.*)+@(\w-?)+(\.\w{2,})+$/
  if (RE.test(value)) {
    callback()
  } else {
    callback(new Error('请正确输入邮箱'))
  }
}
function fixedLineTelephoneRule(rules, value, callback) {
  const RE = /^0\d{2,3}-?\d{7,8}$/
  if (value) {
    if (RE.test(value)) {
      callback()
    } else {
      callback(new Error('请正确输入座机'))
    }
  } else {
    callback()
  }
}
// 校验规则 非必填
function notTelephoneRule(rules, value, callback) {
  const RE = /^1([38][0-9]|4[579]|5[0-3,5-9]|6[6]|7[0135678]|9[89])\d{8}$/
  if (value.trim() !== '') {
    if (RE.test(value)) {
      callback()
    } else {
      callback(new Error('请正确输入手机号'))
    }
  } else {
    callback()
  }
}
function notEmailRule(rules, value, callback) {
  const RE = /^(\w-*\.*)+@(\w-?)+(\.\w{2,})+$/
  if (value.trim() !== '') {
    if (RE.test(value)) {
      callback()
    } else {
      callback(new Error('请正确输入邮箱'))
    }
  } else {
    callback()
  }
}
export { telephoneRule, emailRule, fixedLineTelephoneRule, notTelephoneRule, notEmailRule }
