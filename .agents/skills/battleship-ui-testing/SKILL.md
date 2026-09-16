---
name: battleship-ui-testing
description: Run local Battleship UI tests with real shots, placement, Auto Play, and emoji evidence.
---

# Local setup
- This repository is a static site: run `python3 -m http.server 8080` from the repo root, then open `http://localhost:8080/`.
- No dependency build, backend, or login is required.
- Emoji assertions require an emoji font. Check `fc-match emoji`; if it resolves to a non-emoji font and glyphs render as boxes, install Noto Color Emoji in the user font directory, run `fc-cache -f`, and restart Chrome. Reload alone may retain cached fallback glyphs.
- Maximize Chrome before recording; browser zoom can help fit both boards.

# Triggering game states
- Start Battle uses the selected Random or Manual Placement radio.
- Manual placement advances after each valid ship placement and starts the game after five ships. To keep horizontal ships separate, use A1, C1, E1, G1, I1 (letters are rows, numbers are columns).
- AI responds about 1.5 seconds after each player shot. Wait for the player's turn before clicking again.
- Auto Play uses real turn logic and can complete a game in a few minutes. Stop Auto pauses it; wait for any in-flight AI response before making stable assertions.
- `game` is accessible in the browser's JavaScript global lexical scope. Read-only inspection of `game.enemyShips` can identify positions for targeted UI clicks; do not mutate boards or invoke internal shot methods as a substitute for actual gameplay.
- Check skull pixels on both boards, class/state persistence after subsequent turns, and status rows after sinking. Repeat-click tests should compare turn, shot counts, hit counts, and log entries.
- The Battle Log records all shots, allowing duplicate-coordinate checks separately for each side.

## Endgame effects and audio
- Use actual final shots for exactly-once endgame-audio checks; direct overlay calls alone miss duplicate calls in win/loss check sites. If an accelerated/shortened fleet is explicitly authorized, label that setup separately from a natural full game.
- Audio can be verified without listening by forwarding and counting SoundManager calls plus AudioBufferSourceNode/OscillatorNode starts. Melody notes may be scheduled through timeouts, so allow asynchronous sources to start before comparing counts.
- Check Continue and Reset leave the overlay hidden, its effects container empty, and the fireworks interval null after multiple burst periods. Reset may be covered by the overlay; label any programmatic Reset click.
- For reduced-motion emulation over CDP, keep the WebSocket connection open for the entire test. The override can disappear on disconnect. Verify matchMedia reports true before asserting computed animation styles, and restore no-preference afterward.
- Disabled CSS animations may prevent animationend cleanup. Measure particle counts over multiple burst periods rather than checking animation-name alone.
- Optional CDP fallback uses Python requests and websocket-client if the browser-console helper is unavailable.

## Devin Secrets Needed
None.
