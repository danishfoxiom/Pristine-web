import React from 'react';
import { AlertCircle } from 'lucide-react';
import AppModal from './AppModal';

interface DeleteModalProps {
  open: boolean;
  onCancel: () => void;
  onConfirm: () => void;
  itemName: string;
  itemType: string;
  isSubmitting?: boolean;
}

const DeleteModal: React.FC<DeleteModalProps> = ({
  open,
  onCancel,
  onConfirm,
  itemName,
  itemType,
  isSubmitting = false,
}) => {
  return (
    <AppModal
      open={open}
      onCancel={onCancel}
      onOk={onConfirm}
      title="Confirm Deletion"
      okText="Delete"
      cancelText="Cancel"
      okButtonProps={{ danger: true }}
      loading={isSubmitting}
      width={500}
    >
      <div className="flex items-start mb-6">
        <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center flex-shrink-0 mr-4">
          <AlertCircle className="text-red-600" size={24} />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-gray-800">
            Confirm Deletion
          </h3>
          <p className="text-gray-500 mt-1">
            This action cannot be undone. All data associated with this{" "}
            {itemType.toLowerCase()} will be permanently removed.
          </p>
        </div>
      </div>

      <div className="bg-red-50 p-4 rounded-lg border border-red-100 mb-6">
        <p className="mb-1 text-gray-800 font-medium">
          Are you sure you want to delete:
        </p>
        <p className="text-red-600 font-semibold text-lg">{itemName}</p>
      </div>
    </AppModal>
  );
};

export default DeleteModal;
