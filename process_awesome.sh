#!/bin/bash
TARGET_FILE="/home/faizal/.openclaw/workspace/vault/Projects/OpenToolkit/awesome_targets.txt"
TMP_FILE="/home/faizal/.openclaw/workspace/vault/Projects/OpenToolkit/Sultan-Awesome-100.tmp"
FINAL_FILE="/home/faizal/.openclaw/workspace/vault/Projects/OpenToolkit/Sultan-Awesome-100.json"

# Clear temp file
> "$TMP_FILE"

# Use a standard while loop with input redirection from the file
while read -r repo; do
  if [ -z "$repo" ]; then continue; fi
  echo "Processing $repo..."
  
  # Try main, then master
  CONTENT=$(curl -s "https://raw.githubusercontent.com/$repo/main/README.md")
  if [ -z "$CONTENT" ]; then
    CONTENT=$(curl -s "https://raw.githubusercontent.com/$repo/master/README.md")
  fi
  
  # Extract GitHub links
  echo "$CONTENT" | grep -Eo 'https://github\.com/[^ )\]"'\'' ]+' | grep -vE 'wiki|issues|pull|readme' | head -25 | while read -r link; do
    # Extract owner/repo from URL
    repo_path=$(echo "$link" | grep -oE 'github\.com/[^/]+/[^/]+' | sed 's/github\.com\///')
    
    if [ -n "$repo_path" ]; then
      # Fetch metadata via API and filter for open-source licenses
      curl -s "https://api.github.com/repos/$repo_path" | \
      jq -c "select(.license != null and (.license.spdx_id | contains(\"MIT\") or contains(\"GPL\") or contains(\"AGPL\") or contains(\"Apache\") or contains(\"ISC\"))) | {name: .name, description: .description, source: .html_url, license: .license.spdx_id, stars: .stargazers_count, last_updated: .updated_at}" >> "$TMP_FILE"
    fi
  done
done << "$ "$TARGET_FILE"

# Convert the stream of JSON objects into a proper JSON array
jq -s '.' "$TMP_FILE" > "$FINAL_FILE"
rm "$TMP_FILE"
echo "✅ Sultan: Awesome Lists scrape complete"
