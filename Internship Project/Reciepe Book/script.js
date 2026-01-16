const grid = document.getElementById("recipeGrid");
const formModal = document.getElementById("formModal");
const viewModal = document.getElementById("viewModal");
const viewContent = document.getElementById("viewContent");

const nameInput = document.getElementById("name");
const categoryInput = document.getElementById("category");
const stepsInput = document.getElementById("steps");
const imageInput = document.getElementById("image");
let recipes = [],
  favorites = [],
  ratings = {},
  editingId = null,
  ingredients = [];

/* Load API */
fetch("https://www.themealdb.com/api/json/v1/1/search.php?s=")
  .then((r) => r.json())
  .then((d) => {
    recipes = d.meals.map((m) => ({
      id: m.idMeal,
      name: m.strMeal,
      category: m.strCategory,
      image: m.strMealThumb,
      steps: m.strInstructions.split(". ").join("\n"),
      ingredients: ["Salt", "Oil", "Spices"],
    }));
    populateCategories();
    render();
  });

function populateCategories() {
  const cats = [...new Set(recipes.map((r) => r.category))];

  // Filter dropdown
  categoryFilter.innerHTML = "<option value=''>Select Item</option>";
  cats.forEach((c) => {
    categoryFilter.innerHTML += `<option value="${c}">${c}</option>`;
  });

  // Add/Edit form dropdown
  category.innerHTML = "<option value=''>Select Item</option>";
  cats.forEach((c) => {
    category.innerHTML += `<option value="${c}">${c}</option>`;
  });
}

function render(list = recipes) {
  grid.innerHTML = "";
  list.forEach((r) => {
    grid.innerHTML += `
  <div class="card" onclick="openRecipe('${r.id}')">
   <img src="${r.image}">
   <div class="p-2 text-center">
<h6>${r.name || "Untitled Recipe"}</h6>

    <small>${r.category}</small>
    <div class="card-actions mt-2">
      <button class="btn btn-sm btn-warning" onclick="editRecipe('${
        r.id
      }');event.stopPropagation()">Edit</button>
      <i class="bi bi-heart-fill ${
        favorites.includes(r.id) ? "text-danger" : ""
      }"
       onclick="toggleFav('${r.id}');event.stopPropagation()"></i>
      <button class="btn btn-sm btn-danger" onclick="deleteRecipe('${
        r.id
      }');event.stopPropagation()">Delete</button>
    </div>
   </div>
  </div>`;
  });
}

function openRecipe(id) {
  const r = recipes.find((x) => x.id === id);
  const rate = ratings[id] || 0;
  viewContent.innerHTML = `
 <img src="${r.image}" class="popup-img">
 <div class="popup-content">
  <button class="close-btn" onclick="closeView()">✕</button>
<h3>${r.name || "Untitled Recipe"}</h3>

  <div>${[1, 2, 3, 4, 5]
    .map(
      (i) =>
        `<span class="star ${
          i <= rate ? "active" : ""
        }" onclick="setRating('${id}',${i})">★</span>`
    )
    .join("")}</div>
  <h6>Ingredients</h6>
  <ul>${r.ingredients.map((i) => `<li>${i}</li>`).join("")}</ul>
  <h6>Preparation</h6>
  <p>${r.steps.replace(/\n/g, "<br>")}</p>
