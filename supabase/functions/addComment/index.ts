
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from "https://esm.sh/@supabase/supabase-js@2"

serve(async (req) => {
    const { blog_id, name, comment } = await req.json()

    const supabaseClient = createClient(
        Deno.env.get('SUPABASE_URL') ?? '',
        Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    )

    const { data, error } = await supabaseClient
        .from('comments')
        .insert([
            { blog_id, name, comment }
        ])
        .select()

    if (error) {
        return new Response(JSON.stringify({ error: error.message }), { status: 400 })
    }

    return new Response(
        JSON.stringify(data),
        { headers: { 'Content-Type': 'application/json' } }
    )
})
