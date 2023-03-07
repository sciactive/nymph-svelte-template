<script lang="ts">
  import { onMount } from 'svelte';
  import { goto } from '$app/navigation';

  onMount(() => {
    goto(`/todos/search/${encodeURIComponent(`[!done]`)}`);
  });
</script>
