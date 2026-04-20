// Load tools from external JSON file
const toolsData = [];

fetch('data/tools.json')
    .then(response => response.json())
    .then(data => {
        // Handle different data structures
        if (Array.isArray(data)) {
            toolsData.push(...data);
        } else if (data.tools) {
            toolsData.push(...data.tools);
        } else if (data.indexes && data.indexes.byCategory) {
            // Extract from category indexes
            Object.values(data.indexes.byCategory).flat().forEach(toolId => {
                const tool = data.tools.find(t => t.id === toolId);
                if (tool) toolsData.push(tool);
            });
        }
        
        // Initialize with all 500 tools
        renderTools(toolsData);
        setupSearch();
    })
    .catch(err => {
        console.error('Error loading tools:', err);
        // Use embedded fallback data
        const fallbackTools = [
            {
                "id": "ublock-origin",
                "name": "uBlock Origin",
                "description": "Efficient ad blocker with minimal CPU/memory footprint. Blocks ads, trackers, and malware sites.",
                "category": "Privacy",
                "platforms": ["Web"],
                "score": 98,
                "icon": "fa-shield-alt",
                "sourceUrl": "https://github.com/gorhill/uBlock",
                "website": "https://ublockorigin.com",
                "details": {
                    "benefits": ["Uses 50% less memory than competitors", "No acceptable ads program", "Open source and community-driven", "Highly customizable filter lists"],
                    "useCases": ["Browsing without ads", "Privacy protection", "Malware prevention", "Bandwidth saving"]
                }
            }
            // Add more fallback tools as needed
        ];
        toolsData.push(...fallbackTools);
        renderTools(toolsData);
        setupSearch();
    });