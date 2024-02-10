<script>
  import { writable } from "svelte/store";
  import { onMount } from "svelte";
  import supabase from "$lib/supabase";

  export let data;

  const inviteToUpdate = writable({
    dishName: "",
    hostName: "",
    date: "",
    cost: 0,
  });

  let inviteId = data.slug;

  const updateInvite = async () => {
    const { data, error } = await supabase
      .from("invites")
      .update({
        dishName: $inviteToUpdate.dishName,
        hostName: $inviteToUpdate.hostName,
        date: $inviteToUpdate.date,
        cost: $inviteToUpdate.cost,
      })
      .eq("id", inviteId);

    if (error) {
      console.error("Error updating invite:", error.message);
    } else {
      console.log("Invite updated successfully:", data);
    }
  };

  onMount(async () => {
    const { data, error } = await supabase
      .from("invites")
      .select("*")
      .eq("id", inviteId);

    if (error) {
      console.error("Error fetching invite:", error.message);
    } else {
      inviteToUpdate.set(data[0]);
    }
  });

  const handleSubmit = async (event) => {
    event.preventDefault();
    await updateInvite();
  };

  const handleDelete = async (inviteId) => {
    try {
      const { error } = await supabase.from('invites').delete().eq('id', inviteId).single();

      if (error) {
        throw error;
      }

      console.log('Invite deleted successfully');
    } catch (error) {
      console.error('Error deleting invite:', error.message);
    }
  };
</script>

<main>
    <form on:submit|preventDefault={handleSubmit}>
      <input type="text" bind:value={$inviteToUpdate.dishName} />
      <input type="text" bind:value={$inviteToUpdate.hostName} />
      <input type="text" bind:value={$inviteToUpdate.date} />
      <input type="text" bind:value={$inviteToUpdate.cost} />
      <button type="submit">Update Invite</button>
      <button type="button" on:click={() => handleDelete} class="mx-2 bg-red-700 py-2 px-4 rounded">Delete</button>
    </form>
</main>