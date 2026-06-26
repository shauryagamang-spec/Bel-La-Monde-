#!/bin/zsh
# Double-click this in Finder to run the Bel-la Mondè site locally.
# It opens Terminal, starts the dev server, and stays live until you close the
# window (or press Ctrl-C). Uses the conda Node + webpack (Turbopack crashes on
# the Node shim on this Mac).
export PATH="/opt/anaconda3/envs/bbliving-node/bin:$PATH"
# Native fs-events are unreliable on this Node/Mac — after a while the watcher
# silently dies and hot-reload stops (the site stops showing your edits). Polling
# keeps file-watching (HMR) working for the whole session.
export WATCHPACK_POLLING=true
export CHOKIDAR_USEPOLLING=true
cd "$(dirname "$0")"
clear
echo "▲  Bel-la Mondè — starting the site…"
echo "    When it says 'Ready', open:  http://localhost:8090"
echo "    Keep this window open while you work. Close it (or Ctrl-C) to stop."
echo
exec node node_modules/next/dist/bin/next dev --webpack --hostname 127.0.0.1 --port 8090
