import Mastercard from '../components/Icons/Mastercard'
import Visa from '../components/Icons/Visa'
import Discover from '../components/Icons/Discover'
import Amex from '../components/Icons/Amex'

export function getCardType(cardNumber: string): React.ReactNode {
  const firstDigit = cardNumber.charAt(0)
  switch (firstDigit) {
    case '4':
      return <Visa />
    case '5':
      return <Mastercard />
    case '3':
      if (cardNumber.charAt(1) === '4' || cardNumber.charAt(1) === '7') {
        return <Amex />
      }
      break
    case '6':
      if (
        cardNumber.startsWith('6011') ||
        cardNumber.startsWith('622') ||
        cardNumber.startsWith('64') ||
        cardNumber.startsWith('65')
      ) {
        return <Discover />
      }
      break
    default:
      return null
  }
}
