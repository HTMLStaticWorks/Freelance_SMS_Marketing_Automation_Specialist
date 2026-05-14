/**
 * SMSPulse - Dashboard JavaScript Functions
 * Orchestrates dynamic navigation, client copy approvals, trigger logs, and charts
 */

document.addEventListener('DOMContentLoaded', () => {
  // --- Sidebar Panel Switching with Skeleton Loader Simulation ---
  const initDashboardNavigation = () => {
    const sidebarLinks = document.querySelectorAll('.sidebar-nav__link');
    const dashboardPanels = document.querySelectorAll('.dashboard-panel');
    const dashboardLoading = document.getElementById('dashboard-loading-overlay');
    
    if (sidebarLinks.length > 0 && dashboardPanels.length > 0) {
      sidebarLinks.forEach(link => {
        link.addEventListener('click', (e) => {
          const href = link.getAttribute('href');
          
          // Only prevent default if it's an internal panel link (starting with #)
          if (!href || !href.startsWith('#')) {
            return; // Allow normal navigation for logout or other page links
          }
          
          e.preventDefault();
          const targetPanelId = href.replace('#', '');
          
          // Remove active states from sidebar
          sidebarLinks.forEach(l => l.classList.remove('active'));
          link.classList.add('active');
          
          // Trigger Loading State Skeleton
          // Immediate feedback: Hide all panels, show targeted one
          dashboardPanels.forEach(panel => {
            panel.classList.remove('active');
            if (panel.id === targetPanelId) {
              panel.classList.add('active');
            }
          });


          // Close mobile sidebar if open
          const sidebar = document.querySelector('.dashboard-sidebar');
          if (sidebar) {
            sidebar.classList.remove('open');
          }
        });
      });
    }
  };

  // --- Mobile Sidebar Hamburger inside Dashboard ---
  const initMobileDashboardSidebar = () => {
    const dHeaderHamburger = document.querySelector('.dashboard-header__hamburger');
    const dSidebar = document.querySelector('.dashboard-sidebar');
    const dSidebarClose = document.querySelector('.dashboard-sidebar__close');

    if (dHeaderHamburger && dSidebar) {
      dHeaderHamburger.addEventListener('click', () => {
        dSidebar.classList.toggle('open');
      });
    }
    
    if (dSidebarClose && dSidebar) {
      dSidebarClose.addEventListener('click', () => {
        dSidebar.classList.remove('open');
      });
    }
  };

  // --- Campaign Text Copy Approvals Workflow ---
  const initTextApprovals = () => {
    const approveBtns = document.querySelectorAll('.btn-approve');
    const rejectBtns = document.querySelectorAll('.btn-reject');
    
    approveBtns.forEach(btn => {
      btn.addEventListener('click', (e) => {
        const card = e.target.closest('.approval-card');
        if (card) {
          const statusBadge = card.querySelector('.status-badge');
          if (statusBadge) {
            statusBadge.className = 'status-badge status-badge--approved';
            statusBadge.innerHTML = '<i class="fa-solid fa-circle-check"></i> Approved';
          }
          
          // Disable actions since action completed
          btn.disabled = true;
          const rejectBtn = card.querySelector('.btn-reject');
          if (rejectBtn) rejectBtn.disabled = true;
          
          // Flash green success feedback
          card.style.borderColor = 'var(--success)';
          setTimeout(() => {
            card.style.borderColor = 'var(--border-color)';
          }, 1500);
        }
      });
    });

    rejectBtns.forEach(btn => {
      btn.addEventListener('click', (e) => {
        const card = e.target.closest('.approval-card');
        if (card) {
          const statusBadge = card.querySelector('.status-badge');
          if (statusBadge) {
            statusBadge.className = 'status-badge status-badge--rejected';
            statusBadge.innerHTML = '<i class="fa-solid fa-circle-xmark"></i> Rejected';
          }
          
          btn.disabled = true;
          const approveBtn = card.querySelector('.btn-approve');
          if (approveBtn) approveBtn.disabled = true;
          
          card.style.borderColor = 'var(--error)';
          setTimeout(() => {
            card.style.borderColor = 'var(--border-color)';
          }, 1500);
        }
      });
    });
  };

  // --- Dynamic Keyword Triggers Management ---
  const initKeywordTriggers = () => {
    const keywordInput = document.getElementById('new-keyword');
    const messageInput = document.getElementById('new-keyword-msg');
    const addBtn = document.getElementById('add-keyword-trigger');
    const listBody = document.getElementById('keywords-table-body');

    if (addBtn && keywordInput && messageInput && listBody) {
      addBtn.addEventListener('click', () => {
        const keyword = keywordInput.value.trim().toUpperCase();
        const msg = messageInput.value.trim();

        if (keyword === '' || msg === '') {
          alert('Please supply both a Keyword code and a compliant response message!');
          return;
        }

        // Create new table row
        const row = document.createElement('tr');
        row.className = 'keyword-tr animate-fade';
        row.innerHTML = `
          <td><strong>${keyword}</strong></td>
          <td><span class="status-badge status-badge--active"><i class="fa-solid fa-circle"></i> Active</span></td>
          <td>${msg}</td>
          <td>0</td>
          <td>0%</td>
          <td>
            <button class="btn-icon btn-icon--sm delete-keyword-btn" title="Remove trigger">
              <i class="fa-solid fa-trash-can"></i>
            </button>
          </td>
        `;

        // Add delete handler to trash button
        const trashBtn = row.querySelector('.delete-keyword-btn');
        trashBtn.addEventListener('click', () => {
          row.style.opacity = '0';
          setTimeout(() => {
            row.remove();
          }, 300);
        });

        // Append to top of keywords list
        listBody.insertBefore(row, listBody.firstChild);
        
        // Reset inputs
        keywordInput.value = '';
        messageInput.value = '';
      });

      // Bind existing delete buttons if any
      const existingDeletes = document.querySelectorAll('.delete-keyword-btn');
      existingDeletes.forEach(btn => {
        btn.addEventListener('click', (e) => {
          const row = e.target.closest('tr');
          if (row) {
            row.style.opacity = '0';
            setTimeout(() => {
              row.remove();
            }, 300);
          }
        });
      });
    }
  };

  // --- Dynamic Live Audit Check ---
  const initAuditChecklist = () => {
    const auditBoxes = document.querySelectorAll('.audit-checkbox');
    const auditProgress = document.getElementById('audit-compliance-bar');
    const auditText = document.getElementById('audit-compliance-text');

    if (auditBoxes.length > 0 && auditProgress) {
      const updateAuditStats = () => {
        const checkedCount = Array.from(auditBoxes).filter(box => box.checked).length;
        const percent = Math.round((checkedCount / auditBoxes.length) * 100);
        
        auditProgress.style.width = `${percent}%`;
        if (auditText) {
          auditText.innerText = `Current Campaign Audit Rating: ${percent}% Compliant`;
          if (percent === 100) {
            auditText.innerHTML = '<i class="fa-solid fa-shield-halved"></i> 100% Fully Compliant Strategy!';
            auditText.style.color = 'var(--success)';
          } else {
            auditText.style.color = 'var(--text-primary)';
          }
        }
      };

      auditBoxes.forEach(box => {
        box.addEventListener('change', updateAuditStats);
      });

      updateAuditStats(); // Initial assessment
    }
  };

  // Running Dash Inits
  initDashboardNavigation();
  initMobileDashboardSidebar();
  initTextApprovals();
  initKeywordTriggers();
  initAuditChecklist();
});
