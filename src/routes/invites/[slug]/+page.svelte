<script>
  import { writable } from "svelte/store";
  import { onMount } from "svelte";
  import { goto } from "$app/navigation";
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
    try {
      await updateInvite();
      setTimeout(() => {
        goto("/invites");
      }, 1000);
    } catch (error) {
      console.error("Error updating invite:", error.message);
    }
  };

  const handleDelete = async (inviteId) => {
    try {
      const { error } = await supabase
        .from("invites")
        .delete()
        .eq("id", inviteId)
        .single();

      if (error) {
        throw error;
      }

      console.log("Invite deleted successfully");
    } catch (error) {
      console.error("Error deleting invite:", error.message);
    }
  };
</script>

<main>
  <button class="bg-green-700 py-2 px-4 rounded m-4"><a href="/invites">Return</a></button>
  <h1 class="flex justify-center font-bold text-2xl">Edit invite</h1>
  <div class="flex flex-col m-4">
    <form on:submit|preventDefault={handleSubmit}>
      <div class="flex flex-col m-4">
          <label for="name">Name:</label>
          <input type="text" bind:value={$inviteToUpdate.dishName} />
        </div>
        <div class="flex flex-col m-4">
          <label for="host">Host:</label>
          <input type="text" bind:value={$inviteToUpdate.hostName} />
        </div>
        <div class="flex flex-col m-4">
          <label for="date">Date:</label>
          <input type="date" bind:value={$inviteToUpdate.date} />
        </div>
        
        <div class="flex flex-col m-4">
          <label for="cost">Cost:</label>
          <input type="number" bind:value={$inviteToUpdate.cost} />
        </div>
      <div class="flex justify-center">
        <button type="submit" class="bg-blue-700 py-2 px-4 rounded">Update</button>
        <button type="button" on:click={() => handleDelete(inviteId)} class="mx-2 bg-red-700 py-2 px-4 rounded">Delete</button>
      </div>
    </form>
  </div>
</main>
