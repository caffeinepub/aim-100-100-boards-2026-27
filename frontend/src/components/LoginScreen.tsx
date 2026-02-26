import { useState } from 'react';
import { Eye, EyeOff, Lock, User, BookOpen } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

interface AuthHook {
  isAuthenticated: boolean;
  username: string | null;
  isFirstTime: boolean;
  error: string | null;
  login: (username: string, password: string) => Promise<boolean>;
  setupPassword: (username: string, password: string) => Promise<boolean>;
  logout: () => void;
  clearError: () => void;
}

interface LoginScreenProps {
  auth: AuthHook;
}

export default function LoginScreen({ auth }: LoginScreenProps) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    auth.clearError();
    if (auth.isFirstTime) {
      if (password !== confirmPassword) {
        return;
      }
      setLoading(true);
      await auth.setupPassword(username, password);
      setLoading(false);
    } else {
      setLoading(true);
      await auth.login(username, password);
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-96 h-96 rounded-full opacity-10"
          style={{ background: 'radial-gradient(circle, oklch(0.75 0.17 55), transparent)' }} />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 rounded-full opacity-10"
          style={{ background: 'radial-gradient(circle, oklch(0.65 0.15 45), transparent)' }} />
      </div>

      <div className="w-full max-w-md relative z-10">
        {/* Logo & Title */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <div className="w-16 h-16 rounded-2xl flex items-center justify-center shadow-gold"
              style={{ background: 'linear-gradient(135deg, oklch(0.65 0.17 55), oklch(0.78 0.15 65))' }}>
              <BookOpen className="w-8 h-8 text-white" />
            </div>
          </div>
          <h1 className="text-3xl font-heading font-bold text-foreground">
            Aim <span className="gold-text">100/100</span>
          </h1>
          <p className="text-muted-foreground mt-1 font-body">Boards 2026–27</p>
        </div>

        <Card className="premium-card border-border/50">
          <CardHeader className="pb-4">
            <CardTitle className="font-heading text-xl">
              {auth.isFirstTime ? '🎯 Create Your Account' : '👋 Welcome Back'}
            </CardTitle>
            <CardDescription>
              {auth.isFirstTime
                ? 'Set up your password to secure your study platform'
                : 'Sign in to continue your journey to 100/100'}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="username" className="font-medium">Username</Label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    id="username"
                    type="text"
                    placeholder="Enter your name"
                    value={username}
                    onChange={e => setUsername(e.target.value)}
                    className="pl-10"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" className="font-medium">Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    placeholder={auth.isFirstTime ? 'Create a password (min 4 chars)' : 'Enter your password'}
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    className="pl-10 pr-10"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {auth.isFirstTime && (
                <div className="space-y-2">
                  <Label htmlFor="confirmPassword" className="font-medium">Confirm Password</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                      id="confirmPassword"
                      type={showPassword ? 'text' : 'password'}
                      placeholder="Confirm your password"
                      value={confirmPassword}
                      onChange={e => setConfirmPassword(e.target.value)}
                      className="pl-10"
                      required
                    />
                  </div>
                  {password && confirmPassword && password !== confirmPassword && (
                    <p className="text-destructive text-sm">Passwords do not match</p>
                  )}
                </div>
              )}

              {auth.error && (
                <div className="bg-destructive/10 border border-destructive/20 rounded-lg p-3">
                  <p className="text-destructive text-sm">{auth.error}</p>
                </div>
              )}

              <Button
                type="submit"
                className="w-full font-semibold"
                disabled={loading || (auth.isFirstTime && password !== confirmPassword)}
                style={{ background: 'linear-gradient(135deg, oklch(0.65 0.17 55), oklch(0.75 0.15 65))' }}
              >
                {loading ? (
                  <span className="flex items-center gap-2">
                    <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    {auth.isFirstTime ? 'Setting up...' : 'Signing in...'}
                  </span>
                ) : (
                  auth.isFirstTime ? '🚀 Start My Journey' : '🎯 Sign In'
                )}
              </Button>
            </form>
          </CardContent>
        </Card>

        <p className="text-center text-muted-foreground text-sm mt-6">
          Your data is stored securely on your device
        </p>
      </div>
    </div>
  );
}
