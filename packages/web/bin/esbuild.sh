set -eu

WEB_DIR="$(dirname $( cd "$(dirname "$0")" >/dev/null 2>&1 ; pwd -P ))"

function main() {
  local esbuild_cli
  esbuild_cli=$(yarn bin esbuild-cli)
  "${esbuild_cli}" build --config "${WEB_DIR}/conf/esbuild/prod.ts"
}

main "$@"