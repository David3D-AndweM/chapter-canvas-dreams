import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type, calendly-webhook-signature',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    const webhookSigningKey = Deno.env.get('CALENDLY_WEBHOOK_SIGNING_KEY');
    const signature = req.headers.get('calendly-webhook-signature');
    
    console.log('Webhook received, signature:', signature ? 'present' : 'missing');
    
    const payload = await req.json();
    console.log('Webhook event type:', payload.event);

    // Handle different event types
    if (payload.event === 'invitee.created') {
      const eventData = payload.payload;
      
      console.log('Processing invitee.created event for:', eventData.email);
      
      // Store booking in database
      const { error } = await supabase.from('calendly_bookings').insert({
        event_id: eventData.uri.split('/').pop(),
        event_name: eventData.event.name,
        invitee_name: eventData.name,
        invitee_email: eventData.email,
        start_time: eventData.scheduled_event.start_time,
        end_time: eventData.scheduled_event.end_time,
        status: 'active',
        calendly_uri: eventData.uri,
      });

      if (error) {
        console.error('Database insert error:', error);
        throw error;
      }
      
      console.log('Booking stored successfully');
    } else if (payload.event === 'invitee.canceled') {
      const eventData = payload.payload;
      
      console.log('Processing invitee.canceled event for:', eventData.uri);
      
      // Update booking status
      const { error } = await supabase
        .from('calendly_bookings')
        .update({ status: 'cancelled', updated_at: new Date().toISOString() })
        .eq('event_id', eventData.uri.split('/').pop());

      if (error) {
        console.error('Database update error:', error);
        throw error;
      }
      
      console.log('Booking cancelled successfully');
    }

    return new Response(JSON.stringify({ success: true }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Webhook error:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
    return new Response(
      JSON.stringify({ error: errorMessage }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});