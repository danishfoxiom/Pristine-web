import React from 'react';
import { Modal, Button } from 'antd';
import { X } from 'lucide-react';

interface AppModalProps {
  open: boolean;
  onCancel: () => void;
  onOk?: () => void;
  title: string;
  children: React.ReactNode;
  okText?: string;
  cancelText?: string;
  okButtonProps?: any;
  cancelButtonProps?: any;
  width?: number;
  loading?: boolean;
  destroyOnClose?: boolean;
  maskClosable?: boolean;
  footer?: React.ReactNode;
  className?: string;
}

const AppModal: React.FC<AppModalProps> = ({
  open,
  onCancel,
  onOk,
  title,
  children,
  okText = 'OK',
  cancelText = 'Cancel',
  okButtonProps = {},
  cancelButtonProps = {},
  width = 600,
  loading = false,
  destroyOnClose = true,
  maskClosable = false,
  footer,
  className = '',
}) => {
  const defaultFooter = onOk ? (
    <div className="flex justify-end space-x-3 pt-4 border-t border-gray-200">
      <Button
        onClick={onCancel}
        disabled={loading}
        size="large"
        {...cancelButtonProps}
      >
        {cancelText}
      </Button>
      <Button
        onClick={onOk}
        loading={loading}
        size="large"
        type="primary"
        style={{ minWidth: "120px" }}
        {...okButtonProps}
      >
        {okText}
      </Button>
    </div>
  ) : null;

  return (
    <Modal
      open={open}
      onCancel={onCancel}
      width={width}
      destroyOnClose={destroyOnClose}
      maskClosable={maskClosable}
      footer={footer !== undefined ? footer : defaultFooter}
      className={`app-modal ${className}`}
      closeIcon={<X size={20} className="text-gray-400 hover:text-gray-600" />}
      title={
        <div className="flex items-center">
          <h2 className="text-xl font-semibold text-gray-900 m-0">{title}</h2>
        </div>
      }
    >
      <div className="p-6">
        {children}
      </div>
    </Modal>
  );
};

export default AppModal;
