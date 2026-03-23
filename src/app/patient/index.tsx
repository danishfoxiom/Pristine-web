import React, { useState, useEffect } from 'react'
import { Table, Button, Card, Space } from 'antd'
import { PlusOutlined, MailOutlined, PhoneOutlined } from '@ant-design/icons'
import { useNavigate } from 'react-router-dom'

interface Patient {
  id: string
  firstName: string
  lastName: string
  email: string
  phone: string
  age: number
}

const Patient = () => {
  const [patients, setPatients] = useState<Patient[]>([])
  const navigate = useNavigate()

  useEffect(() => {
    // Load patients from localStorage
    const storedPatients = localStorage.getItem('patients')
    if (storedPatients) {
      try {
        setPatients(JSON.parse(storedPatients))
      } catch (error) {
        console.error('Error loading patients:', error)
      }
    } else {
      // Set default sample data if no patients exist
      const defaultPatients = [
        {
          id: '1',
          firstName: 'John',
          lastName: 'Doe',
          email: 'john.doe@email.com',
          phone: '+1 (555) 123-4567',
          age: 35
        },
        {
          id: '2',
          firstName: 'Jane',
          lastName: 'Smith',
          email: 'jane.smith@email.com',
          phone: '+1 (555) 987-6543',
          age: 28
        }
      ]
      setPatients(defaultPatients)
      localStorage.setItem('patients', JSON.stringify(defaultPatients))
    }
  }, [])

  const columns = [
    {
      title: 'Name',
      dataIndex: 'firstName',
      key: 'name',
      render: (firstName: string, record: Patient) => `${firstName} ${record.lastName}`
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
      render: (email: string) => (
        <Space>
          <MailOutlined />
          {email}
        </Space>
      )
    },
    {
      title: 'Phone',
      dataIndex: 'phone',
      key: 'phone',
      render: (phone: string) => (
        <Space>
          <PhoneOutlined />
          {phone}
        </Space>
      )
    },
    {
      title: 'Age',
      dataIndex: 'age',
      key: 'age'
    }
  ]

  const handleAddPatient = () => {
    navigate('/patient/add')
  }

  return (
    <div className="p-4">
      <Card 
        title="Patient Management"
        extra={
          <Button 
            type="primary" 
            icon={<PlusOutlined />}
            onClick={handleAddPatient}
            size="large"
          >
            Add New Patient
          </Button>
        }
      >
        <Table
          columns={columns}
          dataSource={patients}
          rowKey="id"
          pagination={{
            pageSize: 10,
            showSizeChanger: true,
            showQuickJumper: true,
            showTotal: (total, range) => 
              `${range[0]}-${range[1]} of ${total} patients`
          }}
          size="middle"
        />
      </Card>

    </div>
  )
}

export default Patient