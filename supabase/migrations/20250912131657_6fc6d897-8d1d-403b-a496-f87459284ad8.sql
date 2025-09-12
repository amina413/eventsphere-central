-- Add missing RLS policies for complete coverage

-- Additional policies for certificates
CREATE POLICY "Organizers can create certificates" ON public.certificates FOR INSERT 
WITH CHECK (EXISTS (SELECT 1 FROM public.events WHERE events.id = event_id AND events.organizer_id = auth.uid()));

-- Additional policies for notifications
CREATE POLICY "System can create notifications" ON public.notifications FOR INSERT 
WITH CHECK (true); -- Allow system/triggers to create notifications

-- Allow organizers to create notifications for their event participants
CREATE POLICY "Organizers can create event notifications" ON public.notifications FOR INSERT 
WITH CHECK (
    event_id IS NULL OR 
    EXISTS (SELECT 1 FROM public.events WHERE events.id = event_id AND events.organizer_id = auth.uid())
);

-- Add policy for feedback deletion (organizers can delete inappropriate feedback)
CREATE POLICY "Organizers can delete feedback from their events" ON public.feedback FOR DELETE 
USING (EXISTS (SELECT 1 FROM public.events WHERE events.id = feedback.event_id AND events.organizer_id = auth.uid()));

-- Add policy for certificate deletion (organizers can revoke certificates)
CREATE POLICY "Organizers can delete certificates from their events" ON public.certificates FOR DELETE 
USING (EXISTS (SELECT 1 FROM public.events WHERE events.id = certificates.event_id AND events.organizer_id = auth.uid()));