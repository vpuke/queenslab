import './index.css'
import { FieldErrors, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { Container } from './components/Container/Container'
import { Card } from './components/Card/Card'
import { useState } from 'react'
import { formatCardNumber, formSchema, months, years } from './utils'
import styles from './index.module.css'
import Input from './components/Input/Input'
import { Select } from './components/Select/Select'
import toast from 'react-hot-toast'

export type Schema = z.infer<typeof formSchema>

export function App() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    setValue,
    trigger,
  } = useForm<Schema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      cardNumber: '',
      cardName: '',
      cardMonth: '',
      cardYear: '',
      cardCVV: '',
    },
    mode: 'all',
  })
  const [isFlipped, setIsFlipped] = useState(false)

  function onSubmit(data: Schema) {
    console.log({ ...data, cardNumber: data.cardNumber.split(' ').join('') })

    toast.success(`Submission successful! Check console`, {
      duration: 6000,
    })
  }

  function onErrors(errors: FieldErrors) {
    console.log(errors)
    toast.error(`Submission failed. Check console`, {
      duration: 6000,
    })
  }

  const [cardNumber, cardName, cardMonth, cardYear, cardCVV] = watch([
    'cardNumber',
    'cardName',
    'cardMonth',
    'cardYear',
    'cardCVV',
  ])

  const formData = {
    cardNumber,
    cardName,
    cardMonth,
    cardYear,
    cardCVV,
  }

  function handleFocusCVV() {
    setIsFlipped(true)
  }

  function handleBlurCVV() {
    setIsFlipped(false)
  }

  function handleMonthYearBlur() {
    if (cardMonth !== '' && cardYear !== '') {
      trigger(['cardMonth', 'cardYear'])
    }
  }

  return (
    <Container>
      <Card formData={formData} isFlipped={isFlipped} />
      <form className={styles.form} onSubmit={handleSubmit(onSubmit, onErrors)}>
        <Input
          register={register}
          name='cardNumber'
          label='Card number*'
          type='text'
          error={errors?.cardNumber}
          maxLength={19}
          handleOnChange={(e) => {
            const formattedValue = formatCardNumber(e.target.value)
            setValue('cardNumber', formattedValue, { shouldValidate: true })
          }}
        />
        <Input
          register={register}
          name='cardName'
          label='Card name*'
          type='text'
          error={errors?.cardName}
        />
        <div className={styles.columns}>
          <div className={styles.date}>
            <Select
              label='Month*'
              defaultValue='Month'
              register={register}
              error={errors.cardMonth}
              name='cardMonth'
              options={months}
              handleOnBlur={handleMonthYearBlur}
            />
            <Select
              label='Year*'
              defaultValue='Year'
              register={register}
              error={errors.cardYear}
              name='cardYear'
              options={years}
              handleOnBlur={handleMonthYearBlur}
            />
          </div>
          <Input
            register={register}
            name='cardCVV'
            label='CVV*'
            type='text'
            error={errors?.cardCVV}
            handleFocus={handleFocusCVV}
            handleBlur={handleBlurCVV}
          />
        </div>
        <input data-cy='submit' className={styles.submitButton} type='submit' />
      </form>
    </Container>
  )
}
