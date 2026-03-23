import React, { useState } from 'react'
import { Card, Button, Checkbox, message, Space, Divider, Typography } from 'antd'
import { FileTextOutlined, UserOutlined, HeartOutlined } from '@ant-design/icons'

const { Title, Text } = Typography

interface SectionTreeProps {
  onComplete: () => void
}

const SectionTree: React.FC<SectionTreeProps> = ({ onComplete }) => {
  const [loading, setLoading] = useState(false)
  const [confirmed, setConfirmed] = useState(false)

  const handleSubmit = async () => {
    if (!confirmed) {
      message.error('Please confirm the information is accurate')
      return
    }

    setLoading(true)
    try {
      // Simulate API call to submit all data
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      message.success('Patient registration completed successfully!')
      onComplete()
    } catch (error) {
      message.error('Failed to submit registration')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-3xl">
      <Title level={3}>Review Your Information</Title>
      <Text type="secondary">
        Please review all the information you've provided before submitting.
      </Text>

      <div className="mt-6 space-y-4">
        <Card 
          title={
            <span>
              <UserOutlined className="mr-2" />
              Personal Information
            </span>
          }
          size="small"
        >
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Text strong>Name:</Text>
              <br />
              <Text>John Doe</Text>
            </div>
            <div>
              <Text strong>Email:</Text>
              <br />
              <Text>john.doe@email.com</Text>
            </div>
            <div>
              <Text strong>Phone:</Text>
              <br />
              <Text>+1 (555) 123-4567</Text>
            </div>
            <div>
              <Text strong>Date of Birth:</Text>
              <br />
              <Text>January 1, 1990</Text>
            </div>
          </div>
        </Card>

        <Card 
          title={
            <span>
              <HeartOutlined className="mr-2" />
              Medical History
            </span>
          }
          size="small"
        >
          <div className="space-y-3">
            <div>
              <Text strong>Allergies:</Text>
              <br />
              <Text>Penicillin, Peanuts</Text>
            </div>
            <div>
              <Text strong>Chronic Conditions:</Text>
              <br />
              <Text>Hypertension</Text>
            </div>
            <div>
              <Text strong>Current Medications:</Text>
              <br />
              <Text>Lisinopril 10mg daily</Text>
            </div>
          </div>
        </Card>

        <Card 
          title={
            <span>
              <FileTextOutlined className="mr-2" />
              Terms & Conditions
            </span>
          }
          size="small"
        >
          <div className="space-y-3">
            <Text>
              By submitting this form, you confirm that:
            </Text>
            <ul className="list-disc list-inside space-y-2 text-sm">
              <li>All provided information is accurate and complete</li>
              <li>You consent to the processing of your medical information</li>
              <li>You understand this information will be used for medical treatment purposes</li>
              <li>You agree to the privacy policy and terms of service</li>
            </ul>
            
            <Checkbox 
              checked={confirmed}
              onChange={(e) => setConfirmed(e.target.checked)}
              className="mt-4"
            >
              I confirm that all information provided is accurate and I agree to the terms and conditions
            </Checkbox>
          </div>
        </Card>
      </div>

      <Divider />

      <Space size="large">
        <Button 
          type="primary" 
          size="large"
          onClick={handleSubmit}
          loading={loading}
          disabled={!confirmed}
        >
          Submit Registration
        </Button>
      </Space>
    </div>
  )
}

export default SectionTree