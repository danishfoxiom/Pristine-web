import { useState } from 'react';
import { Button, Table, Space, Tag, Input, InputNumber, Select, Form } from 'antd';
import { Plus, Edit, Trash2, Search } from 'lucide-react';
import EnhancedPagination from '../../components/shared/EnhancedPagination';
import usePagination from '../../hooks/usePagination';
import FormModal from '../../components/shared/FormModal';
import DeleteModal from '../../components/shared/DeleteModal';

interface Product {
  id: string;
  name: string;
  sku: string;
  category: string;
  price: number;
  stock: number;
  status: 'active' | 'inactive' | 'discontinued';
  description: string;
}

const ProductPage = () => {
  const [products, setProducts] = useState<Product[]>([
    {
      id: '1',
      name: 'Laptop Pro 15"',
      sku: 'LP-15-001',
      category: 'Electronics',
      price: 1299.99,
      stock: 45,
      status: 'active',
      description: 'High-performance laptop with 15-inch display'
    },
    {
      id: '2',
      name: 'Wireless Mouse',
      sku: 'WM-001',
      category: 'Accessories',
      price: 29.99,
      stock: 120,
      status: 'active',
      description: 'Ergonomic wireless mouse with long battery life'
    },
    {
      id: '3',
      name: 'USB-C Hub',
      sku: 'UCH-001',
      category: 'Accessories',
      price: 49.99,
      stock: 0,
      status: 'inactive',
      description: 'Multi-port USB-C hub with HDMI and USB 3.0'
    },
    {
      id: '4',
      name: 'Mechanical Keyboard',
      sku: 'MK-001',
      category: 'Accessories',
      price: 89.99,
      stock: 15,
      status: 'active',
      description: 'RGB mechanical keyboard with blue switches'
    },
    {
      id: '5',
      name: 'Tablet Pro 10"',
      sku: 'TP-10-001',
      category: 'Electronics',
      price: 599.99,
      stock: 0,
      status: 'discontinued',
      description: '10-inch professional tablet with stylus'
    },
    {
      id: '6',
      name: 'Gaming Headset',
      sku: 'GH-001',
      category: 'Accessories',
      price: 79.99,
      stock: 35,
      status: 'active',
      description: '7.1 surround sound gaming headset with microphone'
    },
    {
      id: '7',
      name: 'Monitor 27"',
      sku: 'MN-27-001',
      category: 'Electronics',
      price: 349.99,
      stock: 22,
      status: 'active',
      description: '27-inch 4K monitor with HDR support'
    },
    {
      id: '8',
      name: 'Webcam HD',
      sku: 'WC-HD-001',
      category: 'Electronics',
      price: 69.99,
      stock: 58,
      status: 'active',
      description: '1080p HD webcam with auto-focus'
    },
    {
      id: '9',
      name: 'External SSD 1TB',
      sku: 'SSD-1TB-001',
      category: 'Accessories',
      price: 149.99,
      stock: 8,
      status: 'active',
      description: 'Portable 1TB SSD with USB-C connectivity'
    },
    {
      id: '10',
      name: 'Docking Station',
      sku: 'DS-001',
      category: 'Accessories',
      price: 199.99,
      stock: 12,
      status: 'active',
      description: 'Universal docking station with dual display support'
    },
    {
      id: '11',
      name: 'Smartphone Pro',
      sku: 'SP-PRO-001',
      category: 'Electronics',
      price: 899.99,
      stock: 31,
      status: 'active',
      description: 'Latest smartphone with advanced camera system'
    },
    {
      id: '12',
      name: 'Wireless Charger',
      sku: 'WC-WL-001',
      category: 'Accessories',
      price: 39.99,
      stock: 67,
      status: 'active',
      description: 'Fast wireless charging pad for smartphones'
    },
    {
      id: '13',
      name: 'Bluetooth Speaker',
      sku: 'BS-001',
      category: 'Electronics',
      price: 59.99,
      stock: 44,
      status: 'active',
      description: 'Portable bluetooth speaker with waterproof design'
    },
    {
      id: '14',
      name: 'Graphics Tablet',
      sku: 'GT-001',
      category: 'Electronics',
      price: 299.99,
      stock: 5,
      status: 'active',
      description: 'Digital graphics tablet for artists and designers'
    },
    {
      id: '15',
      name: 'Cable Management Kit',
      sku: 'CMK-001',
      category: 'Accessories',
      price: 19.99,
      stock: 89,
      status: 'active',
      description: 'Complete cable management solution for desks'
    },
    {
      id: '16',
      name: 'Smart Watch',
      sku: 'SW-001',
      category: 'Electronics',
      price: 249.99,
      stock: 28,
      status: 'active',
      description: 'Fitness tracker with heart rate monitoring'
    },
    {
      id: '17',
      name: 'Laptop Stand',
      sku: 'LS-001',
      category: 'Accessories',
      price: 34.99,
      stock: 73,
      status: 'active',
      description: 'Adjustable aluminum laptop stand'
    },
    {
      id: '18',
      name: 'Power Bank 20000mAh',
      sku: 'PB-20K-001',
      category: 'Electronics',
      price: 44.99,
      stock: 51,
      status: 'active',
      description: 'High-capacity portable power bank'
    }
  ]);

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const [productToDelete, setProductToDelete] = useState<Product | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [form] = Form.useForm();

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchText.toLowerCase()) ||
    product.sku.toLowerCase().includes(searchText.toLowerCase()) ||
    product.category.toLowerCase().includes(searchText.toLowerCase())
  );

  const pagination = usePagination({
    totalItems: filteredProducts.length,
    initialPage: 1,
    initialItemsPerPage: 10,
    itemsPerPageOptions: [5, 10, 20, 50]
  });

  const paginatedProducts = pagination.paginatedData(filteredProducts);

  const columns = [
    {
      title: 'Product Name',
      dataIndex: 'name',
      key: 'name',
      sorter: (a: Product, b: Product) => a.name.localeCompare(b.name),
      render: (text: string, record: Product) => (
        <div>
          <div className="font-medium text-gray-900">{text}</div>
          <div className="text-sm text-gray-500">SKU: {record.sku}</div>
        </div>
      ),
    },
    {
      title: 'Category',
      dataIndex: 'category',
      key: 'category',
      filters: [
        { text: 'Electronics', value: 'Electronics' },
        { text: 'Accessories', value: 'Accessories' },
      ],
      onFilter: (value: any, record: Product) => record.category === value,
    },
    {
      title: 'Price',
      dataIndex: 'price',
      key: 'price',
      sorter: (a: Product, b: Product) => a.price - b.price,
      render: (price: number) => `$${price.toFixed(2)}`,
      align: 'right' as const,
    },
    {
      title: 'Stock',
      dataIndex: 'stock',
      key: 'stock',
      sorter: (a: Product, b: Product) => a.stock - b.stock,
      render: (stock: number) => (
        <span className={stock === 0 ? 'text-red-600 font-medium' : 'text-gray-700'}>
          {stock}
        </span>
      ),
      align: 'right' as const,
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status: string) => {
        const colorMap = {
          active: 'green',
          inactive: 'orange',
          discontinued: 'red',
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
      render: (_: any, record: Product) => (
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
    setEditingProduct(null);
    form.resetFields();
    setIsModalVisible(true);
  };

  const handleEdit = (product: Product) => {
    setEditingProduct(product);
    form.setFieldsValue(product);
    setIsModalVisible(true);
  };

  const handleDelete = (product: Product) => {
    setProductToDelete(product);
    setDeleteModalVisible(true);
  };

  const handleDeleteConfirm = () => {
    setIsDeleting(true);
    // Simulate API call
    setTimeout(() => {
      if (productToDelete) {
        setProducts(products.filter(p => p.id !== productToDelete.id));
        setProductToDelete(null);
        setDeleteModalVisible(false);
        setIsDeleting(false);
      }
    }, 1000);
  };

  const handleDeleteCancel = () => {
    setProductToDelete(null);
    setDeleteModalVisible(false);
  };

  const handleModalOk = () => {
    form.validateFields().then((values: any) => {
      if (editingProduct) {
        setProducts(products.map(p => 
          p.id === editingProduct.id ? { ...p, ...values } : p
        ));
      } else {
        const newProduct: Product = {
          ...values,
          id: Date.now().toString(),
        };
        setProducts([...products, newProduct]);
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
            <h1 className="text-2xl font-bold text-gray-900">Products</h1>
            <p className="text-gray-600 mt-1">Manage your product inventory</p>
          </div>
          <Button
            type="primary"
            icon={<Plus size={16} />}
            onClick={handleAdd}
            size="large"
            className="bg-[#102257] hover:bg-[#0d1a44] border-[#102257] hover:border-[#0d1a44]"
          >
            Add Product
          </Button>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200">

        <Table
          columns={columns}
          dataSource={paginatedProducts}
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
            totalItems={filteredProducts.length}
            itemsPerPage={pagination.itemsPerPage}
            onItemsPerPageChange={pagination.setItemsPerPage}
            itemsPerPageOptions={[5, 10, 20, 50]}
          />
        </div>
      </div>

      <FormModal
        title={editingProduct ? 'Edit Product' : 'Add New Product'}
        open={isModalVisible}
        onOk={handleModalOk}
        onCancel={handleModalCancel}
        okText={editingProduct ? 'Update' : 'Add'}
        cancelText="Cancel"
        width={600}
        form={form}
        initialValues={{
          status: 'active',
          category: 'Electronics',
          ...(editingProduct || {})
        }}
      >
        <Form.Item
          name="name"
          label="Product Name"
          rules={[{ required: true, message: 'Please enter product name' }]}
        >
          <Input placeholder="Enter product name" />
        </Form.Item>

        <Form.Item
          name="sku"
          label="SKU"
          rules={[{ required: true, message: 'Please enter SKU' }]}
        >
          <Input placeholder="Enter SKU" />
        </Form.Item>

        <Form.Item
          name="category"
          label="Category"
          rules={[{ required: true, message: 'Please select category' }]}
        >
          <Select placeholder="Select category">
            <Select.Option value="Electronics">Electronics</Select.Option>
            <Select.Option value="Accessories">Accessories</Select.Option>
            <Select.Option value="Software">Software</Select.Option>
            <Select.Option value="Other">Other</Select.Option>
          </Select>
        </Form.Item>

        <div className="grid grid-cols-2 gap-4">
          <Form.Item
            name="price"
            label="Price"
            rules={[{ required: true, message: 'Please enter price' }]}
          >
            <InputNumber
              placeholder="0.00"
              min={0}
              precision={2}
              className="w-full"
              addonBefore="$"
            />
          </Form.Item>

          <Form.Item
            name="stock"
            label="Stock Quantity"
            rules={[{ required: true, message: 'Please enter stock quantity' }]}
          >
            <InputNumber
              placeholder="0"
              min={0}
              className="w-full"
            />
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
            <Select.Option value="discontinued">Discontinued</Select.Option>
          </Select>
        </Form.Item>

        <Form.Item
          name="description"
          label="Description"
        >
          <Input.TextArea
            placeholder="Enter product description"
            rows={3}
          />
        </Form.Item>
      </FormModal>

      <DeleteModal
        open={deleteModalVisible}
        onCancel={handleDeleteCancel}
        onConfirm={handleDeleteConfirm}
        itemName={productToDelete?.name || ''}
        itemType="Product"
        isSubmitting={isDeleting}
      />
    </div>
  );
};

export default ProductPage;