import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { UserPlus, Calendar, MapPin, Users } from 'lucide-react';

interface Event {
  id: string;
  title: string;
  description: string;
  location: string;
  event_date: string;
  capacity: number;
  current_registrations: number;
  fee_amount: number;
}

interface EventRegistrationFormProps {
  event: Event;
  onRegistrationSuccess: () => void;
}

export const EventRegistrationForm = ({ event, onRegistrationSuccess }: EventRegistrationFormProps) => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    phone: '',
    emergency_contact: '',
    dietary_requirements: '',
    additional_info: '',
  });

  const { user } = useAuth();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    setLoading(true);
    try {
      const { error } = await supabase
        .from('event_registrations')
        .insert({
          event_id: event.id,
          user_id: user.id,
          registration_data: formData,
          qr_code: `${event.id}-${user.id}-${Date.now()}`,
        });

      if (error) {
        throw error;
      }

      // Update event registration count
      await supabase
        .from('events')
        .update({ 
          current_registrations: event.current_registrations + 1 
        })
        .eq('id', event.id);

      toast({
        title: 'Registration Successful!',
        description: `You have successfully registered for ${event.title}.`,
      });

      setOpen(false);
      onRegistrationSuccess();
    } catch (error: any) {
      toast({
        title: 'Registration Failed',
        description: error.message || 'Please try again.',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const isEventFull = event.current_registrations >= event.capacity;

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button 
          className="w-full" 
          disabled={isEventFull}
        >
          <UserPlus className="h-4 w-4 mr-2" />
          {isEventFull ? 'Event Full' : 'Register Now'}
        </Button>
      </DialogTrigger>
      
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle>Register for {event.title}</DialogTitle>
          <DialogDescription>
            Please fill out the registration form to secure your spot.
          </DialogDescription>
        </DialogHeader>

        <Card className="border-0">
          <CardHeader className="pb-4">
            <div className="space-y-2 text-sm text-muted-foreground">
              <div className="flex items-center">
                <Calendar className="h-4 w-4 mr-2" />
                {new Date(event.event_date).toLocaleDateString()}
              </div>
              <div className="flex items-center">
                <MapPin className="h-4 w-4 mr-2" />
                {event.location}
              </div>
              <div className="flex items-center">
                <Users className="h-4 w-4 mr-2" />
                {event.current_registrations}/{event.capacity} registered
              </div>
            </div>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number *</Label>
                <Input
                  id="phone"
                  type="tel"
                  required
                  value={formData.phone}
                  onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                  placeholder="Enter your phone number"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="emergency_contact">Emergency Contact</Label>
                <Input
                  id="emergency_contact"
                  type="tel"
                  value={formData.emergency_contact}
                  onChange={(e) => setFormData(prev => ({ ...prev, emergency_contact: e.target.value }))}
                  placeholder="Emergency contact number"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="dietary_requirements">Dietary Requirements</Label>
                <Input
                  id="dietary_requirements"
                  value={formData.dietary_requirements}
                  onChange={(e) => setFormData(prev => ({ ...prev, dietary_requirements: e.target.value }))}
                  placeholder="Any dietary restrictions or allergies"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="additional_info">Additional Information</Label>
                <Textarea
                  id="additional_info"
                  value={formData.additional_info}
                  onChange={(e) => setFormData(prev => ({ ...prev, additional_info: e.target.value }))}
                  placeholder="Any special requirements or comments"
                  rows={3}
                />
              </div>

              {event.fee_amount > 0 && (
                <div className="p-4 bg-accent/10 rounded-lg">
                  <p className="text-sm font-medium">
                    Registration Fee: ₹{event.fee_amount}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Payment will be collected at the venue.
                  </p>
                </div>
              )}

              <div className="flex gap-3 pt-4">
                <Button
                  type="button"
                  variant="outline"
                  className="flex-1"
                  onClick={() => setOpen(false)}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  className="flex-1"
                  disabled={loading}
                >
                  {loading ? 'Registering...' : 'Complete Registration'}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </DialogContent>
    </Dialog>
  );
};