# Deploy the Project in GitHub

## Using a New Branch in the Main PROJECTS Repository

### Step 1: Update the Main GitHub Repository

Ensure your repository is fully up to date by running the following commands:

1. `git init`
2. `git add .`
3. `git status`
4. `git commit -m "Changes"`
5. `git push`

---

### Step 2: Create a New Branch for a Specific Sub-Project and Deploy It

To deploy an individual sub-project stored inside your main repository, create a dedicated branch using `git subtree`. This approach allows deployment without moving files out of their folder.

Below is an example for deploying the **FOOD4U** project:

#### Commands for Deployment (Live Project)

1. `git subtree split --prefix=FOOD4U -b food4u-pages`
2. `git push origin food4u-pages`

This will generate a branch containing only the contents of the `FOOD4U` folder and push it to GitHub, enabling you to configure GitHub Pages for deployment.

---
