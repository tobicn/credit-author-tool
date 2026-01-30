// CRediT roles
const creditRoles = [
  "Conceptualization",
  "Methodology",
  "Software",
  "Validation",
  "Formal analysis",
  "Investigation",
  "Resources",
  "Data curation",
  "Writing - original draft",
  "Writing - review & editing",
  "Visualization",
  "Supervision",
  "Project administration",
  "Funding acquisition"
];

const creditRoleDescriptions = {
  "Conceptualization": "Ideas; formulation or evolution of overarching research goals and aims.",
  "Methodology": "Development or design of methodology; creation of models.",
  "Software": "Programming, software development; designing computer programs; implementation of the computer code.",
  "Validation": "Verification of the overall replication or reproducibility of results.",
  "Formal analysis": "Application of statistical, mathematical, computational, or other formal techniques.",
  "Investigation": "Conducting a research and investigation process, specifically performing experiments or data collection.",
  "Resources": "Provision of study materials, reagents, materials, participants, or other analysis tools.",
  "Data curation": "Management activities to annotate, scrub data and maintain research data for initial use and later reuse.",
  "Writing - original draft": "Preparation, creation and/or presentation of the published work, specifically writing the initial draft.",
  "Writing - review & editing": "Preparation, creation and/or presentation of the published work by those from the original draft.",
  "Visualization": "Preparation, creation and/or presentation of the published work, specifically visualization/data presentation.",
  "Supervision": "Oversight and leadership responsibility for the research activity planning and execution.",
  "Project administration": "Management and coordination responsibility for the research activity planning and execution.",
  "Funding acquisition": "Acquisition of the financial support for the project."
};


function generateTable() {
  const authorsText = document.getElementById("authors").value;
  const authors = authorsText
    .split("\n")
    .map(a => a.trim())
    .filter(a => a !== "");

  if (authors.length === 0) {
  alert("Please enter at least one author name.");
  document.getElementById("step2Separator").style.display = "none";
  document.getElementById("step2Label").style.display = "none";
  document.getElementById("tableHelp").style.display = "none";
  document.getElementById("exportContainer").style.display = "none";
  return;
}


  let tableHTML = "<table>";
  tableHTML += "<thead><tr><th>Author</th>";

creditRoles.forEach(role => {
  tableHTML += `
    <th class="tooltip">
      ${role}
      <span class="tooltip-text">
        ${creditRoleDescriptions[role]}
      </span>
    </th>`;
});


  tableHTML += "</tr></thead><tbody>";

  authors.forEach((author, authorIndex) => {
    tableHTML += `<tr><td>${author}</td>`;

    creditRoles.forEach((role, roleIndex) => {
      tableHTML += `
        <td>
          <input type="checkbox"
                 data-author="${authorIndex}"
                 data-role="${roleIndex}">
        </td>`;
    });

    tableHTML += "</tr>";
  });

  tableHTML += "</tbody></table>";
  
  document.getElementById("step2Separator").style.display = "block";
document.getElementById("step2Label").style.display = "flex";
document.getElementById("tableHelp").style.display = "flex";
document.getElementById("exportContainer").style.display = "block";


  document.getElementById("tableContainer").innerHTML = tableHTML;
}

function exportText() {
  const authors = document.getElementById("authors").value
    .split("\n")
    .map(a => a.trim())
    .filter(a => a !== "");

  const contributions = authors.map(() => []);

  const checkboxes = document.querySelectorAll("input[type='checkbox']");

  checkboxes.forEach(cb => {
    if (cb.checked) {
      const authorIndex = cb.dataset.author;
      const roleIndex = cb.dataset.role;
      contributions[authorIndex].push(creditRoles[roleIndex]);
    }
  });

  let output = "CRediT Author contributions: ";

  contributions.forEach((roles, i) => {
    output += `${authors[i]}: ${roles.join(", ")}. `;
  });

  if (output.trim() === "") {
    alert("No contributions selected.");
  } else {
    alert(output);
  }
}

function openCreditInfo() {
  window.open("https://credit.niso.org", "_blank", "noopener,noreferrer");
}
