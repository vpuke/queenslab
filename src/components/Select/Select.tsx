import styles from '../../index.module.css'
import { SelectProps } from './interface'
export function Select({
  label,
  name,
  register,
  error,
  options,
  defaultValue,
  handleOnBlur,
}: SelectProps) {
  return (
    <div className={`${styles.inputContainer} ${styles.select}`}>
      <label htmlFor='cardMonth' className={styles.label}>
        {label}
      </label>
      <select
        className={`${styles.input} ${styles.customSelect}`}
        data-cy={`select-${name}`}
        {...register(name, {
          onBlur: handleOnBlur,
        })}
      >
        <option value='' disabled hidden>
          {defaultValue}
        </option>
        {options.map((option) => {
          return (
            <option value={option.value} key={option.value}>
              {option.text}
            </option>
          )
        })}
      </select>
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
