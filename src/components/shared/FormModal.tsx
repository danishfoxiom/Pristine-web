import React from 'react';
import { Form } from 'antd';
import AppModal from './AppModal';

interface FormModalProps {
  open: boolean;
  onCancel: () => void;
  onOk: () => void;
  title: string;
  children: React.ReactNode;
  okText?: string;
  cancelText?: string;
  width?: number;
  loading?: boolean;
  form?: any;
  initialValues?: any;
  layout?: 'horizontal' | 'vertical' | 'inline';
  className?: string;
}

const FormModal: React.FC<FormModalProps> = ({
  open,
  onCancel,
  onOk,
  title,
  children,
  okText = 'Save',
  cancelText = 'Cancel',
  width = 600,
  loading = false,
  form,
  initialValues = {},
  layout = 'vertical',
  className = '',
}) => {
  const [formInstance] = Form.useForm(form);

  const handleOk = async () => {
    try {
      await formInstance.validateFields();
      onOk();
    } catch (error) {
      console.log('Validation failed:', error);
    }
  };

  const handleCancel = () => {
    formInstance.resetFields();
    onCancel();
  };

  return (
    <AppModal
      open={open}
      onCancel={handleCancel}
      onOk={handleOk}
      title={title}
      okText={okText}
      cancelText={cancelText}
      width={width}
      loading={loading}
      className={`form-modal ${className}`}
    >
      <Form
        form={formInstance}
        layout={layout}
        initialValues={initialValues}
        className="space-y-4"
      >
        {children}
      </Form>
    </AppModal>
  );
};

export default FormModal;
