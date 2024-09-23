import { InputProps } from './interface'
import styles from '../../index.module.css'

function Input({
  label,
  name,
  value,
  onChange,
  error,
  handleBlurCVV,
  handleFocusCVV,
  handleBlur,
}: InputProps) {
  return (
    <div className={styles.inputContainer}>
      <label htmlFor={name} className={styles.label}>
        {label}
      </label>
      <input
        className={styles.input}
        id={name}
        data-cy={`input-${name}`}
        name={name}
        type='text'
        value={value}
        onChange={onChange}
        onBlur={(e) => {
          if (name === 'cardCVV' && handleBlurCVV) {
            handleBlurCVV(e)
          }
          handleBlur?.(e)
        }}
        onFocus={handleFocusCVV}
      />
      <div className={styles.errorContainer}>
        {error && (
          <p data-cy={`error-${name}`} className={styles.error}>
            {error}
          </p>
        )}
      </div>
    </div>
  )
}

export default Input
