#!/usr/bin/env python3
import json

with open('tools.json', 'r') as f:
    data = json.load(f)

new_tools = [
    {"id": "tool-247", "slug": "portainer", "name": "Portainer", "description": "Lightweight management UI for Docker and Kubernetes.", "sourceUrl": "https://github.com/portainer/portainer", "sourceType": "github", "verified": True, "license": "Zlib", "stars": 31000, "category": "Development", "categories": ["Development", "DevOps", "Containers", "UI"], "platforms": ["linux", "self-hosted"], "score": 89},
    {"id": "tool-248", "slug": "lazydocker", "name": "Lazydocker", "description": "Simple terminal UI for Docker and Docker Compose.", "sourceUrl": "https://github.com/jesseduffield/lazydocker", "sourceType": "github", "verified": True, "license": "MIT", "stars": 38000, "category": "Development", "categories": ["Development", "DevOps", "Containers", "CLI"], "platforms": ["windows", "macos", "linux"], "score": 88},
    {"id": "tool-249", "slug": "ctop", "name": "ctop", "description": "Top-like interface for container metrics.", "sourceUrl": "https://github.com/bcicen/ctop", "sourceType": "github", "verified": True, "license": "MIT", "stars": 15000, "category": "Development", "categories": ["Development", "DevOps", "Containers", "Monitoring"], "platforms": ["linux", "macos"], "score": 86},
    {"id": "tool-250", "slug": "dive", "name": "Dive", "description": "Tool for exploring each layer in a Docker image.", "sourceUrl": "https://github.com/wagoodman/dive", "sourceType": "github", "verified": True, "license": "MIT", "stars": 47000, "category": "Development", "categories": ["Development", "DevOps", "Containers", "Analysis"], "platforms": ["windows", "macos", "linux"], "score": 90}
]

data['tools'].extend(new_tools)
data['metadata']['totalTools'] = len(data['tools'])
data['metadata']['generatedAt'] = '2026-04-20T03:30:00Z'

with open('tools.json', 'w') as f:
    json.dump(data, f, indent=2)

print(f"Added {len(new_tools)} tools. Total: {len(data['tools'])}")
