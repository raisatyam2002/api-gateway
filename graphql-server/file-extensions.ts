import replace from "replace-in-file";

const options = {
  // Target all JavaScript files in the dist directory
  files: "dist/**/*.js",

  from: [
    /(?<!\.js)(from\s+['"]\.\/.*?)(['"])/g, // Match "from './someFile'"
    /(?<!\.js)(import\s+['"]\.\/.*?)(['"])/g, // Match "import './someFile'"
  ],

  // Add `.js` to the matched import/export paths
  to: [
    "$1.js$2", // Replace "from './someFile'" with "from './someFile.js'"
    "$1.js$2", // Replace "import './someFile'" with "import './someFile.js'"
  ],
};

(async () => {
  try {
    const results = await replace(options);
    console.log("Updated file extensions in the following files:");
    results.filter((r) => r.hasChanged).forEach((r) => console.log(r.file));
  } catch (error) {
    console.error("Error updating file extensions:", error);
  }
})();
