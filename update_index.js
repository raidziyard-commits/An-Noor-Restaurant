const fs = require('fs');

const indexPath = 'c:/Users/LENOVO/Desktop/an noor restaurant/index.html';
let indexHtml = fs.readFileSync(indexPath, 'utf8');

// Replace the menu grid content
const startMarker = '<div class="menu-grid" id="menu-grid">';
const endMarker = '</div><!-- end menu-grid -->';

const startIndex = indexHtml.indexOf(startMarker);
const endIndex = indexHtml.indexOf(endMarker, startIndex);

if (startIndex !== -1 && endIndex !== -1) {
  const newGrid = startMarker + '\n        <!-- Dynamic menu items will be rendered here by script.js -->\n      ' + endMarker;
  indexHtml = indexHtml.substring(0, startIndex) + newGrid + indexHtml.substring(endIndex + endMarker.length);
}

// Add menu-data.js before script.js
if (!indexHtml.includes('menu-data.js')) {
  indexHtml = indexHtml.replace('<script src="script.js"></script>', '<script src="menu-data.js"></script>\n  <script src="script.js"></script>');
}

// Add link to admin portal in the footer (after Contact Info)
if (!indexHtml.includes('admin.html')) {
  const footerContact = '<li><i class="fas fa-star"></i> Rated 4.3/5 &middot; 69 Reviews</li>\n          </ul>\n        </div>';
  if (indexHtml.includes('Rated 4.3/5')) {
    indexHtml = indexHtml.replace('<li><i class="fas fa-star"></i> Rated 4.3/5 · 69 Reviews</li>', '<li><i class="fas fa-star"></i> Rated 4.3/5 · 69 Reviews</li>\n            <li><i class="fas fa-lock"></i> <a href="admin.html">Admin Portal</a></li>');
  }
}

fs.writeFileSync(indexPath, indexHtml);
console.log('index.html updated successfully.');
