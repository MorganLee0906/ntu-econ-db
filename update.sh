#!/usr/bin/env bash
set -euo pipefail

# --- Config & Paths ---
ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
SRC_DIR="$ROOT_DIR/src"
OUT_DIR="$ROOT_DIR/out"
TARGET_DIR="$ROOT_DIR/../ntu-econ.github.io"

# 支援 --dry-run 預覽模式（不實際寫入）
DRYRUN=0
if [[ "${1:-}" == "--dry-run" ]]; then
  DRYRUN=1
fi

# --- Helpers ---
step() { echo -e "\n\033[1;34m==> $1\033[0m"; }
need_cmd() { command -v "$1" >/dev/null 2>&1 || { echo "❌ 缺少指令：$1"; exit 1; }; }

# --- Checks ---
need_cmd python3
need_cmd npm
need_cmd rsync
need_cmd git

[[ -d "$SRC_DIR" ]] || { echo "❌ 找不到資料夾：$SRC_DIR"; exit 1; }
[[ -d "$TARGET_DIR" ]] || { echo "❌ 找不到目標資料夾：$TARGET_DIR"; exit 1; }

# --- Decide rsync flags based on version capability ---
RSYNC_FLAGS="-a --partial --stats"
# 舊版/新版皆有的進度選項：--progress
PROGRESS_FLAG="--progress"

# 嘗試使用新版整體進度（若支援）
if rsync --help 2>&1 | grep -q -- '--info='; then
  PROGRESS_FLAG="--info=progress2"
fi

# Dry-run?
if [[ $DRYRUN -eq 1 ]]; then
  RSYNC_FLAGS="-n $RSYNC_FLAGS"
fi

# --- Steps ---
step "1/4 產生資料（python3 src/genFolder.py）"
( cd "$SRC_DIR" && python3 genFolder.py )

step "2/4 建置（npm run build）"
( cd "$ROOT_DIR" && npm run build )

step "3/4 同步 out/ → ../ntu-econ.github.io/（顯示進度；不刪目標多餘檔）"
echo "使用 rsync 參數：$RSYNC_FLAGS $PROGRESS_FLAG"
# 注意尾端斜線：同步內容，而非包一層 out/
rsync $RSYNC_FLAGS $PROGRESS_FLAG "$OUT_DIR"/ "$TARGET_DIR"/

step "4/4 Git 提交與推送（顯示進度）"
pushd "$TARGET_DIR" >/dev/null
git add -A
git commit -m "Upload files" || echo "（沒有需要提交的變更）"
git push --progress
popd >/dev/null

step "完成 ✅"