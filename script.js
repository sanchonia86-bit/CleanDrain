/* =========================================================
   CLEAN DRAIN - INTERACTIVE JAVASCRIPT
========================================================= */


/* =========================================================
   DATA
========================================================= */

let reports =
    JSON.parse(
        localStorage.getItem("cleanDrainReports")
    ) || [];


/* =========================================================
   PAGE NAVIGATION
========================================================= */

function showPage(page, button) {

    document
        .querySelectorAll(".page")
        .forEach(function(section) {

            section.classList.remove("active");

        });


    const target =
        document.getElementById(
            page + "Page"
        );


    if (target) {

        target.classList.add("active");

    }


    document
        .querySelectorAll(".nav-buttons button")
        .forEach(function(btn) {

            btn.classList.remove("active");

        });


    if (button) {

        button.classList.add("active");

    }


    if (page === "dashboard") {

        renderDashboard();

    }


    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

}


/* =========================================================
   TOAST NOTIFICATION
========================================================= */

function showToast(message, type = "success") {

    let toast =
        document.getElementById("toast");


    if (!toast) {

        toast =
            document.createElement("div");

        toast.id = "toast";

        toast.className = "toast";

        document.body.appendChild(toast);

    }


    toast.textContent = message;

    toast.className =
        "toast " +
        type +
        " show";


    setTimeout(function() {

        toast.classList.remove("show");

    }, 3500);

}


/* =========================================================
   PHOTO UPLOAD
========================================================= */

const photoInput =
    document.getElementById(
        "photoInput"
    );


if (photoInput) {

    photoInput.addEventListener(
        "change",
        function() {

            const file =
                this.files[0];


            if (!file) {

                return;

            }


            if (!file.type.startsWith("image/")) {

                showToast(
                    "Please select an image file.",
                    "error"
                );

                this.value = "";

                return;

            }


            const reader =
                new FileReader();


            reader.onload =
                function(event) {

                    document
                        .getElementById(
                            "previewImage"
                        )
                        .src =
                        event.target.result;


                    document
                        .getElementById(
                            "photoPreview"
                        )
                        .style.display =
                        "block";

                };


            reader.readAsDataURL(file);

        }
    );

}


/* =========================================================
   REMOVE PHOTO
========================================================= */

function removePhoto() {

    const input =
        document.getElementById(
            "photoInput"
        );

    const preview =
        document.getElementById(
            "photoPreview"
        );


    if (input) {

        input.value = "";

    }


    if (preview) {

        preview.style.display =
            "none";

    }

}


/* =========================================================
   AI-ASSISTED ANALYSIS
========================================================= */

