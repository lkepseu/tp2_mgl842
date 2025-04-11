// This file is used to configure Lighthouse CI
module.exports = {
  ci: {
    collect: {
      startServerCommand: "npm run dev",
      url: ["http://localhost:3000"],
      numberOfRuns: 1
    },
    assert: {
      assertions: {
        "categories:performance": ["error", { minScore: 0.4 }],
        "categories:accessibility": ["warn", { minScore: 0.4 }]
      }
    },
    upload: {
      target: "temporary-public-storage"
    }
  }
};
