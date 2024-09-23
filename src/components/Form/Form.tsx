import React from 'react'
import styles from './Form.module.css'
import { FormProps } from './interace'
import Input from '../Input/Input'
import Select from '../Select/Select'
import { formatCardNumber, monthOptions, yearOptions } from '../../utils'

export function Form({
  onSubmit,
  errors,
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
      />
      <Input
        label='Card Name'
        name='cardName'
        value={formData.cardName}
        onChange={handleInputChange}
        error={errors.cardName}
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
        />
      </div>
      <button data-cy='submit' type='submit' className={styles.submitButton}>
        Submit
      </button>
    </form>
  )
}
