#!/usr/bin/env bash
set -euo pipefail

ORG="YOUR_ORG"
REPO="knackbox"
BRANCH="main"
TARBALL_URL="${KNACKBOX_TARBALL_URL:-https://codeload.github.com/${ORG}/${REPO}/tar.gz/refs/heads/${BRANCH}}"
DOCS_URL="${KNACKBOX_DOCS_URL:-https://knackbox.pages.dev/docs/}"

usage() {
  printf 'Usage: %s <skill-name> [--dest DIR] [--force]\n' "${0##*/}" >&2
}

skill=""
dest=""
force=0

while [ "$#" -gt 0 ]; do
  case "$1" in
    --dest)
      if [ "$#" -lt 2 ]; then
        usage
        exit 2
      fi
      dest="$2"
      shift 2
      ;;
    --force)
      force=1
      shift
      ;;
    --help|-h)
      usage
      exit 0
      ;;
    -*)
      printf 'Unknown option: %s\n' "$1" >&2
      usage
      exit 2
      ;;
    *)
      if [ -n "$skill" ]; then
        printf 'Unexpected argument: %s\n' "$1" >&2
        usage
        exit 2
      fi
      skill="$1"
      shift
      ;;
  esac
done

if [ -z "$skill" ]; then
  usage
  exit 2
fi

if [ -z "$dest" ]; then
  dest="${HOME}/.claude/skills/${skill}"
fi

work="${TMPDIR:-/tmp}/knackbox-install.$$"
archive="${work}/knackbox.tar.gz"
extract="${work}/extract"
cleanup() {
  rm -rf "$work"
}
trap cleanup EXIT INT TERM

mkdir -p "$extract"
curl -fsSL "$TARBALL_URL" -o "$archive"

member=""
available=()
while IFS= read -r entry; do
  case "$entry" in
    */skills/*/"$skill"/SKILL.md)
      member="${entry%/SKILL.md}"
      ;;
    */skills/*/*/SKILL.md)
      skill_dir="${entry%/SKILL.md}"
      available+=("${skill_dir##*/}")
      ;;
  esac
done < <(tar -tzf "$archive")

if [ -z "$member" ]; then
  printf "Unknown skill: %s\n" "$skill" >&2
  if [ "${#available[@]}" -gt 0 ]; then
    printf "Available skills:\n" >&2
    for name in "${available[@]}"; do
      printf "  %s\n" "$name" >&2
    done
  fi
  exit 1
fi

if [ -e "$dest" ] && [ "$force" -ne 1 ]; then
  printf "Refusing to overwrite existing path: %s\n" "$dest" >&2
  printf "Use --force to replace it.\n" >&2
  exit 1
fi

if [ -e "$dest" ]; then
  rm -rf "$dest"
fi

mkdir -p "$(dirname "$dest")"
tar -xzf "$archive" -C "$extract" "$member"
mv "$extract/$member" "$dest"

printf "Installed %s to %s\n" "$skill" "$dest"
printf "Docs: %s\n" "$DOCS_URL"
