import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Shield, Eye, EyeOff, ArrowLeft } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export default function AdminLogin() {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [credentials, setCredentials] = useState({
    username: '',
    password: '',
  });
  
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Mock admin login - accept any credentials for demo
    setTimeout(() => {
      if (credentials.username && credentials.password) {
        toast({
          title: 'Admin Access Granted',
          description: 'Welcome to the admin dashboard.',
        });
        navigate('/admin/dashboard');
      } else {
        toast({
          title: 'Invalid Credentials',
          description: 'Please enter valid admin credentials.',
          variant: 'destructive',
        });
      }
      setLoading(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-destructive/10 via-background to-destructive/5 flex items-center justify-center p-4">
      {/* Back to home button */}
      <div className="absolute top-4 left-4 z-10">
        <Link to="/">
          <Button variant="ghost" className="text-muted-foreground hover:bg-accent/20">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Home
          </Button>
        </Link>
      </div>

      <Card className="w-full max-w-md shadow-2xl bg-card/95 backdrop-blur border-destructive/20">
        <CardHeader className="text-center pb-6">
          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 bg-gradient-to-br from-destructive to-destructive/80 rounded-2xl flex items-center justify-center shadow-glow">
              <Shield className="text-white h-8 w-8" />
            </div>
          </div>
          <CardTitle className="text-2xl font-bold text-card-foreground">Admin Access</CardTitle>
          <CardDescription className="text-muted-foreground">
            Restricted access for system administrators only.
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="username">Admin Username</Label>
              <Input
                id="username"
                type="text"
                placeholder="Enter admin username"
                value={credentials.username}
                onChange={(e) => setCredentials(prev => ({ ...prev, username: e.target.value }))}
                required
                className="bg-input border-border"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="password">Admin Password</Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Enter admin password"
                  value={credentials.password}
                  onChange={(e) => setCredentials(prev => ({ ...prev, password: e.target.value }))}
                  required
                  className="bg-input border-border pr-10"
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4 text-muted-foreground" />
                  ) : (
                    <Eye className="h-4 w-4 text-muted-foreground" />
                  )}
                </Button>
              </div>
            </div>

            <Button 
              type="submit" 
              className="w-full bg-destructive hover:bg-destructive/90 text-destructive-foreground"
              disabled={loading}
            >
              {loading ? 'Verifying Access...' : 'Access Dashboard'}
            </Button>
          </form>

          <div className="mt-6 p-4 bg-destructive/10 border border-destructive/20 rounded-lg">
            <p className="text-xs text-muted-foreground text-center">
              ⚠️ This is a restricted area. Unauthorized access is prohibited.
              All login attempts are monitored and logged.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}