class SpecialHeader extends HTMLElement {
    connectedCallback(){
        this.innerHTML = `
            <div class="top-nav-left-section">
                <a href="project-manager.html" class="logo">PIDISHI Project Manager</a>
            </div>

            <div class="top-nav-middle-section">
                Test
            </div>

            <div class="top-nav-right-section">
                <ul class="navlist">
                    <li><a href="#">Dashboard</a></li>
                    <li><a href="task-list.html">Task</a></li>
                    <li><a href="gantt-chart.html">Analytics</a></li>
                </ul>
        
                <div class="bx bx-menu" id="menu-icon"></div>
            </div>
        `;
    }
}

class SpecialFooter extends HTMLElement {
    connectedCallback(){
        this.innerHTML = `
            Created by Jalaludin Zakaria
        `;
    }
}

customElements.define('common-header', SpecialHeader)
customElements.define('common-footer', SpecialFooter)
