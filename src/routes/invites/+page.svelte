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

<main class="">
  <div class="">
    <h1 class="text-center">Invites</h1>
  </div>

  <div class="">
    <button class=""><a href="/invites/add">Create invite</a></button>
  </div>

  
  {#each $invites as invite}
    <div class="m-4 p-4 border border-gray-300 rounded">
      <p>Name: {invite.dishName}</p>
      <p>Host: {invite.hostName}</p>
      <p>Date: {invite.date}</p>
      <p>Cost: {invite.cost}</p>
      <button class="bg-green-400"><a href={`/invites/${invite.id}`}>Edit</a></button>
    </div>
  {/each}

</main>