function analyzeReport() {

    const description =
        document
            .getElementById(
                "description"
            )
            .value
            .toLowerCase()
            .trim();


    if (!description) {

        showToast(
            "Please describe the drainage problem first.",
            "error"
        );

        return;

    }


    const loading =
        document.getElementById(
            "aiLoading"
        );


    if (loading) {

        loading.style.display =
            "block";

    }


    setTimeout(function() {

        let category =
            "General Drainage Problem";

        let severity =
            "Medium";

        let reason =
            "The description indicates a general drainage concern.";


        /* CATEGORY */

        if (
            description.includes("garbage") ||
            description.includes("trash") ||
            description.includes("waste") ||
            description.includes("plastic") ||
            description.includes("bottle")
        ) {

            category =
                "Garbage Accumulation";

            reason =
                "The description contains terms related to solid waste or garbage.";

        }

        else if (
            description.includes("canal") ||
            description.includes("creek") ||
            description.includes("waterway")
        ) {

            category =
                "Blocked Canal";

            reason =
                "The description refers to a canal or waterway.";

        }

        else if (
            description.includes("flood") ||
            description.includes("flooding") ||
            description.includes("standing water") ||
            description.includes("overflow")
        ) {

            category =
                "Flooding";

            reason =
                "The description indicates standing or overflowing water.";

        }

        else if (
            description.includes("broken") ||
            description.includes("damaged") ||
            description.includes("collapsed") ||
            description.includes("crack")
        ) {

            category =
                "Damaged Drainage";

            reason =
                "The description suggests physical damage to drainage infrastructure.";

        }

        else if (
            description.includes("clog") ||
            description.includes("blocked") ||
            description.includes("blockage")
        ) {

            category =
                "Clogged Drain";

            reason =
                "The description indicates a blockage in the drainage system.";

        }


        /* SEVERITY */

        if (
            description.includes("small") ||
            description.includes("minor")
        ) {

            severity = "Low";

        }


        if (
            description.includes("bad") ||
            description.includes("large") ||
            description.includes("major") ||
            description.includes("severe") ||
            description.includes("dangerous") ||
            description.includes("overflow") ||
            description.includes("flood")
        ) {

            severity = "High";

        }


        if (
            description.includes("house flooded") ||
            description.includes("houses flooded") ||
            description.includes("road flooded") ||
            description.includes("impassable") ||
            description.includes("vehicles cannot pass")
        ) {

            severity = "Critical";

        }


        /* DISPLAY */

        document
            .getElementById(
                "aiCategory"
            )
            .innerHTML =
            "<strong>Suggested Category:</strong> "
            + category;


        document
            .getElementById(
                "aiSeverity"
            )
            .innerHTML =
            "<strong>Suggested Severity:</strong> "
            + severity;


        document
            .getElementById(
                "aiReason"
            )
            .innerHTML =
            "<strong>Reason:</strong> "
            + reason;


        document
            .getElementById(
                "aiResult"
            )
            .style.display =
            "block";


        /* AUTO-FILL */

        document
            .getElementById(
                "problemType"
            )
            .value =
            category;


        document
            .getElementById(
                "severity"
            )
            .value =
            severity;


        if (loading) {

            loading.style.display =
                "none";

        }


        showToast(
            "AI-assisted analysis completed."
        );


    }, 900);

}


/* =========================================================
   SUBMIT REPORT
========================================================= */

const reportForm =
    document.getElementById(
        "reportForm"
    );


if (reportForm) {

    reportForm.addEventListener(
        "submit",
        function(event) {

            event.preventDefault();


            const name =
                document
                    .getElementById(
                        "residentName"
                    )
                    .value
                    .trim();


            const contact =
                document
                    .getElementById(
                        "residentContact"
                    )
                    .value
                    .trim();


            const location =
                document
                    .getElementById(
                        "location"
                    )
                    .value
                    .trim();


            const description =
                document
                    .getElementById(
                        "description"
                    )
                    .value
                    .trim();


            const category =
                document
                    .getElementById(
                        "problemType"
                    )
                    .value ||
                "General Drainage Problem";


            const severity =
                document
                    .getElementById(
                        "severity"
                    )
                    .value ||
                "Medium";


            const photo =
                document
                    .getElementById(
                        "photoInput"
                    )
                    .files[0];


            if (!name ||
                !location ||
                !description) {

                showToast(
                    "Please complete all required fields.",
                    "error"
                );

                return;

            }


            if (!photo) {

                showToast(
                    "Please attach photo evidence.",
                    "error"
                );

                return;

            }


            const reader =
                new FileReader();


            reader.onload =
                function(event) {

                    const report = {

                        id:
                            "CD-" +
                            Date.now()
                                .toString()
                                .slice(-6),

                        name:
                            name,

                        contact:
                            contact,

                        location:
                            location,

                        description:
                            description,

                        category:
                            category,

                        severity:
                            severity,

                        status:
                            "Received",

                        photo:
                            event.target.result,

                        date:
                            new Date()
                                .toLocaleString(),

                        updates: [

                            {
                                status:
                                    "Received",

                                date:
                                    new Date()
                                        .toLocaleString()
                            }

                        ]

                    };


                    reports.unshift(report);


                    saveReports();


                    showToast(
                        "Report submitted successfully!"
                    );


                    alert(
                        "Your CleanDrain Report ID is:\n\n"
                        + report.id
                        + "\n\nSave this ID so you can track your report."
                    );


                    reportForm.reset();


                    removePhoto();


                    const aiResult =
                        document.getElementById(
                            "aiResult"
                        );


                    if (aiResult) {

                        aiResult.style.display =
                            "none";

                    }


                    showPage("track");


                    document
                        .getElementById(
                            "trackInput"
                        )
                        .value =
                        report.id;


                    trackReport();

                };


            reader.readAsDataURL(photo);

        }
    );

}


