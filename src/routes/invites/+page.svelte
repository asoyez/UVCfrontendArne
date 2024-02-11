<script>
  import { readable } from "svelte/store";
  import supabase from "$lib/supabase";

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

<main>
  <div class="m-4">
    <h1 class="text-center font-bold text-3xl">Invites</h1>
  </div>

  <div class="grid justify-items-end m-4">
    <button class="bg-green-700 py-2 px-4 rounded font-bold"
      ><a href="/invites/add">Create invite</a></button
    >
  </div>

  {#each $invites as invite}
    <div class="m-4 px-4 py-2 border border-gray-300 rounded">
      <p>Name: {invite.dishName}</p>
      <p>Host: {invite.hostName}</p>
      <p>Date: {invite.date}</p>
      <p>Cost: {invite.cost}</p>
      <div class="grid justify-end">
        <button class="bg-blue-600 py-2 px-4 rounded"
          ><a href={`/invites/${invite.id}`}>Edit</a></button
        >
      </div>
    </div>
  {/each}

</main>
