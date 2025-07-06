
import { useEffect, useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { 
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { 
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Plus, Search, Edit, Trash2, GraduationCap } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Textarea } from '@/components/ui/textarea';

interface Student {
  id: string;
  user_id: string;
  email: string;
  full_name: string;
  phone_number: string;
  enrollment_date: string;
  package_plan_name: string;
  plan_details: string;
  counsellor_name: string;
  notes: string;
  is_active: boolean;
  created_at: string;
}

export const StudentManagement = () => {
  const { user: currentUser, isAdmin } = useAuth();
  const { toast } = useToast();
  const [students, setStudents] = useState<Student[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [dialogOpen, setDialogOpen] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    full_name: '',
    phone_number: '',
    enrollment_date: new Date().toISOString().split('T')[0],
    package_plan_name: '',
    plan_details: '',
    counsellor_name: '',
    notes: '',
  });
  const [newStudentCredentials, setNewStudentCredentials] = useState<{email: string, password: string} | null>(null);

  useEffect(() => {
    if (isAdmin) {
      fetchStudents();
    }
  }, [isAdmin]);

  const fetchStudents = async () => {
    try {
      const { data, error } = await supabase.rpc('get_students_with_details');

      if (error) throw error;

      setStudents(data || []);
    } catch (error) {
      console.error('Error fetching students:', error);
      toast({
        title: "Error",
        description: "Failed to fetch students",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const bcrypt = await import('bcryptjs');
      const hashedPassword = await bcrypt.hash(formData.password, 10);

      const { data, error } = await supabase.rpc('create_student', {
        p_email: formData.email,
        p_password: hashedPassword,
        p_full_name: formData.full_name,
        p_phone_number: formData.phone_number || null,
        p_enrollment_date: formData.enrollment_date,
        p_package_plan_name: formData.package_plan_name || null,
        p_plan_details: formData.plan_details || null,
        p_counsellor_name: formData.counsellor_name || null,
        p_notes: formData.notes || null,
      });

      if (error) throw error;

      // Store credentials to show to admin
      setNewStudentCredentials({
        email: formData.email,
        password: formData.password
      });

      toast({
        title: "Success",
        description: "Student created successfully",
      });

      setDialogOpen(false);
      setFormData({
        email: '',
        password: '',
        full_name: '',
        phone_number: '',
        enrollment_date: new Date().toISOString().split('T')[0],
        package_plan_name: '',
        plan_details: '',
        counsellor_name: '',
        notes: '',
      });
      fetchStudents();
    } catch (error) {
      console.error('Error creating student:', error);
      toast({
        title: "Error",
        description: "Failed to create student",
        variant: "destructive",
      });
    }
  };

  const handleDelete = async (userId: string, studentName: string) => {
    if (!confirm(`Are you sure you want to delete student "${studentName}"? This action cannot be undone.`)) return;

    try {
      const { error } = await supabase
        .from('users')
        .update({ is_active: false })
        .eq('id', userId);

      if (error) throw error;

      toast({
        title: "Success",
        description: "Student deleted successfully",
      });

      fetchStudents();
    } catch (error) {
      console.error('Error deleting student:', error);
      toast({
        title: "Error",
        description: "Failed to delete student",
        variant: "destructive",
      });
    }
  };

  const filteredStudents = students.filter(student =>
    student.full_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (!isAdmin) {
    return (
      <div className="text-center py-12">
        <h1 className="text-2xl font-bold text-gray-900">Access Denied</h1>
        <p className="text-gray-600">You don't have permission to access this page.</p>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Student Management</h1>
          <p className="text-gray-600">Manage student accounts and enrollment</p>
        </div>
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              Add Student
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Add New Student</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="email">Email *</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="password">Password *</Label>
                  <Input
                    id="password"
                    type="password"
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    required
                  />
                </div>
              </div>
              
              <div>
                <Label htmlFor="full_name">Full Name *</Label>
                <Input
                  id="full_name"
                  value={formData.full_name}
                  onChange={(e) => setFormData({ ...formData, full_name: e.target.value })}
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="phone_number">Phone Number</Label>
                  <Input
                    id="phone_number"
                    value={formData.phone_number}
                    onChange={(e) => setFormData({ ...formData, phone_number: e.target.value })}
                  />
                </div>
                <div>
                  <Label htmlFor="enrollment_date">Enrollment Date</Label>
                  <Input
                    id="enrollment_date"
                    type="date"
                    value={formData.enrollment_date}
                    onChange={(e) => setFormData({ ...formData, enrollment_date: e.target.value })}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="package_plan_name">Package/Plan Name</Label>
                  <Input
                    id="package_plan_name"
                    value={formData.package_plan_name}
                    onChange={(e) => setFormData({ ...formData, package_plan_name: e.target.value })}
                  />
                </div>
                <div>
                  <Label htmlFor="counsellor_name">Counsellor Name</Label>
                  <Input
                    id="counsellor_name"
                    value={formData.counsellor_name}
                    onChange={(e) => setFormData({ ...formData, counsellor_name: e.target.value })}
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="plan_details">Plan Details</Label>
                <Textarea
                  id="plan_details"
                  value={formData.plan_details}
                  onChange={(e) => setFormData({ ...formData, plan_details: e.target.value })}
                  rows={3}
                />
              </div>

              <div>
                <Label htmlFor="notes">Notes/Remarks</Label>
                <Textarea
                  id="notes"
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  rows={3}
                />
              </div>

              <div className="flex justify-end space-x-2">
                <Button type="button" variant="outline" onClick={() => setDialogOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit">
                  Create Student
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Show new student credentials */}
      {newStudentCredentials && (
        <Card className="border-green-200 bg-green-50">
          <CardHeader>
            <CardTitle className="text-green-800">Student Created Successfully!</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-green-700 mb-2">Please share these credentials with the student:</p>
            <div className="bg-white p-4 rounded border">
              <p><strong>Email:</strong> {newStudentCredentials.email}</p>
              <p><strong>Password:</strong> {newStudentCredentials.password}</p>
            </div>
            <Button 
              variant="outline" 
              className="mt-2" 
              onClick={() => setNewStudentCredentials(null)}
            >
              Close
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Search */}
      <div className="flex items-center space-x-4">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <Input
            placeholder="Search by name or email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      {/* Students Table */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <GraduationCap className="w-5 h-5 mr-2" />
            All Students ({filteredStudents.length})
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Phone</TableHead>
                  <TableHead>Enrollment Date</TableHead>
                  <TableHead>Package</TableHead>
                  <TableHead>Counsellor</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredStudents.map((student) => (
                  <TableRow key={student.id}>
                    <TableCell className="font-medium">{student.full_name}</TableCell>
                    <TableCell>{student.email}</TableCell>
                    <TableCell>{student.phone_number || 'N/A'}</TableCell>
                    <TableCell>{new Date(student.enrollment_date).toLocaleDateString()}</TableCell>
                    <TableCell>{student.package_plan_name || 'N/A'}</TableCell>
                    <TableCell>{student.counsellor_name || 'N/A'}</TableCell>
                    <TableCell>
                      <Badge variant={student.is_active ? "default" : "secondary"}>
                        {student.is_active ? 'Active' : 'Inactive'}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex space-x-2">
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => handleDelete(student.user_id, student.full_name)}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