/* =========================================================
   SAVE REPORTS
========================================================= */

function saveReports() {

    localStorage.setItem(
        "cleanDrainReports",
        JSON.stringify(reports)
    );

}


/* =========================================================
   STATUS CLASS
========================================================= */

function getStatusClass(status) {

    switch (status) {

        case "Received":
            return "status-received";

        case "For Inspection":
            return "status-inspection";

        case "Action in Progress":
            return "status-progress";

        case "Resolved":
            return "status-resolved";

        default:
            return "status-received";

    }

}


/* =========================================================
   SEVERITY CLASS
========================================================= */

function getSeverityClass(severity) {

    switch (severity) {

        case "Low":
            return "severity-low";

        case "Medium":
            return "severity-medium";

        case "High":
            return "severity-high";

        case "Critical":
            return "severity-critical";

        default:
            return "severity-medium";

    }

}


/* =========================================================
   TRACK REPORT
========================================================= */

function trackReport() {

    const input =
        document.getElementById(
            "trackInput"
        );


    const result =
        document.getElementById(
            "trackResult"
        );


    if (!input || !result) {

        return;

    }


    const id =
        input.value
            .trim()
            .toUpperCase();


    if (!id) {

        showToast(
            "Enter a Report ID.",
            "error"
        );

        return;

    }


    const report =
        reports.find(
            function(item) {

                return item.id
                    .toUpperCase() === id;

            }
        );


    if (!report) {

        result.style.display =
            "block";


        result.innerHTML = `

            <div class="card">

                <div class="empty">

                    <h3>❌ Report Not Found</h3>

                    <p>
                        Please check your Report ID.
                    </p>

                </div>

            </div>

        `;

        return;

    }


    result.style.display =
        "block";


    const statusIndex =
        [
            "Received",
            "For Inspection",
            "Action in Progress",
            "Resolved"
        ].indexOf(
            report.status
        );


    result.innerHTML = `

        <div class="card">

            <div style="
                display:flex;
                justify-content:space-between;
                align-items:center;
                gap:15px;
                flex-wrap:wrap;
            ">

                <div>

                    <h2>
                        ${escapeHTML(report.id)}
                    </h2>

                    <small>
                        Submitted:
                        ${escapeHTML(report.date)}
                    </small>

                </div>

                <span class="
                    status
                    ${getStatusClass(report.status)}
                ">

                    ${escapeHTML(report.status)}

                </span>

            </div>


            <div class="tracker">

                ${createTrackingStep(
                    "1",
                    "Received",
                    statusIndex,
                    0
                )}

                ${createTrackingStep(
                    "2",
                    "For Inspection",
                    statusIndex,
                    1
                )}

                ${createTrackingStep(
                    "3",
                    "Action in Progress",
                    statusIndex,
                    2
                )}

                ${createTrackingStep(
                    "4",
                    "Resolved",
                    statusIndex,
                    3
                )}

            </div>


            <div class="form-grid">

                <div>

                    <strong>Resident</strong>

                    <p>
                        ${escapeHTML(report.name)}
                    </p>

                </div>


                <div>

                    <strong>Location</strong>

                    <p>
                        ${escapeHTML(report.location)}
                    </p>

                </div>


                <div>

                    <strong>Category</strong>

                    <p>
                        ${escapeHTML(report.category)}
                    </p>

                </div>


                <div>

                    <strong>Severity</strong>

                    <p>

                        <span class="
                            status
                            ${getSeverityClass(report.severity)}
                        ">

                            ${escapeHTML(report.severity)}

                        </span>

                    </p>

                </div>

            </div>


            <br>


            <strong>Description</strong>

            <p>
                ${escapeHTML(report.description)}
            </p>


            <div class="map-box">

                📍

                <div>
                    <strong>Reported Location</strong>

                    <br>

                    ${escapeHTML(report.location)}
                </div>

            </div>


            <br>


            <strong>Photo Evidence</strong>

            <br><br>

            <img
                src="${report.photo}"
                alt="Drainage evidence"
                style="
                    width:100%;
                    max-height:400px;
                    object-fit:cover;
                    border-radius:12px;
                "
            >

        </div>

    `;

}


