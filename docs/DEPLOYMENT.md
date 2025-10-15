# GitHub Pages Deployment Guide

This project is configured to deploy automatically to GitHub Pages using GitHub Actions.

## Testing Deployment (Current Configuration)

The project is currently configured to deploy to **dvdmgr.github.io/magr.in** for testing.

### Initial Setup

1. **Push your code to GitHub**:

   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/dvdmgr/magr.in.git
   git push -u origin main
   ```

2. **Enable GitHub Pages in your repository**:
   - Go to your repository on GitHub: https://github.com/dvdmgr/magr.in
   - Navigate to **Settings** → **Pages**
   - Under **Source**, select **GitHub Actions**

3. **Configure custom domain for magr.in**:

   **a. DNS Configuration**

   You need to configure DNS records with your domain registrar:

   **For the apex domain (magr.in):**

   Add these A records:

   ```
   Type: A
   Name: @
   Value: 185.199.108.153

   Type: A
   Name: @
   Value: 185.199.109.153

   Type: A
   Name: @
   Value: 185.199.110.153

   Type: A
   Name: @
   Value: 185.199.111.153
   ```

   **For the www subdomain (optional but recommended):**

   ```
   Type: CNAME
   Name: www
   Value: YOUR_USERNAME.github.io
   ```

   **b. GitHub Pages Configuration**
   - Go to your repository on GitHub
   - Navigate to **Settings** → **Pages**
   - Under **Custom domain**, enter: `magr.in`
   - Click **Save**
   - Wait for DNS check to complete (can take a few minutes to 24 hours)
   - Once verified, check **Enforce HTTPS** (recommended)

   **Note:** The `static/CNAME` file in this repo ensures your custom domain persists across deployments.
   Wait for deployment\*\*:
   - The GitHub Action will run automatically on push to `main`
   - Check the **Actions** tab to see deployment progress
   - Once complete, your site will be live at: **https://dvdmgr.github.io/magr.in**

## Switching to Custom Domain (magr.in)

Once you've tested the deployment and everything works, you can switch to your custom domain.

### Step 1: Update Configuration

1. **Update `svelte.config.js`**:

   Change this line:

   ```javascript
   base: process.env.NODE_ENV === 'production' ? '/magr.in' : '';
   ```

   To:

   ```javascript
   base: process.env.NODE_ENV === 'production' ? '' : '';
   ```

2. **Create CNAME file**:

   Create `static/CNAME` with content:

   ```
   magr.in
   ```

### Step 2: DNS Configuration

Configure DNS records with your domain registrar:

**For the apex domain (magr.in):**

Add these A records:

```
Type: A
Name: @
Value: 185.199.108.153

Type: A
Name: @
Value: 185.199.109.153

Type: A
Name: @
Value: 185.199.110.153

Type: A
Name: @
Value: 185.199.111.153
```

**For the www subdomain (optional but recommended):**

```
Type: CNAME
Name: www
Value: dvdmgr.github.io
```

### Step 3: GitHub Pages Configuration

- Go to your repository on GitHub
- Navigate to **Settings** → **Pages**
- Under **Custom domain**, enter: `magr.in`
- Click **Save**
- Wait for DNS check to complete (can take a few minutes to 24 hours)
- Once verified, check **Enforce HTTPS** (recommended)

### Step 4: Rebuild and Deploy

```bash
git add .
git commit -m "Switch to custom domain"
git push
```

Your site will now be available at **https://magr.in**

## Manual Deployment

To manually trigger a deployment:

1. Go to **Actions** tab in GitHub
2. Select **Deploy to GitHub Pages** workflow
3. Click **Run workflow** → **Run workflow**

## Local Testing

Test the production build locally:

```bash
# Test with subdirectory path (current config)
NODE_ENV=production npm run build
npm run preview

# Test with root path (custom domain)
# After updating svelte.config.js to use base: ''
npm run build
npm run preview
```

## Troubleshooting

- **404 errors**: Make sure GitHub Pages source is set to "GitHub Actions"
- **Assets not loading**: Check the `base` path in `svelte.config.js`
- **Build fails**: Check the Actions tab for error logs
- **Custom domain not working**: Verify DNS settings and wait for propagation (up to 24 hours)
- **Site not updating**: Clear browser cache or try incognito mode
