import React from 'react'
import styles from './Form.module.css'
import { FormProps } from './interace'
import Input from '../Input/Input'
import Select from '../Select/Select'
import {
  formatCardNumber,
  formSchema,
  monthOptions,
  yearOptions,
} from '../../utils'

export function Form({
  onSubmit,
  errors,
  setErrors,
  formData,
  setFormData,
  setIsFlipped,
}: FormProps) {
  function handleInputChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) {
    const { name, value } = e.target
    if (name === 'cardNumber' && value.length > 19) {
      return
    } else if (name === 'cardCVV' && value.length > 4) {
      return
    }

    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }))
  }

  //(╯°□°)╯︵ ┻━┻
  function handleBlur(
    e: React.FocusEvent<HTMLInputElement> | React.FocusEvent<HTMLSelectElement>
  ) {
    const { name, value } = e.target

    const dataToValidate = {
      ...formData,
      [name]: value,
    }
    if (name === 'cardMonth' || name === 'cardYear') {
      const result = formSchema.safeParse(dataToValidate)

      const error = result.error?.errors.find(
        (err) => err.path.includes('cardMonth') && err.path.includes('cardYear')
      )

      if (error) {
        setErrors((prevErrors) => ({
          ...prevErrors,
          cardMonth: error.path.includes('cardMonth') ? error.message : '',
          cardYear:
            error.path.includes('cardYear') && error.message !== 'Expired card'
              ? error.message
              : '',
        }))
      } else {
        setErrors((prevErrors) => ({
          ...prevErrors,
          cardMonth: undefined,
          cardYear: undefined,
        }))
      }
    } else {
      const result = formSchema.safeParse(dataToValidate)
      const error = result.error?.errors.find((err) => err.path[0] === name)

      if (error) {
        setErrors((prevErrors) => ({
          ...prevErrors,
          [name]: error.message,
        }))
      } else {
        setErrors((prevErrors) => ({
          ...prevErrors,
          [name]: undefined,
        }))
      }
    }
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    onSubmit(formData)
  }

  function handleFocusCVV() {
    setIsFlipped(true)
  }

  function handleBlurCVV() {
    setIsFlipped(false)
  }

  const cardNumberValue = formatCardNumber(formData.cardNumber)

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <Input
        label='Card Number'
        name='cardNumber'
        value={cardNumberValue}
        onChange={handleInputChange}
        error={errors.cardNumber}
        handleBlur={handleBlur}
      />
      <Input
        label='Card Name'
        name='cardName'
        value={formData.cardName}
        onChange={handleInputChange}
        error={errors.cardName}
        handleBlur={handleBlur}
      />

      <div className={styles.columns}>
        <div className={styles.date}>
          <Select
            label='Expiration Date'
            defaultValue='Month'
            name='cardMonth'
            value={formData.cardMonth}
            onChange={handleInputChange}
            options={monthOptions}
            error={errors.cardMonth}
            handleBlur={handleBlur}
          />
          <Select
            label='Expiration Year'
            defaultValue='Year'
            name='cardYear'
            displayLabel={false}
            value={formData.cardYear}
            onChange={handleInputChange}
            options={yearOptions}
            error={errors.cardYear}
            handleBlur={handleBlur}
          />
        </div>
        <Input
          label='CVV'
          name='cardCVV'
          value={formData.cardCVV}
          onChange={handleInputChange}
          error={errors.cardCVV}
          handleBlurCVV={handleBlurCVV}
          handleFocusCVV={handleFocusCVV}
          handleBlur={handleBlur}
        />
      </div>
      <button data-cy='submit' type='submit' className={styles.submitButton}>
        Submit
      </button>
    </form>
  )
}
