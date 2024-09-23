import { getCardType } from '../../helpers'
import { formatCardNumber, removeCentury } from '../../utils'
import styles from './Card.module.css'
import { CardProps } from './interface'

export function Card({ formData, isFlipped }: CardProps) {
  let expiryDate = 'MM/YY'
  if (formData.cardMonth && formData.cardYear) {
    expiryDate = `${formData.cardMonth}/${removeCentury(formData.cardYear)}`
  } else if (formData.cardMonth && !formData.cardYear) {
    expiryDate = `${formData.cardMonth}/YY`
  } else if (!formData.cardMonth && formData.cardYear) {
    expiryDate = `MM/${removeCentury(formData.cardYear)}`
  }
  const cardNumber = formData.cardNumber

  return (
    <div
      data-cy={'cardContainer'}
      className={`${styles.card} ${isFlipped ? styles.flipped : ''}`}
    >
      <div className={styles.cardFront}>
        <div className={styles.icon}>{getCardType(cardNumber)}</div>
        <div className={styles.chip} />
        <div className={styles.cardNumber}>
          {formData.cardNumber
            ? formatCardNumber(formData.cardNumber)
            : '#### #### #### ####'}
        </div>
        <div className={styles.cardDetails}>
          <div className={styles.cardName}>
            <p>Card holder</p>
            <p>{formData.cardName ? formData.cardName : 'Jane Doe'}</p>
          </div>
          <div className={styles.expiry}>
            <p>Expires</p>
            <p>{expiryDate}</p>
          </div>
        </div>
      </div>
      <div className={styles.cardBack}>
        <div className={styles.strip}></div>
        <div className={styles.cvvContainer}>
          <div className={styles.cvvLabel}>CVV</div>
          <div className={styles.cvvValue}>
            {formData.cardCVV ? formData.cardCVV : '***'}
          </div>
        </div>
      </div>
    </div>
  )
}
