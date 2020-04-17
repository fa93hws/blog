set -eu

REPO_ROOT=$(git rev-parse --show-toplevel)

source "${REPO_ROOT}/tools/util/_logging.sh"

# Args:
# $1: absolute package path. e.g. /.../tools/eslint/config
# return: "${old_version};${new_version}"
update() {
  local path="$1"
  local package_json="${path}/package.json"
  if [[ ! -f "${package_json}" ]];then
    error "package.json does not exists in ${path}"
  fi

  local old_version
  old_version=$(jq -r ".version" "${package_json}")
  local new_version
  new_version=$(echo "${old_version}" | awk -F'[ .]' '{print $1"."$2"."$3+1}')
  local content=$(jq ".version = \"${new_version}\"" "${package_json}")
  echo "${content}" > "${package_json}"
  echo "${old_version};${new_version}"
}

# Args:
# $1: absolute package path. e.g. /.../tools/eslint/config
# $2: old_version
# $3: new_version
# return: generated tgz file
pack() {
  local path="$1"
  local old_version="$2"
  local new_version="$3"
  local package_name

  pushd "${path}" >/dev/null
  package_name=$(jq -r ".name" package.json)
  package_name="${package_name/@/}"
  package_name="${package_name/\//-}"
  rm -rf "${package_name}-${old_version}.tgz"
  npm --silent pack
  popd >/dev/null
}

# Args:
# $1: tgz_file: absolute path to tgz_file
# $@: cosumer: absolute path to consumer e.g. /../web
install() {
  local tgz_file="$1"
  shift
  while [[ $# -gt 0 ]]
  do
    local consumer="$1"
    shift
    pushd "${REPO_ROOT}/${consumer}" >/dev/null
    log_info "installing for ${consumer}"
    npm --slient install --save-dev "${tgz_file}"
    popd >/dev/null
  done
}

# update, pack and install internal packages
# Args:
# $1: package path. e.g. tools/eslint/config
main() {
  local path="${REPO_ROOT}/$1"
  local versions
  versions=$(update "${path}")
  local old_version
  old_version=$(echo "${versions}" | cut -d';' -f1)
  local new_version
  new_version=$(echo "${versions}" | cut -d';' -f2)
  log_info "update ${path} from ${old_version} to ${new_version}"

  local tgz_file
  tgz_file=$(pack "${path}" "${old_version}" "${new_version}")
  log_info "package for ${path} generated: ${tgz_file}"

  install "${path}/${tgz_file}" web backends
}

main "$@"
