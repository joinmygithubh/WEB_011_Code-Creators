document.addEventListener("DOMContentLoaded", function () {
  const incompleteTasks = [
    {
      id: 1,
      type: "team",
      description: "Approve team invite for James King",
      requestedBy: "Landon Shepherd",
      dueBy: "Feb 7",
    },
    {
      id: 2,
      type: "payment",
      description: "Approve $1,042.95 payment to Jason Green",
      requestedBy: "Aluna T.",
      dueBy: "Feb 7",
    },
    {
      id: 3,
      type: "payment",
      description: "Approve $5,000.00 recurring payment to Jason Green",
      requestedBy: "Aluna T.",
      dueBy: "Feb 7",
    },
    {
      id: 4,
      type: "settings",
      description: "Approve new daily maximum payment limit",
      requestedBy: "Landon Shepherd",
      dueBy: "Feb 7",
    },
    {
      id: 5,
      type: "settings",
      description: "Approve enabling the dual admin approval policy",
      requestedBy: "Landon Shepherd",
      dueBy: "Feb 7",
    },
    // Additional tasks here...
  ];

  const completedTasks = [
    {
      id: 6,
      type: "payment",
      description: "Approve $750.00 payment to Sarah Miller",
      requestedBy: "Aluna T.",
      completedAt: "Feb 6",
    },
    // Additional completed tasks here...
  ];

  const incompleteTab = document.getElementById("incompleteTab");
  const completedTab = document.getElementById("completedTab");
  const tasksContent = document.getElementById("tasksContent");

  incompleteTab.addEventListener("click", () =>
    renderTasks(incompleteTasks, "dueBy")
  );
  completedTab.addEventListener("click", () =>
    renderTasks(completedTasks, "completedAt")
  );

  function renderTasks(tasks, dateType) {
    let html = `
              <table class="w-full">
                  <thead>
                      <tr class="border-b border-gray-200">
                          <th class="text-left py-3 px-6 text-sm font-medium text-gray-500">Description</th>
                          <th class="text-right py-3 px-6 text-sm font-medium text-gray-500">${
                            dateType === "dueBy" ? "Due by" : "Received"
                          }</th>
                      </tr>
                  </thead>
                  <tbody>
          `;

    tasks.forEach((task) => {
      html += `
                  <tr class="border-b border-gray-200 hover:bg-gray-50">
                      <td class="py-4 px-6">
                          <div class="flex items-start space-x-3">
                              <div class="mt-1">
                                  <!-- Placeholder for task icon -->
                              </div>
                              <div>
                                  <div class="font-medium text-gray-900">${task.description}</div>
                                  <div class="text-sm text-gray-600">requested by ${task.requestedBy}</div>
                              </div>
                          </div>
                      </td>
                      <td class="py-4 px-6 text-right">
                          <span class="text-sm text-gray-600">${task[dateType]}</span>
                      </td>
                  </tr>
              `;
    });

    html += `</tbody></table>`;
    tasksContent.innerHTML = html;
    setActiveTab(dateType);
  }

  function setActiveTab(dateType) {
    if (dateType === "dueBy") {
      incompleteTab.classList.add(
        "text-[#6851ff]",
        "border-b-2",
        "border-[#6851ff]"
      );
      completedTab.classList.remove(
        "text-[#6851ff]",
        "border-b-2",
        "border-[#6851ff]"
      );
    } else {
      completedTab.classList.add(
        "text-[#6851ff]",
        "border-b-2",
        "border-[#6851ff]"
      );
      incompleteTab.classList.remove(
        "text-[#6851ff]",
        "border-b-2",
        "border-[#6851ff]"
      );
    }
  }

  renderTasks(incompleteTasks, "dueBy"); // Default view
});