<button class="btn btn-success" onclick="exportPDF()">Export PDF</button>
 </div>`;
  viewModal.classList.add("active");
  document.body.classList.add("view-open");
}

function exportPDF() {
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF("p", "mm", "a4");

  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const margin = 20;

  const title = document.querySelector(".popup-content h3").innerText;
  const ingredients = [
    ...document.querySelectorAll(".popup-content ul li"),
  ].map((li) => li.innerText);
  const steps = document.querySelector(".popup-content p").innerText;
  const imgUrl = document.querySelector(".popup-img").src;

  let y = 25;

  /* ===== TITLE (CENTERED) ===== */
  doc.setFont("helvetica", "bold");
  doc.setFontSize(18);

  const titleWidth = doc.getTextWidth(title);
  const titleX = (pageWidth - titleWidth) / 2;

  doc.text(title, titleX, y);
  y += 12;

  /* ===== IMAGE ===== */
  const img = new Image();
  img.crossOrigin = "anonymous";
  img.src = imgUrl;

  img.onload = function () {
    const imgSize = 80; // mm
    const imgX = (pageWidth - imgSize) / 2;
    const imgY = y;
    const radius = 10;

    // IMPORTANT: save state BEFORE clipping
    doc.saveGraphicsState();

    doc.roundedRect(imgX, imgY, imgSize, imgSize, radius, radius);
    doc.clip();
    doc.addImage(img, "JPEG", imgX, imgY, imgSize, imgSize);

    // Restore AFTER image
    doc.restoreGraphicsState();

    y += imgSize + 15;

    /* ===== INGREDIENTS ===== */
    doc.setFont("helvetica", "bold");
    doc.setFontSize(14);
    doc.text("Ingredients", margin, y);
    y += 8;

    doc.setFont("helvetica", "normal");
    doc.setFontSize(11);

    ingredients.forEach((item, index) => {
      if (y > pageHeight - margin) {
        doc.addPage();
        y = margin;
      }
      doc.text(`${index + 1}. ${item}`, margin + 5, y);
      y += 6;
    });

    y += 10;

    /* ===== PREPARATION ===== */
    doc.setFont("helvetica", "bold");
    doc.setFontSize(14);
    doc.text("Preparation", margin, y);
    y += 8;

    doc.setFont("helvetica", "normal");
    doc.setFontSize(11);

    const wrappedText = doc.splitTextToSize(steps, pageWidth - margin * 2);

    wrappedText.forEach((line) => {
      if (y > pageHeight - margin) {
        doc.addPage();
        y = margin;
      }
      doc.text(line, margin, y);
      y += 6;
    });

    /* ===== SAVE ===== */
    doc.save(title.replace(/\s+/g, "_") + ".pdf");
  };

  img.onerror = function () {
    alert("Image failed to load. PDF not generated.");
  };
}

function closeView() {
  viewModal.classList.remove("active");
  document.body.classList.remove("view-open");
}

function setRating(id, val) {
  ratings[id] = val;
  openRecipe(id);
}

function toggleFav(id) {
  favorites.includes(id)
    ? (favorites = favorites.filter((x) => x !== id))
    : favorites.push(id);
  render();
}

function deleteRecipe(id) {
  recipes = recipes.filter((r) => r.id !== id);
  render();
}

addBtn.onclick = () => {
  editingId = null;
  ingredients = [];

  // Clear all inputs
  nameInput.value = "";
  categoryInput.selectedIndex = 0;
  stepsInput.value = "";
  imageInput.value = "";

  renderIngredients();
  formModal.classList.add("active");
  document.body.classList.add("form-open");
};

function editRecipe(id) {
  const r = recipes.find((x) => x.id === id);
  editingId = id;
  nameInput.value = r.name || "";
  categoryInput.value = r.category || "";
  stepsInput.value = r.steps || "";

  ingredients = [...r.ingredients];
  renderIngredients();
  formModal.classList.add("active");
  document.body.classList.add("form-open");
}

function saveRecipe() {
  const recipeName = nameInput.value.trim();

  if (!recipeName) {
    alert("Recipe name is required");
    return;
  }

  if (editingId) {
    const i = recipes.findIndex((r) => r.id === editingId);
    const old = recipes[i];

    recipes[i] = {
      ...old,
      name: recipeName,
      category: categoryInput.value,
      steps: stepsInput.value,
      ingredients: [...ingredients],
      image: imageInput.files[0]
        ? URL.createObjectURL(imageInput.files[0])
        : old.image,
    };
  } else {
    recipes.push({
      id: crypto.randomUUID(),
      name: recipeName,
      category: categoryInput.value,
      steps: stepsInput.value,
      ingredients: [...ingredients],
      image: imageInput.files[0]
        ? URL.createObjectURL(imageInput.files[0])
        : "",
    });
  }

  closeForm();
  render();
}

function closeForm() {
  formModal.classList.remove("active");
  document.body.classList.remove("form-open");
}

addIngredient.onclick = () => {
  if (!ingredientInput.value.trim()) return;
  ingredients.push(ingredientInput.value.trim());
  ingredientInput.value = "";
  renderIngredients();
};
function renderIngredients() {
  ingredientList.innerHTML = "";
  ingredients.forEach((value, index) => {
    ingredientList.innerHTML += `
      <li class="list-group-item d-flex align-items-center gap-2">
        <span style="width:28px;text-align:right;">${index + 1}.</span>
        <input 
          class="form-control form-control-sm"
          value="${value}"
          oninput="ingredients[${index}] = this.value"
        >
        <button class="btn btn-sm btn-danger"
          onclick="ingredients.splice(${index},1); renderIngredients()">✕</button>
      </li>
    `;
  });
}

categoryFilter.onchange = () => {
  if (!categoryFilter.value) render();
  else render(recipes.filter((r) => r.category === categoryFilter.value));
};
searchBtn.onclick = () => {
  const q = search.value.toLowerCase();
  render(
    recipes.filter(
      (r) =>
        r.name.toLowerCase().includes(q) ||
        r.ingredients.join(" ").toLowerCase().includes(q)
    )
  );
};

tabAll.onclick = () => {
  tabAll.classList.add("active");
  tabFav.classList.remove("active");
  render();
};
tabFav.onclick = () => {
  tabFav.classList.add("active");
  tabAll.classList.remove("active");
  render(recipes.filter((r) => favorites.includes(r.id)));
};

themeToggle.onchange = () => {
  document.body.classList.toggle("dark");
  document.body.classList.toggle("light");
};

const mobileMenu = document.getElementById("mobileMenu");
const mobileSearch = document.getElementById("mobileSearch");
const mobileCategory = document.getElementById("mobileCategory");
const mobileAdd = document.getElementById("mobileAdd");
const mobileThemeToggle = document.getElementById("mobileThemeToggle");

function toggleMobileMenu() {
  mobileMenu.classList.toggle("active");
}

function closeMobileMenu() {
  mobileMenu.classList.remove("active");
}

/* Sync category filter */
mobileCategory.onchange = () => {
  categoryFilter.value = mobileCategory.value;
  categoryFilter.onchange();
  closeMobileMenu();
};

/* Sync search */
mobileSearch.oninput = () => {
  search.value = mobileSearch.value;
  searchBtn.onclick();
};

/* Sync add recipe */
mobileAdd.onclick = () => {
  addBtn.click();
  closeMobileMenu();
};

/* Sync theme */
mobileThemeToggle.onchange = () => {
  themeToggle.click();
};

/* Copy categories into mobile dropdown */
function syncMobileCategories() {
  mobileCategory.innerHTML = categoryFilter.innerHTML;
}

/* Call after categories load */
setTimeout(syncMobileCategories, 500);
