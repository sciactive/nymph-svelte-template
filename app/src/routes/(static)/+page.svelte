{#if $loading || $user}
  <div
    style="display: flex; flex-direction: column; justify-content: center; align-items: center; padding: 40px 0;"
  >
    <CircularProgress indeterminate style="height: 80px; width: 80px;" />
    Loading...
  </div>
{:else}
  <div class="intro-container" style="min-width: 320px;">
    <h1>Nymph + SMUI + SvelteKit</h1>
    <p>
      This template will help you design and build an awesome app using these
      three technologies. It's based on the app design of <a
        href="https://port87.com/"
        target="_blank"
        rel="noopener noreferrer">the Port87 Mail app</a
      >.
    </p>
  </div>

  <div class="bg-container">
    <div class="index-container">
      <section style="flex-grow: 0;">
        <Paper variant="unelevated">
          <Title style="min-width: max-content;">
            {#if loginMode === 'login'}
              Log in
            {:else}
              Sign up
            {/if}
          </Title>
          <Content>
            <Login {User} clientConfig={$clientConfig} bind:mode={loginMode} />
          </Content>
        </Paper>
      </section>

      <section class="big-points-container" style="min-width: 320px;">
        <h2>Nymph.js</h2>
        <p>
          <a href="https://nymph.io/" target="_blank" rel="noopener noreferrer"
            >Nymph</a
          > is an object relational mapper for Node.js and the browser. It has a
          very powerful query system, and it lets you rapidly prototype and iterate
          your data objects.
        </p>

        <h2>Svelte Material UI</h2>
        <p>
          <a
            href="https://sveltematerialui.com/"
            target="_blank"
            rel="noopener noreferrer">SMUI</a
          > is the most popular UI library for Svelte apps. It implements Google's
          Material UI spec. It uses Sass for styling, so it is very customizable.
        </p>

        <h2>SvelteKit</h2>
        <p>
          <a
            href="https://kit.svelte.dev/"
            target="_blank"
            rel="noopener noreferrer">SvelteKit</a
          > is a very powerful and flexible app development kit powered by Svelte.
          It provides server side rendering, and it integrates well with both Nymph
          and SMUI.
        </p>
      </section>
    </div>
  </div>
{/if}

<script lang="ts">
  import { Login } from '@nymphjs/tilmeld-components';
  import Paper, { Title, Content } from '@smui/paper';
  import CircularProgress from '@smui/circular-progress';
  import type { SessionStuff } from '$lib/nymph';
  import { goto } from '$app/navigation';
  import type { PageData } from './$types';

  export let data: PageData;
  let { User, stores } = data as SessionStuff;
  $: ({ User, stores } = data as SessionStuff);
  let { loading, user, clientConfig } = stores;
  $: ({ loading, user, clientConfig } = stores);

  let loginMode: 'login' | 'register' = 'login';

  $: if ($user != null) {
    goto(`/todos/search/${encodeURIComponent(`[!done]`)}`);
  }
</script>
