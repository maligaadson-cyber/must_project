(function () {

    "use strict";


    /* =========================================
       STORAGE NAMES
    ========================================= */

    const PROJECTS_KEY = "ptms_projects";

    const USERS_KEY = "ptms_users";

    const SESSION_KEY = "ptms_logged_in_user";


    /* =========================================
       DEFAULT USERS
    ========================================= */

    const defaultUsers = [

        {
            id: 1,
            name: "System Administrator",
            username: "admin",
            password: "Admin@123",
            role: "Administrator"
        },

        {
            id: 2,
            name: "Dr. John Doe",
            username: "johndoe",
            password: "Admin@123",
            role: "Supervisor"
        },

        {
            id: 3,
            name: "Dr. Jane Smith",
            username: "janesmith",
            password: "Admin@123",
            role: "Supervisor"
        },

        {
            id: 4,
            name: "Prof. James Peter",
            username: "james",
            password: "Admin@123",
            role: "Supervisor"
        },

        {
            id: 5,
            name: "Project Coordinator",
            username: "coordinator",
            password: "Admin@123",
            role: "Coordinator"
        },

        {
            id: 6,
            name: "Department Head",
            username: "head",
            password: "Admin@123",
            role: "Department Head"
        },

        {
            id: 7,
            name: "Demo Student",
            username: "student",
            password: "Student@123",
            role: "Student",
            regNumber: "BCS/2023/001"
        }

    ];


    /* =========================================
       GET DATA
    ========================================= */

    function getProjects() {

        const data =
            localStorage.getItem(PROJECTS_KEY);

        if (!data) {

            localStorage.setItem(
                PROJECTS_KEY,
                JSON.stringify([])
            );

            return [];

        }

        try {

            return JSON.parse(data);

        } catch (error) {

            console.error(error);

            return [];

        }

    }


    function saveProjects(projects) {

        localStorage.setItem(
            PROJECTS_KEY,
            JSON.stringify(projects)
        );

    }


    function getUsers() {

        const data =
            localStorage.getItem(USERS_KEY);

        if (!data) {

            localStorage.setItem(
                USERS_KEY,
                JSON.stringify(defaultUsers)
            );

            return defaultUsers;

        }

        try {

            return JSON.parse(data);

        } catch (error) {

            return defaultUsers;

        }

    }


    /* =========================================
       SESSION
    ========================================= */

    function getCurrentUser() {

        const data =
            localStorage.getItem(SESSION_KEY);

        if (!data) {
            return null;
        }

        try {

            return JSON.parse(data);

        } catch {

            return null;

        }

    }


    function requireAdmin() {

        const user =
            getCurrentUser();


        if (!user) {

            alert(
                "Please login as Administrator."
            );

            window.location.href =
                "login.html";

            return null;

        }


        if (user.role !== "Administrator") {

            alert(
                "Only Administrator can access this page."
            );

            window.location.href =
                "index.html";

            return null;

        }


        return user;

    }


    /* =========================================
       ID GENERATOR
    ========================================= */

    function generateId(items) {

        if (items.length === 0) {
            return 1;
        }

        return Math.max(
            ...items.map(
                item => Number(item.id) || 0
            )
        ) + 1;

    }


    /* =========================================
       HTML SECURITY
    ========================================= */

    function escapeHTML(value) {

        return String(value || "")

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


    /* =========================================
       LOGIN
    ========================================= */

    function setupLogin() {

        const form =
            document.getElementById(
                "loginForm"
            );


        if (!form) {
            return;
        }


        form.addEventListener(
            "submit",
            function (event) {

                event.preventDefault();


                const username =
                    document
                        .getElementById(
                            "loginUsername"
                        )
                        .value
                        .trim();


                const password =
                    document
                        .getElementById(
                            "loginPassword"
                        )
                        .value;


                const users =
                    getUsers();


                const user =
                    users.find(
                        item =>

                            item.username
                                .toLowerCase() ===
                            username
                                .toLowerCase()

                            &&

                            item.password ===
                            password
                    );


                if (!user) {

                    alert(
                        "Invalid username or password."
                    );

                    return;

                }


                localStorage.setItem(
                    SESSION_KEY,
                    JSON.stringify(user)
                );


                alert(
                    "Login successful."
                );


                const pages = {

                    "Administrator":
                        "admin.html",

                    "Student":
                        "student.html",

                    "Supervisor":
                        "supervisor.html",

                    "Coordinator":
                        "coordinator.html",

                    "Department Head":
                        "department-head.html"

                };


                window.location.href =
                    pages[user.role] ||
                    "index.html";

            }
        );

    }


    /* =========================================
       LOGOUT
    ========================================= */

    window.logout = function () {

        localStorage.removeItem(
            SESSION_KEY
        );

        window.location.href =
            "login.html";

    };


    /* =========================================
       STUDENT PROJECT REGISTRATION
    ========================================= */

    function setupRegistration() {

        const form =
            document.getElementById(
                "registrationForm"
            );


        if (!form) {
            return;
        }


        form.addEventListener(
            "submit",
            function (event) {

                event.preventDefault();


                const studentName =
                    document
                        .getElementById(
                            "studentName"
                        )
                        .value
                        .trim();


                const regNumber =
                    document
                        .getElementById(
                            "regNumber"
                        )
                        .value
                        .trim();


                const title =
                    document
                        .getElementById(
                            "title"
                        )
                        .value
                        .trim();


                const supervisor =
                    document
                        .getElementById(
                            "supervisor"
                        )
                        .value;


                if (
                    !studentName ||
                    !regNumber ||
                    !title ||
                    !supervisor
                ) {

                    alert(
                        "Please fill all fields."
                    );

                    return;

                }


                const projects =
                    getProjects();


                /* CHECK DUPLICATE REGISTRATION NUMBER */

                const existingStudent =
                    projects.find(
                        project =>
                            project.regNumber
                                .toLowerCase() ===
                            regNumber
                                .toLowerCase()
                    );


                if (existingStudent) {

                    alert(
                        "This registration number already has a project."
                    );

                    return;

                }


                /* CHECK DUPLICATE TITLE */

                const existingTitle =
                    projects.find(
                        project =>
                            project.title
                                .toLowerCase() ===
                            title
                                .toLowerCase()
                    );


                if (existingTitle) {

                    alert(
                        "This project title already exists."
                    );

                    return;

                }


                const newProject = {

                    id:
                        generateId(projects),

                    studentName:
                        studentName,

                    regNumber:
                        regNumber,

                    title:
                        title,

                    supervisor:
                        supervisor,

                    status:
                        "Pending",

                    date:
                        new Date()
                            .toLocaleString()

                };


                projects.push(
                    newProject
                );


                saveProjects(
                    projects
                );


                alert(
                    "Project registered successfully and sent for approval."
                );


                form.reset();


                window.location.href =
                    "project.html";

            }
        );

    }


    /* =========================================
       SHOW ALL REGISTERED PROJECTS
    ========================================= */

    function renderAllProjects() {

        const tbody =
            document.getElementById(
                "allProjectsBody"
            );


        if (!tbody) {
            return;
        }


        const projects =
            getProjects();


        if (projects.length === 0) {

            tbody.innerHTML = `

                <tr>

                    <td colspan="6">
                        No projects have been registered.
                    </td>

                </tr>

            `;

            return;

        }


        tbody.innerHTML =

            projects.map(
                (project, index) => `

                <tr>

                    <td>
                        ${index + 1}
                    </td>

                    <td>
                        ${escapeHTML(
                            project.studentName
                        )}
                    </td>

                    <td>
                        ${escapeHTML(
                            project.regNumber
                        )}
                    </td>

                    <td>
                        ${escapeHTML(
                            project.title
                        )}
                    </td>

                    <td>
                        ${escapeHTML(
                            project.supervisor
                        )}
                    </td>

                    <td>

                        <span class="status
                            ${project.status
                                .toLowerCase()
                                .replace(
                                    " ",
                                    "-"
                                )}">

                            ${escapeHTML(
                                project.status
                            )}

                        </span>

                    </td>

                </tr>

            `
            ).join("");

    }


    /* =========================================
       SHOW APPROVED TITLES ONLY
    ========================================= */

    function renderApprovedTitles() {

        const tbody =
            document.getElementById(
                "approvedTitlesBody"
            );


        if (!tbody) {
            return;
        }


        const projects =
            getProjects();


        const approved =
            projects.filter(
                project =>
                    project.status ===
                    "Approved"
            );


        if (approved.length === 0) {

            tbody.innerHTML = `

                <tr>

                    <td colspan="6">

                        No approved project titles available.

                    </td>

                </tr>

            `;

            return;

        }


        tbody.innerHTML =

            approved.map(
                (project, index) => `

                <tr>

                    <td>
                        ${index + 1}
                    </td>

                    <td>
                        ${escapeHTML(
                            project.studentName
                        )}
                    </td>

                    <td>
                        ${escapeHTML(
                            project.regNumber
                        )}
                    </td>

                    <td>
                        <strong>
                            ${escapeHTML(
                                project.title
                            )}
                        </strong>
                    </td>

                    <td>
                        ${escapeHTML(
                            project.supervisor
                        )}
                    </td>

                    <td>

                        <span class="status approved">

                            Approved

                        </span>

                    </td>

                </tr>

            `
            ).join("");

    }


    /* =========================================
       ADMIN PROJECT LIST
    ========================================= */

    function renderAdminProjects() {

        const tbody =
            document.getElementById(
                "adminProjectsBody"
            );


        if (!tbody) {
            return;
        }


        const admin =
            requireAdmin();


        if (!admin) {
            return;
        }


        const projects =
            getProjects();


        if (projects.length === 0) {

            tbody.innerHTML = `

                <tr>

                    <td colspan="7">

                        No student projects submitted.

                    </td>

                </tr>

            `;

            return;

        }


        tbody.innerHTML =

            projects.map(
                (project, index) => `

                <tr>

                    <td>
                        ${index + 1}
                    </td>

                    <td>
                        ${escapeHTML(
                            project.studentName
                        )}
                    </td>

                    <td>
                        ${escapeHTML(
                            project.regNumber
                        )}
                    </td>

                    <td>
                        ${escapeHTML(
                            project.title
                        )}
                    </td>

                    <td>
                        ${escapeHTML(
                            project.supervisor
                        )}
                    </td>

                    <td>

                        <span class="status
                            ${project.status
                                .toLowerCase()}">

                            ${escapeHTML(
                                project.status
                            )}

                        </span>

                    </td>

                    <td>

                        ${
                            project.status ===
                            "Pending"

                            ?

                            `

                            <button
                                class="btn small-btn"
                                onclick="approveProject(${project.id})">

                                Approve

                            </button>


                            <button
                                class="btn danger-btn small-btn"
                                onclick="rejectProject(${project.id})">

                                Reject

                            </button>

                            `

                            :

                            project.status ===
                            "Approved"

                            ?

                            `

                            <button
                                class="btn danger-btn small-btn"
                                onclick="rejectProject(${project.id})">

                                Reject

                            </button>

                            `

                            :

                            `

                            <button
                                class="btn small-btn"
                                onclick="approveProject(${project.id})">

                                Approve

                            </button>

                            `
                        }

                    </td>

                </tr>

            `
            ).join("");

    }


    /* =========================================
       APPROVE PROJECT
    ========================================= */

    window.approveProject =
        function (id) {

            const admin =
                requireAdmin();


            if (!admin) {
                return;
            }


            const projects =
                getProjects();


            const project =
                projects.find(
                    item =>
                        Number(item.id) ===
                        Number(id)
                );


            if (!project) {

                alert(
                    "Project not found."
                );

                return;

            }


            const confirmApproval =
                confirm(

                    "Approve this project title?\n\n" +

                    project.title

                );


            if (!confirmApproval) {
                return;
            }


            project.status =
                "Approved";


            saveProjects(
                projects
            );


            alert(
                "Project title approved successfully."
            );


            renderAdminProjects();

        };


    /* =========================================
       REJECT PROJECT
    ========================================= */

    window.rejectProject =
        function (id) {

            const admin =
                requireAdmin();


            if (!admin) {
                return;
            }


            const projects =
                getProjects();


            const project =
                projects.find(
                    item =>
                        Number(item.id) ===
                        Number(id)
                );


            if (!project) {
                return;
            }


            const confirmReject =
                confirm(

                    "Reject this project title?\n\n" +

                    project.title

                );


            if (!confirmReject) {
                return;
            }


            project.status =
                "Rejected";


            saveProjects(
                projects
            );


            alert(
                "Project title rejected."
            );


            renderAdminProjects();

        };


    /* =========================================
       EXPORT EXCEL
    ========================================= */

    window.exportTableExcel =
        function (
            tableId,
            filename
        ) {

            if (
                typeof XLSX ===
                "undefined"
            ) {

                alert(
                    "Excel library not loaded. Please connect to the internet and reload."
                );

                return;

            }


            const table =
                document.getElementById(
                    tableId
                );


            if (!table) {
                return;
            }


            const workbook =
                XLSX.utils.table_to_book(
                    table,
                    {
                        sheet:
                            "PTMS Data"
                    }
                );


            XLSX.writeFile(
                workbook,
                (
                    filename ||
                    "PTMS_Report"
                ) + ".xlsx"
            );

        };


    /* =========================================
       EXPORT PDF
    ========================================= */

    window.exportTablePDF =
        function (
            tableId,
            title
        ) {

            if (
                !window.jspdf ||
                !window.jspdf.jsPDF
            ) {

                alert(
                    "PDF library not loaded. Please connect to the internet and reload."
                );

                return;

            }


            const table =
                document.getElementById(
                    tableId
                );


            if (!table) {
                return;
            }


            const doc =
                new window.jspdf.jsPDF(
                    "landscape"
                );


            doc.setFontSize(
                16
            );


            doc.text(
                title ||
                "PTMS Report",
                14,
                15
            );


            const headers =
                Array.from(
                    table.querySelectorAll(
                        "thead th"
                    )
                ).map(
                    th =>
                        th.innerText
                );


            const rows =
                Array.from(
                    table.querySelectorAll(
                        "tbody tr"
                    )
                ).map(
                    row =>
                        Array.from(
                            row.querySelectorAll(
                                "td"
                            )
                        ).map(
                            td =>
                                td.innerText
                        )
                );


            if (
                typeof doc.autoTable ===
                "function"
            ) {

                doc.autoTable({

                    head:
                        [headers],

                    body:
                        rows,

                    startY:
                        22,

                    styles: {

                        fontSize:
                            8

                    }

                });

            }


            doc.save(

                (
                    title ||
                    "PTMS_Report"
                )

                    .replace(
                        /\s+/g,
                        "-"
                    )

                    .toLowerCase()

                    + ".pdf"

            );

        };


    /* =========================================
       ADD EXPORT BUTTONS
    ========================================= */

    function addExportButtons() {

        document
            .querySelectorAll(
                "[data-export-table]"
            )
            .forEach(
                container => {

                    if (
                        container.dataset.ready
                    ) {
                        return;
                    }


                    container.dataset.ready =
                        "true";


                    const tableId =
                        container.dataset
                            .exportTable;


                    const title =
                        container.dataset
                            .exportTitle ||
                        "PTMS Report";


                    const pdf =
                        document.createElement(
                            "button"
                        );


                    pdf.className =
                        "btn secondary-btn";


                    pdf.textContent =
                        "Download PDF";


                    pdf.onclick =
                        function () {

                            exportTablePDF(
                                tableId,
                                title
                            );

                        };


                    const excel =
                        document.createElement(
                            "button"
                        );


                    excel.className =
                        "btn primary-btn";


                    excel.textContent =
                        "Export Excel (.xlsx)";


                    excel.onclick =
                        function () {

                            exportTableExcel(
                                tableId,
                                title
                            );

                        };


                    container.appendChild(
                        pdf
                    );


                    container.appendChild(
                        excel
                    );

                }
            );

    }


    /* =========================================
       INITIALIZE
    ========================================= */

    function initialize() {

        getUsers();

        getProjects();

        setupLogin();

        setupRegistration();

        renderAllProjects();

        renderApprovedTitles();

        renderAdminProjects();

        addExportButtons();

    }


    document.addEventListener(
        "DOMContentLoaded",
        initialize
    );


})();