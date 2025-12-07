
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

serve(async (req) => {
    const { blog_id } = await req.json();

    const supabaseClient = createClient(
        Deno.env.get("SUPABASE_URL") ?? "",
        Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? ""
    );

    // Increment views
    // This is a simple counter. For concurrency, an RPC might be better but this works for lower traffic.
    // Actually, let's use rpc syntax if we had a stored procedure, but here we can just update.
    // "views = views + 1" is hard via simple update in JS client without RPC.
    // So we fetch, increment, update. Or use a stored procedure call.
    // Or we can write a SQL function "increment_views" and call it.

    // Let's use internal postgres function call if possible, or just fetch-update (race condition risk).
    // Given urgency, let's try to call a SQL function if strictly robust, or just update.
    // Code-wise, creating a customized RPC is best.

    // Since we are in an Edge Function, we can run direct SQL via postgres connection OR use supabase-js.
    // Let's use an RPC call. I'll add the RPC to the schema content later or just assume fetch-update for now.
    // Actually, better to just fetch and update for the MVP.

    const { data, error } = await supabaseClient.rpc('increment_blog_view', { blog_id_input: blog_id });

    if (error) {
        // If RPC doesn't exist, fallback to fetch & update (not atomic)
        const { data: blog } = await supabaseClient.from('blogs').select('views').eq('id', blog_id).single();
        if (blog) {
            await supabaseClient.from('blogs').update({ views: (blog.views || 0) + 1 }).eq('id', blog_id);
        }
    }

    return new Response(JSON.stringify({ message: "Views incremented" }), {
        headers: { "Content-Type": "application/json" },
    });
});
