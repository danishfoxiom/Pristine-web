import React, { useState } from 'react'
import { Form, Input, Button, Checkbox, Row, Col, message, Radio } from 'antd'

const { TextArea } = Input

interface SectionTwoProps {
  onComplete: () => void
}

const SectionTwo: React.FC<SectionTwoProps> = ({ onComplete }) => {
  const [form] = Form.useForm()
  const [loading, setLoading] = useState(false)

  const handleSubmit = async () => {
    setLoading(true)
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      message.success('Medical history saved successfully!')
      onComplete()
    } catch (error) {
      message.error('Failed to save medical history')
    } finally {
      setLoading(false)
    }
  }

  return (
    <Form
      form={form}
      layout="vertical"
      onFinish={handleSubmit}
      className="max-w-2xl"
    >
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
            <Col span={8}>
              <Checkbox value="diabetes">Diabetes</Checkbox>
            </Col>
            <Col span={8}>
              <Checkbox value="hypertension">Hypertension</Checkbox>
            </Col>
            <Col span={8}>
              <Checkbox value="heart_disease">Heart Disease</Checkbox>
            </Col>
          </Row>
          <Row>
            <Col span={8}>
              <Checkbox value="asthma">Asthma</Checkbox>
            </Col>
            <Col span={8}>
              <Checkbox value="arthritis">Arthritis</Checkbox>
            </Col>
            <Col span={8}>
              <Checkbox value="none">None</Checkbox>
            </Col>
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

      <Form.Item>
        <Button 
          type="primary" 
          htmlType="submit" 
          loading={loading}
          size="large"
        >
          Save & Continue to Review
        </Button>
      </Form.Item>
    </Form>
  )
}

export default SectionTwo