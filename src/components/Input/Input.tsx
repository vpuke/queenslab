import { InputProps } from './interface'
import styles from '../../index.module.css'

function Input({
  label,
  name,
  type,
  register,
  error,
  handleBlur,
  handleFocus,
  handleOnChange,
  maxLength,
}: InputProps) {
  return (
    <div className={styles.inputContainer}>
      <label htmlFor='cardNumber' className={styles.label}>
        {label}
      </label>
      <input
        id={name}
        data-cy={`input-${name}`}
        type={type}
        onFocus={handleFocus}
        maxLength={maxLength}
        className={styles.input}
        {...register(name, {
          onBlur: handleBlur,
          onChange: handleOnChange,
        })}
      />
      <div className={styles.errorContainer}>
        {error && (
          <p data-cy={`error-${name}`} className={styles.error}>
            {error.message}
          </p>
        )}
      </div>
    </div>
  )
}

export default Input
