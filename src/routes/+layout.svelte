<script>
	import "../app.css";
	import { page } from "$app/stores"
</script>

<div class="flex-1 flex flex-col overflow-hidden">
  <header>
    <div class="signedInStatus">
      <p class="nojs-show loaded">
        {#if $page.data.session}
          {#if $page.data.session.user?.image}
            <span
              style="background-image: url('{$page.data.session.user.image}')"
              class="avatar"
            />
          {/if}
          <span class="signedInText">
            <small>Signed in as</small><br />
            <strong
              >{$page.data.session.user?.email ??
                $page.data.session.user?.name}</strong>
          </span>
          <a
            href="/auth/signout"
            class="button"
            data-sveltekit-preload-data="off">Sign out</a
          >
        {:else}
          <span class="notSignedInText">You are not signed in</span>
          <a
            href="/auth/signin"
            class="buttonPrimary"
            data-sveltekit-preload-data="off">Sign in</a
          >
        {/if}
      </p>
    </div>
    <!--
    <nav>
      <ul class="navItems">
        <li class="navItem"><a href="/">Home</a></li>
        <li class="navItem"><a href="/protected">Protected</a></li>
      </ul>
    </nav>
    -->
    <br/>
  </header>

  <div class="flex h-full">
    <slot />
  </div>
</div>

<style>
  :global(body) {
    font-family:
      ui-sans-serif,
      system-ui,
      -apple-system,
      BlinkMacSystemFont,
      "Segoe UI",
      Roboto,
      "Helvetica Neue",
      Arial,
      "Noto Sans",
      sans-serif,
      "Apple Color Emoji",
      "Segoe UI Emoji",
      "Segoe UI Symbol",
      "Noto Color Emoji";
    padding: 0 1rem 1rem 1rem;
    max-width: 1000px;
    margin: 0 auto;
    background: #fff;
    color: #333;
  }
  :global(li),
  :global(p) {
    line-height: 1.5rem;
    
  }
  :global(a) {
    font-weight: 500;
    color: #ff8800;
  }
  :global(hr) {
    border: 1px solid #ddd;
  }
  :global(iframe) {
    background: #ccc;
    border: 1px solid #ccc;
    height: 10rem;
    width: 100%;
    border-radius: 0.5rem;
    filter: invert(1);
  }

  .nojs-show {
    opacity: 1;
    top: 0;
  }
  .signedInStatus {
    display: block;
    min-height: 4rem;
    width: 100%;
  }
  .loaded {
    position: relative;
    top: 0;
    opacity: 1;
    overflow: hidden;
    border-radius: 0 0 0.6rem 0.6rem;
    padding: 0.6rem 1rem;
    margin: 0;
    background-color: rgba(0, 0, 0, 0.05);
    transition: all 0.2s ease-in;
  }
  .signedInText,
  .notSignedInText {
    position: absolute;
    padding-top: 0.8rem;
    left: 1rem;
    right: 6.5rem;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
    display: inherit;
    z-index: 1;
    line-height: 1.3rem;
  }
  .signedInText {
    padding-top: 0rem;
    left: 4.6rem;
  }
  .avatar {
    border-radius: 2rem;
    float: left;
    height: 2.8rem;
    width: 2.8rem;
    background-color: white;
    background-size: cover;
    background-repeat: no-repeat;
  }
  :global(.button,
  .buttonPrimary) {
    float: right;
    margin-right: -0.4rem;
    font-weight: 500;
    border-radius: 0.3rem;
    cursor: pointer;
    font-size: 1rem;
    line-height: 1.0rem;
    padding: 0.5rem 0.5rem;
    position: relative;
    z-index: 10;
    background-color: transparent;
    color: #555;
  }
  :global(.buttonPrimary) {
    border-width: 1px;
    background-color: #f6f8fa;
    border-color: #d0d7de;
    color: #24292f;
    text-decoration: none;
  }
  :global(.buttonPrimary:hover) {
    background-color: #e2e2e2;
  }
  :global(button:disabled, button[disabled]) {
    cursor:default;
    box-shadow: none;
    background-color: #e2e2e2;
  }
  .navItems {
    margin-bottom: 2rem;
    padding: 0;
    list-style: none;
  }
  .navItem {
    display: inline-block;
    margin-right: 1rem;
  }
</style>

