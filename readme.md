# Deploy the Project in GitHub

## Step 1: Update the Main GitHub Repository

### Run the following commands to ensure your repository is fully updated:

** bash **

- git init
- git add .
- git status
- git commit -m "Changes"
- git push

---

Deploy Projects Using Workflow

In the main PROJECTS repository:

A .github/workflows directory is created.

Inside it, the deploy-all.yml file deploys all project folders to GitHub Pages.

An index.html file is added to act as a cover page and confirm deployment.

'''
Repository Structure
PROJECTS/
├── index.html
└── .github/
└── workflows/
└── deploy-all.yml
'''

## Workflow File

** File Location **

** PROJECTS/.github/workflows/deploy-all.yml **

```
name: Deploy All Projects

on:
  workflow_dispatch:
  push:
    branches:
      - main

permissions:
  pages: write
  id-token: write
  contents: read

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout repository
        uses: actions/checkout@v3

      # Upload the entire repo so all folders are deployed
      - name: Upload Pages Artifact
        uses: actions/upload-pages-artifact@v3
        with:
          path: ./

  deploy:
    needs: build
    runs-on: ubuntu-latest
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    steps:
      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v4


## Index File
File Location

** PROJECTS/index.html **

```

<!DOCTYPE html>
<html>
<head>
    <title>Projects Index</title>
</head>
<body>
    <h1>Welcome to My Projects</h1>
    <p>Select a project folder to view its live version.</p>
</body>
</html>
```

## URLS for All Projects stored in PROJECTS Repository

## Project URLs

** Below are the live URLs for all projects stored inside the main PROJECTS repository. **

## Main Directory

- Main Link - https://akshay8281.github.io/PROJECTS/
- FOOD4U - https://akshay8281.github.io/PROJECTS/FOOD4U/
- FoodMart - https://akshay8281.github.io/PROJECTS/FoodMart/
- Guess_Game_JS - https://akshay8281.github.io/PROJECTS/Guess_Game_JS/
- JS_Assessment_toDoList - https://akshay8281.github.io/PROJECTS/JS_Assessment_toDoList/
- Myntra - https://akshay8281.github.io/PROJECTS/Myntra/
- Restaurant - https://akshay8281.github.io/PROJECTS/Restaurant/
- Starbucks - https://akshay8281.github.io/PROJECTS/Starbucks/
- Tic_Tac_Toe_Game_JS - https://akshay8281.github.io/PROJECTS/Tic_Tac_Toe_Game_JS/
- UsabilityHub - https://akshay8281.github.io/PROJECTS/UsabilityHub/
- Zomato_Clone_HTML - https://akshay8281.github.io/PROJECTS/Zomato_Clone_HTML/
