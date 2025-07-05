
import { useState, useRef } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Upload, Download, CheckCircle, XCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface BulkUploadModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

interface UploadResult {
  total: number;
  successful: number;
  errors: Array<{ row: number; error: string; data: any }>;
}

export const BulkUploadModal = ({ isOpen, onClose, onSuccess }: BulkUploadModalProps) => {
  const { user } = useAuth();
  const { toast } = useToast();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [result, setResult] = useState<UploadResult | null>(null);

  const downloadTemplate = () => {
    const csvContent = [
      ['name', 'email', 'phone', 'experience', 'lead_source', 'deal_value'],
      ['John Doe', 'john@example.com', '+1234567890', '5 years', 'website', '50000'],
      ['Jane Smith', 'jane@example.com', '+1234567891', '3 years', 'referral', '75000'],
    ].map(row => row.join(',')).join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'leads-template.csv';
    a.click();
    window.URL.revokeObjectURL(url);
  };

  const parseCSV = (text: string): any[] => {
    const lines = text.split('\n').filter(line => line.trim());
    if (lines.length < 2) return [];

    const headers = lines[0].split(',').map(h => h.trim().replace(/"/g, ''));
    const rows = [];

    for (let i = 1; i < lines.length; i++) {
      const values = lines[i].split(',').map(v => v.trim().replace(/"/g, ''));
      const row: any = {};
      
      headers.forEach((header, index) => {
        row[header] = values[index] || '';
      });
      
      rows.push(row);
    }

    return rows;
  };

  const validateRow = (row: any, index: number): string | null => {
    if (!row.name || !row.email || !row.phone) {
      return `Row ${index + 2}: Missing required fields (name, email, phone)`;
    }

    if (!/\S+@\S+\.\S+/.test(row.email)) {
      return `Row ${index + 2}: Invalid email format`;
    }

    const validSources = ['website', 'referral', 'social_media', 'advertisement', 'cold_call', 'email_campaign'];
    if (row.lead_source && !validSources.includes(row.lead_source)) {
      return `Row ${index + 2}: Invalid lead source. Must be one of: ${validSources.join(', ')}`;
    }

    return null;
  };

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file || !user) return;

    setUploading(true);
    setProgress(0);
    setResult(null);

    try {
      const text = await file.text();
      const rows = parseCSV(text);

      if (rows.length === 0) {
        throw new Error('No valid data found in file');
      }

      const result: UploadResult = {
        total: rows.length,
        successful: 0,
        errors: []
      };

      for (let i = 0; i < rows.length; i++) {
        const row = rows[i];
        setProgress(((i + 1) / rows.length) * 100);

        // Validate row
        const validationError = validateRow(row, i);
        if (validationError) {
          result.errors.push({ row: i + 2, error: validationError, data: row });
          continue;
        }

        try {
          const { error } = await supabase
            .from('leads')
            .insert([{
              name: row.name,
              email: row.email,
              phone: row.phone,
              experience: row.experience || null,
              lead_source: row.lead_source || 'website',
              deal_value: parseFloat(row.deal_value) || 0,
              status: 'fresh',
            }]);

          if (error) {
            result.errors.push({ row: i + 2, error: error.message, data: row });
          } else {
            result.successful++;
          }
        } catch (error: any) {
          result.errors.push({ row: i + 2, error: error.message, data: row });
        }
      }

      setResult(result);
      
      if (result.successful > 0) {
        toast({
          title: "Upload Complete",
          description: `Successfully imported ${result.successful} out of ${result.total} leads`,
        });
        onSuccess();
      }

    } catch (error: any) {
      console.error('Error uploading file:', error);
      toast({
        title: "Upload Failed",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setUploading(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Bulk Upload Leads</DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          <div>
            <Label>Download Template</Label>
            <p className="text-sm text-gray-600 mb-2">
              Download the CSV template with the correct format and sample data.
            </p>
            <Button variant="outline" onClick={downloadTemplate}>
              <Download className="w-4 h-4 mr-2" />
              Download CSV Template
            </Button>
          </div>

          <div>
            <Label htmlFor="file-upload">Upload CSV File</Label>
            <p className="text-sm text-gray-600 mb-2">
              Select a CSV file with leads data. Required columns: name, email, phone
            </p>
            <Input
              id="file-upload"
              ref={fileInputRef}
              type="file"
              accept=".csv,.xlsx"
              onChange={handleFileUpload}
              disabled={uploading}
            />
          </div>

          {uploading && (
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span>Processing leads...</span>
                <span>{Math.round(progress)}%</span>
              </div>
              <Progress value={progress} />
            </div>
          )}

          {result && (
            <div className="space-y-4">
              <Alert>
                <CheckCircle className="h-4 w-4" />
                <AlertDescription>
                  Upload completed: {result.successful} successful, {result.errors.length} errors out of {result.total} total rows.
                </AlertDescription>
              </Alert>

              {result.errors.length > 0 && (
                <div>
                  <h4 className="font-medium text-red-600 mb-2">Errors:</h4>
                  <div className="max-h-32 overflow-y-auto space-y-1">
                    {result.errors.slice(0, 10).map((error, index) => (
                      <div key={index} className="text-sm text-red-600 bg-red-50 p-2 rounded">
                        {error.error}
                      </div>
                    ))}
                    {result.errors.length > 10 && (
                      <p className="text-sm text-gray-500">
                        ... and {result.errors.length - 10} more errors
                      </p>
                    )}
                  </div>
                </div>
              )}
            </div>
          )}

          <div className="flex justify-end space-x-2">
            <Button variant="outline" onClick={onClose}>
              Close
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
