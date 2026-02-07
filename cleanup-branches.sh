#!/usr/bin/env bash
# Branch Cleanup Script for Career-Matcher
# Run this manually to delete redundant remote branches.
#
# What this does:
#   1. Deletes claude/review-project-design-TBQDW (exact duplicate of review-dev-plan-ubpu4)
#   2. Deletes claude/career-matcher-foundation-HWrR7 (subset — only the initial commit)
#   3. Deletes claude/review-dev-plan-W9AVA (its unique content was cherry-picked into ubpu4)
#   4. Deletes claude/review-dev-plan-ubpu4 (merged into audit-branch-organization-K2YjW)
#
# After running this, the only branch with all work consolidated is:
#   claude/audit-branch-organization-K2YjW
#
# Safe to run: all unique content has been merged. No work will be lost.

set -euo pipefail

echo "=== Career-Matcher Branch Cleanup ==="
echo ""
echo "This will delete the following remote branches:"
echo "  - claude/review-project-design-TBQDW  (duplicate)"
echo "  - claude/career-matcher-foundation-HWrR7  (subset)"
echo "  - claude/review-dev-plan-W9AVA  (merged)"
echo "  - claude/review-dev-plan-ubpu4  (merged)"
echo ""
read -p "Continue? [y/N] " confirm
if [[ "$confirm" != "y" && "$confirm" != "Y" ]]; then
    echo "Aborted."
    exit 0
fi

echo ""

for branch in \
    claude/review-project-design-TBQDW \
    claude/career-matcher-foundation-HWrR7 \
    claude/review-dev-plan-W9AVA \
    claude/review-dev-plan-ubpu4; do

    echo "Deleting remote branch: $branch"
    if git push origin --delete "$branch" 2>/dev/null; then
        echo "  ✓ Deleted"
    else
        echo "  ✗ Failed (may already be deleted or lack permissions)"
    fi
done

echo ""
echo "Cleaning up local tracking references..."
git fetch --prune

echo ""
echo "Deleting local branches (if they exist)..."
git branch -D claude/review-dev-plan-ubpu4 2>/dev/null && echo "  ✓ Deleted local claude/review-dev-plan-ubpu4" || echo "  (no local branch)"

echo ""
echo "=== Done ==="
echo "Remaining branches:"
git branch -a
