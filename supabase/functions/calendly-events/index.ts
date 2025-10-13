import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const accessToken = Deno.env.get('CALENDLY_ACCESS_TOKEN');
    
    if (!accessToken) {
      console.error('Calendly access token not configured');
      throw new Error('Calendly access token not configured. Please complete OAuth flow first.');
    }

    console.log('Fetching user info from Calendly');
    
    // Get current user info
    const userResponse = await fetch('https://api.calendly.com/users/me', {
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
    });

    if (!userResponse.ok) {
      const errorText = await userResponse.text();
      console.error('Failed to fetch user info:', errorText);
      throw new Error('Failed to fetch user info from Calendly');
    }

    const userData = await userResponse.json();
    const userUri = userData.resource.uri;
    
    console.log('Fetching event types for user:', userUri);

    // Get event types
    const eventsResponse = await fetch(`https://api.calendly.com/event_types?user=${userUri}`, {
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
    });

    if (!eventsResponse.ok) {
      const errorText = await eventsResponse.text();
      console.error('Failed to fetch event types:', errorText);
      throw new Error('Failed to fetch event types from Calendly');
    }

    const eventsData = await eventsResponse.json();
    console.log(`Found ${eventsData.collection?.length || 0} event types`);

    return new Response(JSON.stringify(eventsData), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Events fetch error:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
    return new Response(
      JSON.stringify({ error: errorMessage }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});