/* =========================================================
   TRACKING STEP
========================================================= */

function createTrackingStep(
    number,
    title,
    currentIndex,
    stepIndex
) {

    let className = "";


    if (stepIndex < currentIndex) {

        className =
            "completed";

    }

    else if (stepIndex === currentIndex) {

        className =
            "current";

    }


    return `

        <div class="step ${className}">

            <div class="step-circle">
                ${number}
            </div>

            <span>
                ${title}
            </span>

        </div>

    `;

}


/* =========================================================
   DASHBOARD
========================================================= */

function renderDashboard() {

    const searchInput =
        document.getElementById(
            "dashboardSearch"
        );


    const statusInput =
        document.getElementById(
            "dashboardStatus"
        );


    const search =
        searchInput
            ? searchInput.value
                .toLowerCase()
                .trim()
            : "";


    const statusFilter =
        statusInput
            ? statusInput.value
            : "All";


    /* STATISTICS */

    document.getElementById(
        "totalReports"
    ).textContent =
        reports.length;


    document.getElementById(
        "inspectionReports"
    ).textContent =
        reports.filter(
            function(report) {

                return report.status ===
                    "For Inspection";

            }
        ).length;


    document.getElementById(
        "progressReports"
    ).textContent =
        reports.filter(
            function(report) {

                return report.status ===
                    "Action in Progress";

            }
        ).length;


    document.getElementById(
        "resolvedReports"
    ).textContent =
        reports.filter(
            function(report) {

                return report.status ===
                    "Resolved";

            }
        ).length;


    /* FILTER */

    const filtered =
        reports.filter(
            function(report) {

                const searchable =
                    (
                        report.name +
                        " " +
                        report.location +
                        " " +
                        report.id +
                        " " +
                        report.category
                    )
                    .toLowerCase();


                const matchesSearch =
                    !search ||
                    searchable.includes(search);


                const matchesStatus =
                    statusFilter === "All" ||
                    report.status ===
                        statusFilter;


                return (
                    matchesSearch &&
                    matchesStatus
                );

            }
        );


    const table =
        document.getElementById(
            "dashboardTable"
        );


    if (!filtered.length) {

        table.innerHTML = `

            <tr>

                <td colspan="7">

                    <div class="empty">

                        <h3>
                            No reports found
                        </h3>

                        <p>
                            Submitted reports will appear here.
                        </p>

                    </div>

                </td>

            </tr>

        `;

        return;

    }


    table.innerHTML =
        filtered
            .map(
                function(report) {

                    return `

                        <tr>

                            <td>

                                <img
                                    class="report-thumbnail"
                                    src="${report.photo}"
                                    alt="Report"
                                >

                                <br>

                                <small>
                                    ${escapeHTML(report.id)}
                                </small>

                            </td>


                            <td>
                                ${escapeHTML(report.name)}
                            </td>


                            <td>
                                ${escapeHTML(report.location)}
                            </td>


                            <td>
                                ${escapeHTML(report.category)}
                            </td>


                            <td>

                                <span class="
                                    status
                                    ${getSeverityClass(
                                        report.severity
                                    )}
                                ">

                                    ${escapeHTML(
                                        report.severity
                                    )}

                                </span>

                            </td>


                            <td>

                                <span class="
                                    status
                                    ${getStatusClass(
                                        report.status
                                    )}
                                ">

                                    ${escapeHTML(
                                        report.status
                                    )}

                                </span>

                            </td>


                            <td>

                                <button
                                    class="btn btn-blue"
                                    onclick="viewReport('${report.id}')"
                                >

                                    View

                                </button>

                            </td>

                        </tr>

                    `;

                }
            )
            .join("");

}


/* =========================================================
   VIEW REPORT
========================================================= */

