<script>
  import { writable } from "svelte/store";
  import supabase from "$lib/supabase";

  const inviteForm = writable({
    dishName: "",
    hostName: "",
    date: "",
    cost: 0,
  });

  const handleSubmit = async (event) => {
    event.preventDefault();
    const newInvite = $inviteForm;
    try {
      const { data, error } = await supabase.from("invites").insert([newInvite]);
      if (error) {
        throw error;
      }
      console.log("Invite added successfully:", data);
    } catch (error) {
      console.error("Error adding invite:", error.message);


      if (error.details) {
        console.error("Details:", error.details);
      }
    }
  };
</script>

<main>
  <div class="flex flex-col">
    <h1 class="font-bold text-center text-xl m-6">
      Create an invitation to eat with friends
    </h1>
  </div>
  <div class="flex flex-col m-4">
    <form on:submit|preventDefault={handleSubmit}>
      <div class="flex flex-col m-4">
        <label for="dishName">Name of dish</label>
        <input
          type="text"
          id="dishName"
          bind:value={$inviteForm.dishName}
          required
        />
      </div>
      <div class="flex flex-col m-4">
        <label for="hostName">Name of host</label>
        <input
          type="text"
          id="hostName"
          bind:value={$inviteForm.hostName}
          required
        />
      </div>
      <div class="flex flex-col m-4">
        <label for="date">Date of dinner</label>
        <input
          type="date"
          id="date"
          bind:value={$inviteForm.date}
          required
        />
      </div>
      <div class="flex flex-col m-4">
        <label for="cost">Cost of dinner</label>
        <input
          type="number"
          id="cost"
          bind:value={$inviteForm.cost}
          required
        />
      </div>
      <button
        type="submit"
        class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >Save new invite</button
      >
    </form>
    <div class="flex flex-col content-center">
    </div>
  </div>
</main>