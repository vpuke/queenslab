import { SelectProps } from './interface'
import styles from '../../index.module.css'
import selectStyle from './Select.module.css'

function Select({
  label,
  name,
  value,
  options,
  onChange,
  error,
  displayLabel = true,
  defaultValue,
}: SelectProps) {
  return (
    <div className={styles.inputContainer}>
      {label && displayLabel && (
        <label htmlFor={name} className={styles.label}>
          {label}
        </label>
      )}
      <select
        className={`${styles.input} ${selectStyle.customSelect}`}
        id={name}
        name={name}
        value={value}
        onChange={onChange}
      >
        <option value='' disabled hidden>
          {defaultValue}
        </option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      <div className={styles.errorContainer}>
        {error && <p className={styles.error}>{error}</p>}
      </div>
    </div>
  )
}

export default Select
