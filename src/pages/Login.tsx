
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { useAuth } from '@/hooks/useAuth';

export const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState<'admin' | 'sales_person'>('admin');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const success = await login(email, password, role);
    if (success) {
      navigate('/admin');
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <div className="w-10 h-10 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">C</span>
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">Codelabs</h1>
              <p className="text-xs text-gray-600">Admin Panel</p>
            </div>
          </div>
          <CardTitle className="text-2xl font-bold text-gray-900">Admin Sign In</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="Enter your email"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="Enter your password"
              />
            </div>

            <div className="space-y-3">
              <Label>Role</Label>
              <RadioGroup value={role} onValueChange={(value) => setRole(value as 'admin' | 'sales_person')}>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="admin" id="admin" />
                  <Label htmlFor="admin">Admin</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="sales_person" id="sales_person" />
                  <Label htmlFor="sales_person">Sales Person</Label>
                </div>
              </RadioGroup>
            </div>

            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? 'Signing In...' : 'Sign In'}
            </Button>
          </form>

          <div className="mt-4 p-4 bg-gray-50 rounded-lg text-sm">
            <p className="font-semibold mb-2">Demo Credentials:</p>
            <p><strong>Admin:</strong> admin@codelabs.com / admin123</p>
            <p><strong>Sales:</strong> sales@codelabs.com / admin123</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
