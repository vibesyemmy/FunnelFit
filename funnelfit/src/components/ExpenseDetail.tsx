import React from 'react';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';
import { 
  ArrowLeftIcon, 
  EditIcon, 
  TrashIcon, 
  DownloadIcon,
  ReceiptIcon,
  CalendarIcon,
  TagIcon,
  DollarSignIcon,
  FileTextIcon
} from 'lucide-react';

export interface ExpenseData {
  id: string;
  title: string;
  amount: number;
  category: string;
  date: string;
  status: 'pending' | 'categorized' | 'approved' | 'rejected';
  description?: string;
  receiptUrl?: string;
  receiptNumber?: string;
  vendor?: string;
  paymentMethod?: string;
  submittedBy?: string;
  submittedDate?: string;
  approvedBy?: string;
  approvedDate?: string;
  notes?: string;
}

export interface ExpenseDetailProps {
  expense: ExpenseData;
  isOpen: boolean;
  onClose: () => void;
  onEdit?: (expense: ExpenseData) => void;
  onDelete?: (expenseId: string) => void;
  onDownloadReceipt?: (expense: ExpenseData) => void;
}

const getStatusColor = (status: string) => {
  switch (status) {
    case 'pending':
      return 'bg-yellow-100 text-yellow-800';
    case 'categorized':
      return 'bg-blue-100 text-blue-800';
    case 'approved':
      return 'bg-green-100 text-green-800';
    case 'rejected':
      return 'bg-red-100 text-red-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
};

const getCategoryColor = (category: string) => {
  switch (category.toLowerCase()) {
    case 'office expenses':
      return 'bg-blue-100 text-blue-800';
    case 'travel':
      return 'bg-purple-100 text-purple-800';
    case 'meals':
      return 'bg-orange-100 text-orange-800';
    case 'utilities':
      return 'bg-green-100 text-green-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
};

export const ExpenseDetail: React.FC<ExpenseDetailProps> = ({
  expense,
  isOpen,
  onClose,
  onEdit,
  onDelete,
  onDownloadReceipt
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
              className="h-8 w-8 p-0"
            >
              <ArrowLeftIcon className="h-4 w-4" />
            </Button>
            <div>
              <h2 className="text-xl font-semibold text-gray-900">{expense.title}</h2>
              <p className="text-sm text-gray-500">Expense Details</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            {onEdit && (
              <Button variant="outline" size="sm" onClick={() => onEdit(expense)}>
                <EditIcon className="h-4 w-4 mr-2" />
                Edit
              </Button>
            )}
            {onDownloadReceipt && expense.receiptUrl && (
              <Button variant="outline" size="sm" onClick={() => onDownloadReceipt(expense)}>
                <DownloadIcon className="h-4 w-4 mr-2" />
                Download
              </Button>
            )}
            {onDelete && (
              <Button variant="outline" size="sm" onClick={() => onDelete(expense.id)} className="text-red-600 hover:text-red-700">
                <TrashIcon className="h-4 w-4 mr-2" />
                Delete
              </Button>
            )}
          </div>
        </div>

        <div className="p-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Left Column - Expense Information */}
            <div className="space-y-6">
              {/* Basic Information */}
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Expense Information</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <DollarSignIcon className="h-5 w-5 text-gray-400" />
                        <span className="text-sm font-medium text-gray-700">Amount</span>
                      </div>
                      <span className="text-lg font-semibold text-red-600">₦{expense.amount.toLocaleString()}</span>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <TagIcon className="h-5 w-5 text-gray-400" />
                        <span className="text-sm font-medium text-gray-700">Category</span>
                      </div>
                      <Badge className={getCategoryColor(expense.category)}>
                        {expense.category}
                      </Badge>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <CalendarIcon className="h-5 w-5 text-gray-400" />
                        <span className="text-sm font-medium text-gray-700">Date</span>
                      </div>
                      <span className="text-sm text-gray-900">{expense.date}</span>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <FileTextIcon className="h-5 w-5 text-gray-400" />
                        <span className="text-sm font-medium text-gray-700">Status</span>
                      </div>
                      <Badge className={getStatusColor(expense.status)}>
                        {expense.status.charAt(0).toUpperCase() + expense.status.slice(1)}
                      </Badge>
                    </div>
                    
                    {expense.receiptNumber && (
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <ReceiptIcon className="h-5 w-5 text-gray-400" />
                          <span className="text-sm font-medium text-gray-700">Receipt #</span>
                        </div>
                        <span className="text-sm text-gray-900">{expense.receiptNumber}</span>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>

              {/* Additional Details */}
              {(expense.vendor || expense.paymentMethod || expense.description) && (
                <Card>
                  <CardContent className="p-6">
                    <h3 className="text-lg font-medium text-gray-900 mb-4">Additional Details</h3>
                    <div className="space-y-3">
                      {expense.vendor && (
                        <div>
                          <span className="text-sm font-medium text-gray-700">Vendor:</span>
                          <p className="text-sm text-gray-900 mt-1">{expense.vendor}</p>
                        </div>
                      )}
                      {expense.paymentMethod && (
                        <div>
                          <span className="text-sm font-medium text-gray-700">Payment Method:</span>
                          <p className="text-sm text-gray-900 mt-1">{expense.paymentMethod}</p>
                        </div>
                      )}
                      {expense.description && (
                        <div>
                          <span className="text-sm font-medium text-gray-700">Description:</span>
                          <p className="text-sm text-gray-900 mt-1">{expense.description}</p>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Approval Information */}
              {(expense.submittedBy || expense.approvedBy) && (
                <Card>
                  <CardContent className="p-6">
                    <h3 className="text-lg font-medium text-gray-900 mb-4">Approval Information</h3>
                    <div className="space-y-3">
                      {expense.submittedBy && (
                        <div>
                          <span className="text-sm font-medium text-gray-700">Submitted by:</span>
                          <p className="text-sm text-gray-900 mt-1">{expense.submittedBy}</p>
                          {expense.submittedDate && (
                            <p className="text-xs text-gray-500">{expense.submittedDate}</p>
                          )}
                        </div>
                      )}
                      {expense.approvedBy && (
                        <div>
                          <span className="text-sm font-medium text-gray-700">Approved by:</span>
                          <p className="text-sm text-gray-900 mt-1">{expense.approvedBy}</p>
                          {expense.approvedDate && (
                            <p className="text-xs text-gray-500">{expense.approvedDate}</p>
                          )}
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>

            {/* Right Column - Receipt Preview */}
            <div>
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Receipt</h3>
                  {expense.receiptUrl ? (
                    <div className="border border-gray-200 rounded-lg overflow-hidden">
                      <img
                        src={expense.receiptUrl}
                        alt="Receipt"
                        className="w-full h-auto max-h-96 object-contain"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.style.display = 'none';
                          target.nextElementSibling?.classList.remove('hidden');
                        }}
                      />
                      <div className="hidden p-8 text-center bg-gray-50">
                        <ReceiptIcon className="h-12 w-12 text-gray-400 mx-auto mb-2" />
                        <p className="text-sm text-gray-500">Receipt preview not available</p>
                        {onDownloadReceipt && (
                          <Button
                            variant="outline"
                            size="sm"
                            className="mt-2"
                            onClick={() => onDownloadReceipt(expense)}
                          >
                            <DownloadIcon className="h-4 w-4 mr-2" />
                            Download Receipt
                          </Button>
                        )}
                      </div>
                    </div>
                  ) : (
                    <div className="border border-gray-200 rounded-lg p-8 text-center bg-gray-50">
                      <ReceiptIcon className="h-12 w-12 text-gray-400 mx-auto mb-2" />
                      <p className="text-sm text-gray-500">No receipt attached</p>
                    </div>
                  )}
                </CardContent>
              </Card>

              {expense.notes && (
                <Card className="mt-6">
                  <CardContent className="p-6">
                    <h3 className="text-lg font-medium text-gray-900 mb-4">Notes</h3>
                    <p className="text-sm text-gray-700">{expense.notes}</p>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExpenseDetail;