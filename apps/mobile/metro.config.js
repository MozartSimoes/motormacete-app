const { getDefaultConfig } = require('expo/metro-config');
const path = require('path');

const projectRoot = __dirname;
const workspaceRoot = path.resolve(projectRoot, '../..');

const config = getDefaultConfig(projectRoot);

config.watchFolders = [workspaceRoot];

config.resolver.nodeModulesPaths = [
  path.resolve(projectRoot, 'node_modules'),
  path.resolve(workspaceRoot, 'node_modules'),
];

config.resolver.unstable_enableSymlinks = true;

// Exclude Android build output dirs inside node_modules (they may not exist
// and cause Metro's file watcher to crash).
config.resolver.blockList = [
  /node_modules\/.*\/android\/build\/.*/,
  /node_modules\/.*\/android\/.cxx\/.*/,
];

// Expo's getDefaultConfig sets unstable_serverRoot = workspaceRoot internally.
// Override it back to projectRoot so the release bundler (expo export:embed)
// resolves --entry-file index.js from apps/mobile, not from D:\MotorMacete.
//
// For the dev server, Expo's rewriteRequestUrl rewrites the virtual entry URL
// /.expo/.virtual-metro-entry.bundle to /apps/mobile/index.bundle (relative to
// workspaceRoot). Since serverRoot = projectRoot now, we strip the apps/mobile/
// prefix so Metro resolves /index.bundle from projectRoot correctly.
const projectRelativeToWorkspace = path.relative(workspaceRoot, projectRoot).replace(/\\/g, '/');
const originalRewrite = config.server?.rewriteRequestUrl;
config.server = {
  ...config.server,
  unstable_serverRoot: projectRoot,
  rewriteRequestUrl: (url) => {
    const rewritten = typeof originalRewrite === 'function' ? originalRewrite(url) : url;
    const prefix = '/' + projectRelativeToWorkspace + '/';
    if (typeof rewritten === 'string' && rewritten.startsWith(prefix)) {
      return '/' + rewritten.slice(prefix.length);
    }
    return rewritten;
  },
};

module.exports = config;
