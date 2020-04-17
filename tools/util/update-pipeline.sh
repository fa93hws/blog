set -eu

REPO_ROOT=$(git rev-parse --show-toplevel)

source "${REPO_ROOT}/tools/util/_logging.sh"

# run npm pipeline:update
main() {
  while [[ $# -gt 0 ]]
  do
    local target="$1"
    shift
    if [[ ! -d "${REPO_ROOT}/${target}" ]];then
      error "folder ${target} does not exists in ${REPO_ROOT}"
    fi
    pushd "${REPO_ROOT}/${target}" >/dev/null
    if [[ ! -f package.json ]];then
      error "package.json doesnot exists in ${target}"
    fi
    log_info "Updating pipelines for ${target}"
    npm --slient run pipeline:update
    popd >/dev/null
  done
}

main "$@"