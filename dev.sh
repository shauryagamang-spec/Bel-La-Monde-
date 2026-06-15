#!/bin/sh
# Start the Bel-la Monde dev server locally.
# Uses the conda Node (no system Node) + webpack (Turbopack crashes on the shim).
# Then open the http://localhost URL it prints.
export PATH="/opt/anaconda3/envs/bbliving-node/bin:$PATH"
cd "/Users/shauryagamang/Studio Bir/bel-la-monde" || exit 1
exec node node_modules/next/dist/bin/next dev --webpack --hostname 127.0.0.1 --port 8090
