import React, { useState } from 'react'
import { Form, Input, Button, DatePicker, Select, Row, Col, message, Radio, Checkbox, Card, Steps } from 'antd'
import { useNavigate } from 'react-router-dom'
import { UserOutlined, MailOutlined, PhoneOutlined, ArrowLeftOutlined } from '@ant-design/icons'

const { Option } = Select
const { TextArea } = Input

interface PatientFormData {
  firstName: string
  lastName: string
  email: string
  phone: string
  dateOfBirth: any
  gender: string
  address: string
  hasAllergies: string
  allergies: string
  hasChronicConditions: string[]
  medications: string
  surgeries: string
  familyHistory: string
}

const PatientForm: React.FC = () => {
  const [form] = Form.useForm()
  const [loading, setLoading] = useState(false)
  const [currentStep, setCurrentStep] = useState(0)
  const navigate = useNavigate()

  const steps = [
    {
      title: 'Personal Information',
      content: 'personal-info'
    },
    {
      title: 'Medical History',
      content: 'medical-history'
    },
    {
      title: 'Review',
      content: 'review'
    }
  ]

  const handleSubmit = async (values: PatientFormData) => {
    setLoading(true)
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      // Store the new patient data (in a real app, this would be an API call)
      const newPatient = {
        id: String(Date.now()),
        firstName: values.firstName,
        lastName: values.lastName,
        email: values.email,
        phone: values.phone,
        age: new Date().getFullYear() - new Date(values.dateOfBirth).getFullYear()
      }
      
      // Get existing patients from localStorage or use empty array
      const existingPatients = JSON.parse(localStorage.getItem('patients') || '[]')
      const updatedPatients = [...existingPatients, newPatient]
      localStorage.setItem('patients', JSON.stringify(updatedPatients))
      
      message.success('Patient added successfully!')
      navigate('/patient')
    } catch (error) {
      message.error('Failed to add patient')
    } finally {
      setLoading(false)
    }
  }

  const nextStep = async () => {
    try {
      if (currentStep === 0) {
        // Validate personal info section
        await form.validateFields(['firstName', 'lastName', 'email', 'phone', 'dateOfBirth', 'gender', 'address'])
      } else if (currentStep === 1) {
        // Validate medical history section
        await form.validateFields(['hasAllergies', 'allergies', 'hasChronicConditions', 'medications', 'surgeries', 'familyHistory'])
      }
      setCurrentStep(currentStep + 1)
    } catch (error) {
      message.error('Please complete all required fields in this section')
    }
  }

  const prevStep = () => {
    setCurrentStep(currentStep - 1)
  }

  const renderStepContent = () => {
    switch (currentStep) {
      case 0:
        return (
          <div className="w-full">
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item
                  name="firstName"
                  label="First Name"
                  rules={[{ required: true, message: 'Please enter first name' }]}
                >
                  <Input 
                    prefix={<UserOutlined />} 
                    placeholder="Enter first name"
                  />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  name="lastName"
                  label="Last Name"
                  rules={[{ required: true, message: 'Please enter last name' }]}
                >
                  <Input 
                    prefix={<UserOutlined />} 
                    placeholder="Enter last name"
                  />
                </Form.Item>
              </Col>
            </Row>

            <Row gutter={16}>
              <Col span={12}>
                <Form.Item
                  name="email"
                  label="Email"
                  rules={[
                    { required: true, message: 'Please enter email' },
                    { type: 'email', message: 'Please enter a valid email' }
                  ]}
                >
                  <Input 
                    prefix={<MailOutlined />} 
                    placeholder="Enter email address"
                  />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  name="phone"
                  label="Phone Number"
                  rules={[{ required: true, message: 'Please enter phone number' }]}
                >
                  <Input 
                    prefix={<PhoneOutlined />} 
                    placeholder="Enter phone number"
                  />
                </Form.Item>
              </Col>
            </Row>

            <Row gutter={16}>
              <Col span={12}>
                <Form.Item
                  name="dateOfBirth"
                  label="Date of Birth"
                  rules={[{ required: true, message: 'Please select date of birth' }]}
                >
                  <DatePicker 
                    style={{ width: '100%' }}
                    placeholder="Select date of birth"
                  />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  name="gender"
                  label="Gender"
                  rules={[{ required: true, message: 'Please select gender' }]}
                >
                  <Select placeholder="Select gender">
                    <Option value="male">Male</Option>
                    <Option value="female">Female</Option>
                    <Option value="other">Other</Option>
                  </Select>
                </Form.Item>
              </Col>
            </Row>

            <Form.Item
              name="address"
              label="Address"
              rules={[{ required: true, message: 'Please enter address' }]}
            >
              <TextArea 
                rows={3} 
                placeholder="Enter complete address"
              />
            </Form.Item>
          </div>
        )
      
      case 1:
        return (
          <div className="w-full">
            <Form.Item
              name="hasAllergies"
              label="Do you have any allergies?"
              rules={[{ required: true, message: 'Please select an option' }]}
            >
              <Radio.Group>
                <Radio value="yes">Yes</Radio>
                <Radio value="no">No</Radio>
              </Radio.Group>
            </Form.Item>

            <Form.Item
              name="allergies"
              label="Please list your allergies"
              rules={[
                {
                  required: true,
                  message: 'Please list your allergies or select "No"'
                }
              ]}
            >
              <TextArea 
                rows={3} 
                placeholder="List all known allergies (medications, food, etc.)"
              />
            </Form.Item>

          <Form.Item
  name="hasChronicConditions"
  label="Do you have any chronic conditions?"
  rules={[{ required: true, message: 'Please select an option' }]}
>
  <Checkbox.Group>
    <Row>
      <Col span={6}>
        <Checkbox value="diabetes">Diabetes</Checkbox>
      </Col>
      <Col span={8}>
        <Checkbox value="hypertension">Hypertension</Checkbox>
      </Col>
      <Col span={5}>
        <Checkbox value="asthma">Asthma</Checkbox>
      </Col>
      <Col span={5}>
        <Checkbox value="arthritis">Arthritis</Checkbox>
      </Col>
      {/* <Col span={5}>
        <Checkbox value="none">None</Checkbox>
      </Col> */}
    </Row>
  </Checkbox.Group>
</Form.Item>

            <Form.Item
              name="medications"
              label="Current Medications"
              rules={[{ required: true, message: 'Please list current medications or indicate none' }]}
            >
              <TextArea 
                rows={3} 
                placeholder="List all current medications (including over-the-counter)"
              />
            </Form.Item>

            <Form.Item
              name="surgeries"
              label="Previous Surgeries"
              rules={[{ required: true, message: 'Please list previous surgeries or indicate none' }]}
            >
              <TextArea 
                rows={3} 
                placeholder="List previous surgeries with approximate dates"
              />
            </Form.Item>

            <Form.Item
              name="familyHistory"
              label="Family Medical History"
              rules={[{ required: true, message: 'Please provide family medical history' }]}
            >
              <TextArea 
                rows={3} 
                placeholder="Any significant family medical history (heart disease, diabetes, cancer, etc.)"
              />
            </Form.Item>
          </div>
        )
      
      case 2:
        return (
          <div className="w-full">
            <Card title="Review Patient Information" className="mb-4">
              <p>Please review the information provided before submitting.</p>
              <p className="text-gray-600 mt-2">
                Click "Submit" to add the patient, or "Previous" to go back and make changes.
              </p>
            </Card>
          </div>
        )
      
      default:
        return null
    }
  }

  return (
    <div className="p-4">
      <div className="mb-4">
        <Button 
          icon={<ArrowLeftOutlined />} 
          onClick={() => navigate('/patient')}
        >
          Back to Patients
        </Button>
      </div>

      <Card title="Add New Patient" className="w-full">
        <Steps current={currentStep} items={steps} className="mb-6" />

        <Form
          form={form}
          layout="vertical"
          onFinish={handleSubmit}
        >
          {renderStepContent()}

          <div className="flex justify-between mt-6">
            <Button 
              disabled={currentStep === 0}
              onClick={prevStep}
            >
              Previous
            </Button>

            {currentStep === steps.length - 1 ? (
              <Button 
                type="primary" 
                htmlType="submit" 
                loading={loading}
                size="large"
              >
                Submit Patient
              </Button>
            ) : (
              <Button 
                type="primary" 
                onClick={nextStep}
                size="large"
              >
                Next
              </Button>
            )}
          </div>
        </Form>
      </Card>
    </div>
  )
}

export default PatientForm
