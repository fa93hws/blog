#!/usr/bin/env bash
set -eu -o pipefail

main() {
  local pbjs
  pbjs=$(yarn bin pbjs)
  local pbts
  pbts=$(yarn bin pbts)

  local files
  readarray -t files <<< $(find . -name '*.proto')
  "${pbjs}" -t static-module -w commonjs -o index.js "${files[@]}"
  "${pbts}" -o index.d.ts index.js
}

main "$@"
