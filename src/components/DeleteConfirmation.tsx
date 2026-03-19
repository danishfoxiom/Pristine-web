import React from "react";
import { AlertCircle } from "lucide-react";
import { Button } from "antd";

interface DeleteConfirmationProps {
  item: any | null;
  itemName: string;
  itemType: string;
  isOpen: boolean;
  onCancel: () => void;
  onConfirm: () => void;
  isSubmitting: boolean;
}

const DeleteConfirmation: React.FC<DeleteConfirmationProps> = ({
  item,
  itemName,
  itemType,
  isOpen,
  onCancel,
  onConfirm,
  isSubmitting,
}) => {
  if (!item || !isOpen) return null;

  return (
    <div className="p-6">
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

      <div className="flex justify-end space-x-3 pt-4 border-t border-gray-200">
        <Button onClick={onCancel} disabled={isSubmitting} size="large">
          Cancel
        </Button>
        <Button
          onClick={onConfirm}
          loading={isSubmitting}
          size="large"
          danger
          style={{
            minWidth: "120px",
          }}
        >
          {isSubmitting ? `Deleting...` : `Delete ${itemType}`}
        </Button>
      </div>
    </div>
  );
};

export default DeleteConfirmation;