function viewReport(id) {

    const report =
        reports.find(
            function(item) {

                return item.id === id;

            }
        );


    if (!report) {

        return;

    }


    const modal =
        document.getElementById(
            "reportModal"
        );


    const body =
        document.getElementById(
            "modalBody"
        );


    body.innerHTML = `

        <img
            src="${report.photo}"
            alt="Drainage evidence"
            style="
                width:100%;
                max-height:350px;
                object-fit:cover;
                border-radius:10px;
                margin-bottom:18px;
            "
        >


        <div class="form-grid">

            <div>

                <strong>Report ID</strong>

                <p>
                    ${escapeHTML(report.id)}
                </p>

            </div>


            <div>

                <strong>Date</strong>

                <p>
                    ${escapeHTML(report.date)}
                </p>

            </div>


            <div>

                <strong>Resident</strong>

                <p>
                    ${escapeHTML(report.name)}
                </p>

            </div>


            <div>

                <strong>Contact</strong>

                <p>
                    ${escapeHTML(
                        report.contact ||
                        "Not provided"
                    )}
                </p>

            </div>


            <div>

                <strong>Category</strong>

                <p>
                    ${escapeHTML(report.category)}
                </p>

            </div>


            <div>

                <strong>Severity</strong>

                <p>

                    <span class="
                        status
                        ${getSeverityClass(
                            report.severity
                        )}
                    ">

                        ${escapeHTML(
                            report.severity
                        )}

                    </span>

                </p>

            </div>

        </div>


        <br>


        <strong>Location</strong>

        <p>
            ${escapeHTML(report.location)}
        </p>


        <div class="map-box">

            📍 ${escapeHTML(report.location)}

        </div>


        <br>


        <strong>Description</strong>

        <p>
            ${escapeHTML(report.description)}
        </p>


        <hr
            style="
                margin:20px 0;
                border:none;
                border-top:1px solid #ddd;
            "
        >


        <h3>
            Update Report Status
        </h3>


        <br>


        <select id="modalStatus">

            <option
                ${report.status === "Received"
                    ? "selected"
                    : ""}
            >
                Received
            </option>

            <option
                ${report.status === "For Inspection"
                    ? "selected"
                    : ""}
            >
                For Inspection
            </option>

            <option
                ${report.status === "Action in Progress"
                    ? "selected"
                    : ""}
            >
                Action in Progress
            </option>

            <option
                ${report.status === "Resolved"
                    ? "selected"
                    : ""}
            >
                Resolved
            </option>

        </select>


        <br><br>


        <button
            class="btn btn-primary"
            onclick="updateReportStatus('${report.id}')"
        >

            Save Status

        </button>

    `;


    modal.classList.add("show");

}


/* =========================================================
   UPDATE REPORT STATUS
========================================================= */

function updateReportStatus(id) {

    const report =
        reports.find(
            function(item) {

                return item.id === id;

            }
        );


    if (!report) {

        return;

    }


    const select =
        document.getElementById(
            "modalStatus"
        );


    const newStatus =
        select.value;


    if (report.status !== newStatus) {

        report.status =
            newStatus;


        report.updates.push({

            status:
                newStatus,

            date:
                new Date()
                    .toLocaleString()

        });

    }


    saveReports();


    closeModal();


    renderDashboard();


    showToast(
        "Report status updated to " +
        newStatus
    );

}


/* =========================================================
   CLOSE MODAL
========================================================= */

function closeModal() {

    const modal =
        document.getElementById(
            "reportModal"
        );


    if (modal) {

        modal.classList.remove(
            "show"
        );

    }

}


/* =========================================================
   CLOSE MODAL WHEN CLICKING OUTSIDE
========================================================= */

window.addEventListener(
    "click",
    function(event) {

        const modal =
            document.getElementById(
                "reportModal"
            );


        if (
            modal &&
            event.target === modal
        ) {

            closeModal();

        }

    }
);


/* =========================================================
   ESCAPE HTML
========================================================= */

function escapeHTML(value) {

    if (
        value === undefined ||
        value === null
    ) {

        return "";

    }


    return String(value)
        .replace(
            /&/g,
            "&amp;"
        )
        .replace(
            /</g,
            "&lt;"
        )
        .replace(
            />/g,
            "&gt;"
        )
        .replace(
            /"/g,
            "&quot;"
        )
        .replace(
            /'/g,
            "&#039;"
        );

}


/* =========================================================
   INITIALIZE
========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    function() {

        renderDashboard();

    }
);