export function generateAuthError(message) {
  switch (message) {
    case "INVALID_PASSWORD":
    case "EMAIL_NOT_FOUND":
      return "Email или пароль введены неверно"

    case "EMAIL_EXISTS":
      return "Пользователь с таким Email уже сущеуствует"

    default:
      return "Слишком много попыток входа. Попробуйте позднее"
  }
}
