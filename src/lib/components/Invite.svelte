<script>
  import supabase from "$lib/supabase";
  import { readable } from "svelte/store";

  const invites = readable([], (set) => {
    const fetchInvites = async () => {
      try {
        const { data, error } = await supabase.from("invites").select("*");
        if (error) {
          throw error;
        }
        set(data || []);
      } catch (error) {
        console.error("Error fetching invites:", error.message);
      }
    };

    fetchInvites();
  });
</script>

{#each $invites as invite}
  <div>
    <p>Name: {invite.dishName}</p>
    <p>Host: {invite.hostName}</p>
    <p>Date: {invite.date}</p>
    <p>Cost: {invite.cost}</p>
    <div>
      <button 
        ><a href={`/invites/${invite.id}`}>Edit</a></button
      >
    </div>
  </div>
{/each}
