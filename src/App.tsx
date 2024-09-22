import { useState } from 'react'
import Card from './components/Card/Card'
import Container from './components/Container/Container'
import { formSchema } from './utils'
import Form from './components/Form/Form'

function App() {
  const [formData, setFormData] = useState({
    cardNumber: '',
    cardName: '',
    cardMonth: '',
    cardYear: '',
    cardCVV: '',
  })
  const [isFlipped, setIsFlipped] = useState(false)

  const [formErrors, setFormErrors] = useState<
    Record<string, string | undefined>
  >({})

  function handleFormSubmit(data: typeof formData) {
    const result = formSchema.safeParse(data)
    if (!result.success) {
      const errors: Record<string, string | undefined> = {}
      result.error.errors.forEach((err) => {
        errors[err.path[0]] = err.message
      })
      setFormErrors(errors)
      console.log('errors', errors)
      alert(JSON.stringify(errors))
    } else {
      setFormErrors({})
      setFormData(result.data)
      alert(JSON.stringify(result.data))
    }
  }

  return (
    <Container>
      <Card formData={formData} isFlipped={isFlipped} />
      <Form
        onSubmit={handleFormSubmit}
        errors={formErrors}
        formData={formData}
        setFormData={setFormData}
        setIsFlipped={setIsFlipped}
      />
    </Container>
  )
}

export default App
