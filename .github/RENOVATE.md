# 🤖 Renovate Bot Configuration

This repository uses Renovate bot for automated dependency management.

## 📋 Configuration

### Schedule
- **When**: Every weekend (Saturday/Sunday)
- **Timezone**: Asia/Jakarta
- **Concurrent PRs**: Maximum 5 at a time
- **Hourly Limit**: 2 PRs per hour

### Package Groups

#### Major Frameworks (Manual Review Required)
- **Next.js**: Grouped updates, requires manual merge
- **React**: Grouped updates, requires manual merge
- **TypeScript**: Includes @types packages, requires manual merge
- **Tailwind CSS**: Includes PostCSS and Autoprefixer, requires manual merge

#### Auto-Merge Rules
- ✅ **Patch updates** (e.g., 1.2.3 → 1.2.4): Auto-merge after CI passes
- ✅ **Dev dependencies** (minor + patch): Auto-merge
- ❌ **Major updates**: Always require manual review
- ❌ **Minor updates** (production): Require manual review

### Security
- 🔒 Security vulnerability alerts are labeled with `security`
- 🔒 Auto-assigned to repository owner
- 🔒 Immediate PR creation for security issues

## 🚀 Setup Instructions

### 1. Enable Renovate GitHub App
1. Go to [Renovate GitHub App](https://github.com/apps/renovate)
2. Click "Configure"
3. Select this repository
4. Grant necessary permissions

### 2. (Optional) Self-Hosted Renovate
If using GitHub Actions workflow:
1. Create a GitHub Personal Access Token (PAT) with `repo` scope
2. Add it as a repository secret named `RENOVATE_TOKEN`
3. Enable GitHub Actions in repository settings

### 3. Configure Auto-Merge (Optional)
To enable auto-merge for patch updates:
1. Go to repository Settings → General
2. Enable "Allow auto-merge"
3. Set branch protection rules if needed

## 📦 What Gets Updated

Current dependencies being monitored:
- `next` - Next.js framework
- `react`, `react-dom` - React library
- `typescript` - TypeScript compiler
- `tailwindcss` - Utility-first CSS framework
- `framer-motion` - Animation library
- `lucide-react` - Icon library
- `@types/*` - TypeScript type definitions

## 🔧 Customization

To modify Renovate behavior, edit `.github/renovate.json`:

```json
{
  "schedule": ["every weekend"],     // Change update schedule
  "automerge": true,                 // Enable/disable auto-merge
  "labels": ["dependencies"],         // PR labels
  "assignees": ["@username"]         // Who gets assigned
}
```

## 📚 Resources

- [Renovate Documentation](https://docs.renovatebot.com/)
- [Configuration Options](https://docs.renovatebot.com/configuration-options/)
- [Preset Configs](https://docs.renovatebot.com/presets-config/)

## 🤝 Contributing

If Renovate creates a PR:
1. ✅ Check the changelog/release notes
2. ✅ Wait for CI checks to pass
3. ✅ Test locally if needed: `npm install && npm run dev`
4. ✅ Merge if everything looks good
5. ❌ Close PR if update causes issues

## ⚠️ Troubleshooting

**Too many PRs?**
- Adjust `prConcurrentLimit` in renovate.json
- Change schedule to less frequent

**Breaking changes?**
- Check the package's CHANGELOG or migration guide
- Test in a separate branch first
- Pin the version if needed

**Want to skip an update?**
- Close the PR
- Renovate will create a new PR when the next version releases

