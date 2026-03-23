import { useState } from 'react';
import { Button, Table, Space, Tag, Input, InputNumber, Select, Form } from 'antd';
import { Plus, Edit, Trash2 } from 'lucide-react';
import EnhancedPagination from '../../components/shared/EnhancedPagination';
import usePagination from '../../hooks/usePagination';
import FormModal from '../../components/shared/FormModal';
import DeleteModal from '../../components/shared/DeleteModal';
import { MailOutlined, PhoneOutlined } from '@ant-design/icons';

interface Patient {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  age: number;
  gender: 'male' | 'female' | 'other';
  bloodType: string;
  address: string;
  emergencyContact: string;
  emergencyPhone: string;
  status: 'active' | 'inactive' | 'discharged';
  admissionDate: string;
  notes: string;
}

const PatientPage = () => {
  const [patients, setPatients] = useState<Patient[]>([
    {
      id: '1',
      firstName: 'John',
      lastName: 'Doe',
      email: 'john.doe@email.com',
      phone: '+1 (555) 123-4567',
      age: 35,
      gender: 'male',
      bloodType: 'O+',
      address: '123 Main St, New York, NY 10001',
      emergencyContact: 'Jane Doe',
      emergencyPhone: '+1 (555) 987-6543',
      status: 'active',
      admissionDate: '2024-01-15',
      notes: 'Regular checkups required'
    },
    {
      id: '2',
      firstName: 'Jane',
      lastName: 'Smith',
      email: 'jane.smith@email.com',
      phone: '+1 (555) 234-5678',
      age: 28,
      gender: 'female',
      bloodType: 'A+',
      address: '456 Oak Ave, Los Angeles, CA 90001',
      emergencyContact: 'Bob Smith',
      emergencyPhone: '+1 (555) 345-6789',
      status: 'active',
      admissionDate: '2024-02-20',
      notes: 'Allergic to penicillin'
    },
    {
      id: '3',
      firstName: 'Robert',
      lastName: 'Johnson',
      email: 'robert.johnson@email.com',
      phone: '+1 (555) 456-7890',
      age: 42,
      gender: 'male',
      bloodType: 'B-',
      address: '789 Pine Rd, Chicago, IL 60601',
      emergencyContact: 'Mary Johnson',
      emergencyPhone: '+1 (555) 567-8901',
      status: 'inactive',
      admissionDate: '2024-03-10',
      notes: 'Pre-existing condition: diabetes'
    },
    {
      id: '4',
      firstName: 'Emily',
      lastName: 'Davis',
      email: 'emily.davis@email.com',
      phone: '+1 (555) 678-9012',
      age: 31,
      gender: 'female',
      bloodType: 'AB+',
      address: '321 Elm St, Houston, TX 77001',
      emergencyContact: 'Tom Davis',
      emergencyPhone: '+1 (555) 789-0123',
      status: 'discharged',
      admissionDate: '2024-01-05',
      notes: 'Fully recovered'
    },
    {
      id: '5',
      firstName: 'Michael',
      lastName: 'Wilson',
      email: 'michael.wilson@email.com',
      phone: '+1 (555) 890-1234',
      age: 55,
      gender: 'male',
      bloodType: 'O-',
      address: '654 Maple Dr, Phoenix, AZ 85001',
      emergencyContact: 'Sarah Wilson',
      emergencyPhone: '+1 (555) 901-2345',
      status: 'active',
      admissionDate: '2024-03-25',
      notes: 'Requires physical therapy'
    }
  ]);

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingPatient, setEditingPatient] = useState<Patient | null>(null);
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const [patientToDelete, setPatientToDelete] = useState<Patient | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [form] = Form.useForm();

  const pagination = usePagination({
    totalItems: patients.length,
    initialPage: 1,
    initialItemsPerPage: 10,
    itemsPerPageOptions: [5, 10, 20, 50]
  });

  const paginatedPatients = pagination.paginatedData(patients);

  const columns = [
    {
      title: 'Patient Name',
      dataIndex: 'firstName',
      key: 'name',
      sorter: (a: Patient, b: Patient) => `${a.firstName} ${a.lastName}`.localeCompare(`${b.firstName} ${b.lastName}`),
      render: (firstName: string, record: Patient) => (
        <div>
          <div className="font-medium text-gray-900">{firstName} {record.lastName}</div>
          <div className="text-sm text-gray-500">ID: {record.id}</div>
        </div>
      ),
    },
    {
      title: 'Contact Info',
      key: 'contact',
      render: (_: any, record: Patient) => (
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-sm">
            <MailOutlined size={14} className="text-gray-400" />
            <span>{record.email}</span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <PhoneOutlined size={14} className="text-gray-400" />
            <span>{record.phone}</span>
          </div>
        </div>
      ),
    },
    {
      title: 'Age',
      dataIndex: 'age',
      key: 'age',
      sorter: (a: Patient, b: Patient) => a.age - b.age,
      align: 'right' as const,
    },
    {
      title: 'Gender',
      dataIndex: 'gender',
      key: 'gender',
      filters: [
        { text: 'Male', value: 'male' },
        { text: 'Female', value: 'female' },
        { text: 'Other', value: 'other' },
      ],
      onFilter: (value: any, record: Patient) => record.gender === value,
      render: (gender: string) => (
        <span className="capitalize">{gender}</span>
      ),
    },
    {
      title: 'Blood Type',
      dataIndex: 'bloodType',
      key: 'bloodType',
      render: (bloodType: string) => (
        <Tag color="blue">{bloodType}</Tag>
      ),
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status: string) => {
        const colorMap = {
          active: 'green',
          inactive: 'orange',
          discharged: 'red',
        };
        return (
          <Tag color={colorMap[status as keyof typeof colorMap]}>
            {status.toUpperCase()}
          </Tag>
        );
      },
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_: any, record: Patient) => (
        <Space size="small">
          <Button
            type="text"
            icon={<Edit size={16} />}
            onClick={() => handleEdit(record)}
            className="text-blue-600 hover:text-blue-700 hover:bg-blue-50"
          />
          <Button
            type="text"
            icon={<Trash2 size={16} />}
            onClick={() => handleDelete(record)}
            className="text-red-600 hover:text-red-700 hover:bg-red-50"
          />
        </Space>
      ),
    },
  ];

  const handleAdd = () => {
    setEditingPatient(null);
    form.resetFields();
    setIsModalVisible(true);
  };

  const handleEdit = (patient: Patient) => {
    setEditingPatient(patient);
    form.setFieldsValue(patient);
    setIsModalVisible(true);
  };

  const handleDelete = (patient: Patient) => {
    setPatientToDelete(patient);
    setDeleteModalVisible(true);
  };

  const handleDeleteConfirm = () => {
    setIsDeleting(true);
    // Simulate API call
    setTimeout(() => {
      if (patientToDelete) {
        setPatients(patients.filter(p => p.id !== patientToDelete.id));
        setPatientToDelete(null);
        setDeleteModalVisible(false);
        setIsDeleting(false);
      }
    }, 1000);
  };

  const handleDeleteCancel = () => {
    setPatientToDelete(null);
    setDeleteModalVisible(false);
  };

  const handleModalOk = () => {
    form.validateFields().then((values: any) => {
      if (editingPatient) {
        setPatients(patients.map(p => 
          p.id === editingPatient.id ? { ...p, ...values } : p
        ));
      } else {
        const newPatient: Patient = {
          ...values,
          id: Date.now().toString(),
          admissionDate: new Date().toISOString().split('T')[0],
        };
        setPatients([...patients, newPatient]);
      }
      setIsModalVisible(false);
      form.resetFields();
    });
  };

  const handleModalCancel = () => {
    setIsModalVisible(false);
    form.resetFields();
  };

  return (
    <div className="p-6">
      <div className="mb-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Patients</h1>
            <p className="text-gray-600 mt-1">Manage patient records and information</p>
          </div>
          <Button
            type="primary"
            icon={<Plus size={16} />}
            onClick={handleAdd}
            size="large"
            className="bg-[#102257] hover:bg-[#0d1a44] border-[#102257] hover:border-[#0d1a44]"
          >
            Add Patient
          </Button>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <Table
          columns={columns}
          dataSource={paginatedPatients}
          rowKey="id"
          pagination={false}
          scroll={{ x: 800 }}
          className="ant-table-custom"
        />
        
        <div className="p-4 border-t border-gray-200">
          <EnhancedPagination
            currentPage={pagination.currentPage}
            totalPages={pagination.totalPages}
            onPageChange={pagination.setCurrentPage}
            totalItems={patients.length}
            itemsPerPage={pagination.itemsPerPage}
            onItemsPerPageChange={pagination.setItemsPerPage}
            itemsPerPageOptions={[5, 10, 20, 50]}
          />
        </div>
      </div>

      <FormModal
        title={editingPatient ? 'Edit Patient' : 'Add New Patient'}
        open={isModalVisible}
        onOk={handleModalOk}
        onCancel={handleModalCancel}
        okText={editingPatient ? 'Update' : 'Add'}
        cancelText="Cancel"
        width={600}
        form={form}
        initialValues={{
          gender: 'male',
          status: 'active',
          bloodType: 'O+',
          ...(editingPatient || {})
        }}
      >
        <div className="grid grid-cols-2 gap-4">
          <Form.Item
            name="firstName"
            label="First Name"
            rules={[{ required: true, message: 'Please enter first name' }]}
          >
            <Input placeholder="Enter first name" />
          </Form.Item>

          <Form.Item
            name="lastName"
            label="Last Name"
            rules={[{ required: true, message: 'Please enter last name' }]}
          >
            <Input placeholder="Enter last name" />
          </Form.Item>
        </div>

        <Form.Item
          name="email"
          label="Email"
          rules={[
            { required: true, message: 'Please enter email' },
            { type: 'email', message: 'Please enter a valid email' }
          ]}
        >
          <Input placeholder="Enter email address" />
        </Form.Item>

        <Form.Item
          name="phone"
          label="Phone Number"
          rules={[{ required: true, message: 'Please enter phone number' }]}
        >
          <Input placeholder="Enter phone number" />
        </Form.Item>

        <div className="grid grid-cols-3 gap-4">
          <Form.Item
            name="age"
            label="Age"
            rules={[{ required: true, message: 'Please enter age' }]}
          >
            <InputNumber
              placeholder="0"
              min={0}
              max={150}
              className="w-full"
            />
          </Form.Item>

          <Form.Item
            name="gender"
            label="Gender"
            rules={[{ required: true, message: 'Please select gender' }]}
          >
            <Select placeholder="Select gender">
              <Select.Option value="male">Male</Select.Option>
              <Select.Option value="female">Female</Select.Option>
              <Select.Option value="other">Other</Select.Option>
            </Select>
          </Form.Item>

          <Form.Item
            name="bloodType"
            label="Blood Type"
            rules={[{ required: true, message: 'Please select blood type' }]}
          >
            <Select placeholder="Select blood type">
              <Select.Option value="A+">A+</Select.Option>
              <Select.Option value="A-">A-</Select.Option>
              <Select.Option value="B+">B+</Select.Option>
              <Select.Option value="B-">B-</Select.Option>
              <Select.Option value="AB+">AB+</Select.Option>
              <Select.Option value="AB-">AB-</Select.Option>
              <Select.Option value="O+">O+</Select.Option>
              <Select.Option value="O-">O-</Select.Option>
            </Select>
          </Form.Item>
        </div>

        <Form.Item
          name="address"
          label="Address"
        >
          <Input placeholder="Enter address" />
        </Form.Item>

        <div className="grid grid-cols-2 gap-4">
          <Form.Item
            name="emergencyContact"
            label="Emergency Contact"
          >
            <Input placeholder="Enter emergency contact name" />
          </Form.Item>

          <Form.Item
            name="emergencyPhone"
            label="Emergency Phone"
          >
            <Input placeholder="Enter emergency phone number" />
          </Form.Item>
        </div>

        <Form.Item
          name="status"
          label="Status"
          rules={[{ required: true, message: 'Please select status' }]}
        >
          <Select placeholder="Select status">
            <Select.Option value="active">Active</Select.Option>
            <Select.Option value="inactive">Inactive</Select.Option>
            <Select.Option value="discharged">Discharged</Select.Option>
          </Select>
        </Form.Item>

        <Form.Item
          name="notes"
          label="Notes"
        >
          <Input.TextArea
            placeholder="Enter patient notes"
            rows={3}
          />
        </Form.Item>
      </FormModal>

      <DeleteModal
        open={deleteModalVisible}
        onCancel={handleDeleteCancel}
        onConfirm={handleDeleteConfirm}
        itemName={patientToDelete ? `${patientToDelete.firstName} ${patientToDelete.lastName}` : ''}
        itemType="Patient"
        isSubmitting={isDeleting}
      />
    </div>
  )
}

export default PatientPage;