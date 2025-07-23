// Legal Force - Panel de Usuario JavaScript
// ================================================

// Global Variables
let currentMonth = new Date().getMonth();
let currentYear = new Date().getFullYear();
let currentSection = 'dashboard';

// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

// Initialize Application
function initializeApp() {
    setupEventListeners();
    generateCalendar();
    setupDropdowns();
    setupModals();
    setupNotifications();
    loadDashboardData();
}

// Event Listeners Setup
function setupEventListeners() {
    // Menu toggle for mobile
    const menuToggle = document.getElementById('menuToggle');
    if (menuToggle) {
        menuToggle.addEventListener('click', toggleSidebar);
    }

    // Calendar navigation
    const prevMonth = document.getElementById('prevMonth');
    const nextMonth = document.getElementById('nextMonth');
    
    if (prevMonth) {
        prevMonth.addEventListener('click', () => {
            currentMonth--;
            if (currentMonth < 0) {
                currentMonth = 11;
                currentYear--;
            }
            generateCalendar();
        });
    }

    if (nextMonth) {
        nextMonth.addEventListener('click', () => {
            currentMonth++;
            if (currentMonth > 11) {
                currentMonth = 0;
                currentYear++;
            }
            generateCalendar();
        });
    }

    // File upload areas
    setupFileUploads();

    // Form submissions
    setupFormHandlers();

    // Window resize handler
    window.addEventListener('resize', handleWindowResize);

    // Click outside to close dropdowns
    document.addEventListener('click', closeDropdownsOnClickOutside);
}

// Sidebar Toggle
function toggleSidebar() {
    const sidebar = document.getElementById('sidebar');
    if (sidebar) {
        sidebar.classList.toggle('show');
    }
}

// Navigation Functions
function showSection(sectionId) {
    // Hide all sections
    const sections = document.querySelectorAll('.content-section');
    sections.forEach(section => {
        section.classList.remove('active');
    });

    // Show selected section
    const targetSection = document.getElementById(sectionId);
    if (targetSection) {
        targetSection.classList.add('active');
    }

    // Update navigation active state
    const navItems = document.querySelectorAll('.nav-item');
    navItems.forEach(item => {
        item.classList.remove('active');
    });

    // Find and activate corresponding nav item
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        if (link.getAttribute('onclick') && link.getAttribute('onclick').includes(sectionId)) {
            link.closest('.nav-item').classList.add('active');
        }
    });

    currentSection = sectionId;

    // Hide sidebar on mobile after navigation
    if (window.innerWidth <= 1024) {
        const sidebar = document.getElementById('sidebar');
        if (sidebar) {
            sidebar.classList.remove('show');
        }
    }

    // Load section-specific data
    loadSectionData(sectionId);
}

// Load section-specific data
function loadSectionData(sectionId) {
    switch (sectionId) {
        case 'dashboard':
            loadDashboardData();
            break;
        case 'appointments':
            loadAppointmentsData();
            break;
        case 'history':
            loadHistoryData();
            break;
        case 'consultations':
            loadConsultationsData();
            break;
        case 'documents':
            loadDocumentsData();
            break;
        case 'billing':
            loadBillingData();
            break;
        case 'support':
            loadSupportData();
            break;
        case 'templates':
            loadTemplatesData();
            break;
        case 'news':
            loadNewsData();
            break;
        case 'profile':
            loadProfileData();
            break;
    }
}

// Dashboard Functions
function loadDashboardData() {
    // Simulate loading dashboard statistics
    animateCounters();
    updateRecentActivity();
}

function animateCounters() {
    const counters = document.querySelectorAll('.stat-content h3');
    counters.forEach(counter => {
        const target = parseInt(counter.textContent);
        let current = 0;
        const increment = target / 20;
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                counter.textContent = target;
                clearInterval(timer);
            } else {
                counter.textContent = Math.floor(current);
            }
        }, 50);
    });
}

function updateRecentActivity() {
    // Add timestamp updates or real-time data here
    console.log('Dashboard data loaded');
}

// Calendar Functions
function generateCalendar() {
    const calendarGrid = document.getElementById('calendarGrid');
    const currentMonthElement = document.getElementById('currentMonth');
    
    if (!calendarGrid || !currentMonthElement) return;

    const monthNames = [
        'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
        'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
    ];

    const daysOfWeek = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'];
    
    // Update month/year display
    currentMonthElement.textContent = `${monthNames[currentMonth]} ${currentYear}`;

    // Clear calendar
    calendarGrid.innerHTML = '';

    // Add day headers
    daysOfWeek.forEach(day => {
        const dayHeader = document.createElement('div');
        dayHeader.className = 'calendar-day-header';
        dayHeader.textContent = day;
        dayHeader.style.fontWeight = '600';
        dayHeader.style.color = 'var(--text-secondary)';
        dayHeader.style.fontSize = 'var(--font-size-xs)';
        dayHeader.style.textAlign = 'center';
        dayHeader.style.padding = 'var(--spacing-2)';
        calendarGrid.appendChild(dayHeader);
    });

    // Get first day of month and number of days
    const firstDay = new Date(currentYear, currentMonth, 1).getDay();
    const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
    const today = new Date();

    // Add empty cells for days before month starts
    for (let i = 0; i < firstDay; i++) {
        const emptyDay = document.createElement('div');
        emptyDay.className = 'calendar-day empty';
        calendarGrid.appendChild(emptyDay);
    }

    // Add days of the month
    for (let day = 1; day <= daysInMonth; day++) {
        const dayElement = document.createElement('div');
        dayElement.className = 'calendar-day';
        dayElement.textContent = day;
        
        // Check if it's today
        if (currentYear === today.getFullYear() && 
            currentMonth === today.getMonth() && 
            day === today.getDate()) {
            dayElement.classList.add('today');
        }

        // Check if day has appointments (mock data)
        if (hasAppointment(day)) {
            dayElement.classList.add('has-appointment');
        }

        dayElement.addEventListener('click', () => selectDate(day));
        calendarGrid.appendChild(dayElement);
    }
}

function hasAppointment(day) {
    // Mock appointment data
    const appointmentDays = [24, 26, 28];
    return appointmentDays.includes(day);
}

function selectDate(day) {
    const selectedDate = new Date(currentYear, currentMonth, day);
    console.log('Selected date:', selectedDate);
    // Add functionality to show appointments for selected date
}

// Dropdown Functions
function setupDropdowns() {
    const notificationBtn = document.getElementById('notificationBtn');
    const notificationDropdown = document.getElementById('notificationDropdown');
    const userBtn = document.getElementById('userBtn');
    const userDropdown = document.getElementById('userDropdown');

    if (notificationBtn && notificationDropdown) {
        notificationBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            toggleDropdown(notificationDropdown);
            closeDropdown(userDropdown);
        });
    }

    if (userBtn && userDropdown) {
        userBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            toggleDropdown(userDropdown);
            closeDropdown(notificationDropdown);
        });
    }
}

function toggleDropdown(dropdown) {
    if (dropdown) {
        dropdown.classList.toggle('show');
    }
}

function closeDropdown(dropdown) {
    if (dropdown) {
        dropdown.classList.remove('show');
    }
}

function closeDropdownsOnClickOutside(event) {
    const dropdowns = document.querySelectorAll('.notification-dropdown, .user-dropdown');
    dropdowns.forEach(dropdown => {
        if (!dropdown.contains(event.target) && !event.target.closest('.notification-btn, .user-btn')) {
            closeDropdown(dropdown);
        }
    });
}

// Modal Functions
function setupModals() {
    const modalOverlay = document.getElementById('modalOverlay');
    if (modalOverlay) {
        modalOverlay.addEventListener('click', (e) => {
            if (e.target === modalOverlay) {
                closeModal();
            }
        });
    }

    // Close modal with Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            closeModal();
        }
    });
}

function openModal(modalId) {
    const modalOverlay = document.getElementById('modalOverlay');
    const modal = document.getElementById(modalId);
    
    if (modalOverlay && modal) {
        // Hide all modals first
        const allModals = document.querySelectorAll('.modal');
        allModals.forEach(m => m.style.display = 'none');
        
        // Show selected modal
        modal.style.display = 'block';
        modalOverlay.classList.add('show');
        
        // Focus on first input if available
        const firstInput = modal.querySelector('input, select, textarea');
        if (firstInput) {
            setTimeout(() => firstInput.focus(), 100);
        }
    }
}

function closeModal() {
    const modalOverlay = document.getElementById('modalOverlay');
    if (modalOverlay) {
        modalOverlay.classList.remove('show');
        
        // Hide all modals after animation
        setTimeout(() => {
            const allModals = document.querySelectorAll('.modal');
            allModals.forEach(modal => modal.style.display = 'none');
        }, 250);
    }
}

// Notification Functions
function setupNotifications() {
    // Mark all notifications as read
    const markAllReadBtn = document.querySelector('.mark-all-read');
    if (markAllReadBtn) {
        markAllReadBtn.addEventListener('click', markAllNotificationsRead);
    }
}

function markAllNotificationsRead() {
    const unreadNotifications = document.querySelectorAll('.notification-item.unread');
    unreadNotifications.forEach(notification => {
        notification.classList.remove('unread');
    });
    
    // Update notification badge
    const badge = document.querySelector('.notification-badge');
    if (badge) {
        badge.textContent = '0';
        badge.style.display = 'none';
    }
}

function addNotification(type, message, timestamp) {
    const notificationList = document.querySelector('.notification-list');
    if (!notificationList) return;

    const notification = document.createElement('div');
    notification.className = 'notification-item unread';
    
    const iconClass = type === 'success' ? 'fa-check-circle' : 
                     type === 'warning' ? 'fa-exclamation-triangle' : 
                     type === 'info' ? 'fa-info-circle' : 'fa-bell';
    
    notification.innerHTML = `
        <i class="fas ${iconClass} text-${type}"></i>
        <div class="notification-content">
            <p>${message}</p>
            <span>${timestamp}</span>
        </div>
    `;
    
    notificationList.insertBefore(notification, notificationList.firstChild);
    
    // Update badge count
    updateNotificationBadge();
}

function updateNotificationBadge() {
    const unreadCount = document.querySelectorAll('.notification-item.unread').length;
    const badge = document.querySelector('.notification-badge');
    
    if (badge) {
        badge.textContent = unreadCount;
        badge.style.display = unreadCount > 0 ? 'flex' : 'none';
    }
}

// Chat Functions
function sendMessage() {
    const messageInput = document.getElementById('messageInput');
    const chatMessages = document.getElementById('chatMessages');
    
    if (!messageInput || !chatMessages) return;
    
    const messageText = messageInput.value.trim();
    if (!messageText) return;
    
    // Create sent message
    const messageElement = document.createElement('div');
    messageElement.className = 'message sent';
    messageElement.innerHTML = `
        <div class="message-content">
            <p>${messageText}</p>
            <span class="message-time">${getCurrentTime()}</span>
        </div>
    `;
    
    chatMessages.appendChild(messageElement);
    messageInput.value = '';
    
    // Scroll to bottom
    chatMessages.scrollTop = chatMessages.scrollHeight;
    
    // Simulate response (optional)
    setTimeout(() => {
        simulateResponse(chatMessages);
    }, 1000);
}

function simulateResponse(chatMessages) {
    const responses = [
        "Gracias por su mensaje. Lo revisaré y le responderé a la brevedad.",
        "Entiendo su consulta. Permítame revisar la documentación correspondiente.",
        "Perfecto. Procederé a gestionar su solicitud de inmediato.",
        "He recibido su información. Le mantendré informado sobre cualquier novedad."
    ];
    
    const randomResponse = responses[Math.floor(Math.random() * responses.length)];
    
    const responseElement = document.createElement('div');
    responseElement.className = 'message received';
    responseElement.innerHTML = `
        <div class="message-avatar">
            <img src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%23A0665C'%3E%3Cpath d='M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z'/%3E%3C/svg%3E" alt="Abogado">
        </div>
        <div class="message-content">
            <p>${randomResponse}</p>
            <span class="message-time">${getCurrentTime()}</span>
        </div>
    `;
    
    chatMessages.appendChild(responseElement);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

function getCurrentTime() {
    const now = new Date();
    return now.toLocaleTimeString('es-CO', { 
        hour: '2-digit', 
        minute: '2-digit',
        hour12: true 
    });
}

// File Upload Functions
function setupFileUploads() {
    const fileUploadAreas = document.querySelectorAll('.file-upload-area');
    
    fileUploadAreas.forEach(area => {
        const input = area.querySelector('input[type="file"]');
        
        if (input) {
            // Click to upload
            area.addEventListener('click', (e) => {
                if (e.target !== input) {
                    input.click();
                }
            });
            
            // Drag and drop
            area.addEventListener('dragover', (e) => {
                e.preventDefault();
                area.style.borderColor = 'var(--primary-color)';
                area.style.backgroundColor = 'rgba(139, 111, 71, 0.05)';
            });
            
            area.addEventListener('dragleave', (e) => {
                e.preventDefault();
                area.style.borderColor = 'var(--border-color)';
                area.style.backgroundColor = 'var(--surface-hover)';
            });
            
            area.addEventListener('drop', (e) => {
                e.preventDefault();
                area.style.borderColor = 'var(--border-color)';
                area.style.backgroundColor = 'var(--surface-hover)';
                
                const files = e.dataTransfer.files;
                if (files.length > 0) {
                    handleFileUpload(files, area);
                }
            });
            
            // File input change
            input.addEventListener('change', (e) => {
                const files = e.target.files;
                if (files.length > 0) {
                    handleFileUpload(files, area);
                }
            });
        }
    });
}

function handleFileUpload(files, uploadArea) {
    const maxSize = 10 * 1024 * 1024; // 10MB
    const allowedTypes = ['application/pdf', 'application/msword', 
                         'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
                         'image/jpeg', 'image/png'];
    
    Array.from(files).forEach(file => {
        // Validate file size
        if (file.size > maxSize) {
            showAlert('error', `El archivo ${file.name} es demasiado grande. Máximo 10MB.`);
            return;
        }
        
        // Validate file type
        if (!allowedTypes.includes(file.type)) {
            showAlert('error', `Tipo de archivo no permitido: ${file.name}`);
            return;
        }
        
        // Show upload progress
        showUploadProgress(file, uploadArea);
    });
}

function showUploadProgress(file, uploadArea) {
    const progressContainer = document.createElement('div');
    progressContainer.className = 'upload-progress';
    progressContainer.innerHTML = `
        <div class="upload-file-info">
            <span class="file-name">${file.name}</span>
            <span class="file-size">${formatFileSize(file.size)}</span>
        </div>
        <div class="progress-bar">
            <div class="progress-fill" style="width: 0%"></div>
        </div>
        <span class="progress-text">0%</span>
    `;
    
    uploadArea.appendChild(progressContainer);
    
    // Simulate upload progress
    let progress = 0;
    const interval = setInterval(() => {
        progress += Math.random() * 15;
        if (progress >= 100) {
            progress = 100;
            clearInterval(interval);
            
            setTimeout(() => {
                progressContainer.remove();
                showAlert('success', `Archivo ${file.name} subido exitosamente.`);
            }, 500);
        }
        
        const progressFill = progressContainer.querySelector('.progress-fill');
        const progressText = progressContainer.querySelector('.progress-text');
        
        if (progressFill && progressText) {
            progressFill.style.width = `${progress}%`;
            progressText.textContent = `${Math.round(progress)}%`;
        }
    }, 200);
}

function formatFileSize(bytes) {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}

// Form Handlers
function setupFormHandlers() {
    // Appointment form
    const appointmentForm = document.querySelector('.appointment-form');
    if (appointmentForm) {
        appointmentForm.addEventListener('submit', handleAppointmentSubmit);
    }
    
    // Consultation form
    const consultationForm = document.querySelector('.consultation-form');
    if (consultationForm) {
        consultationForm.addEventListener('submit', handleConsultationSubmit);
    }
    
    // Upload form
    const uploadForm = document.querySelector('.upload-form');
    if (uploadForm) {
        uploadForm.addEventListener('submit', handleUploadSubmit);
    }
    
    // Support form
    const supportForm = document.querySelector('.support-form');
    if (supportForm) {
        supportForm.addEventListener('submit', handleSupportSubmit);
    }
}

function handleAppointmentSubmit(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    
    // Validate form
    if (!validateAppointmentForm(formData)) {
        return;
    }
    
    // Show loading state
    showLoading();
    
    // Simulate API call
    setTimeout(() => {
        hideLoading();
        showAlert('success', 'Cita agendada exitosamente.');
        closeModal();
        // Refresh appointments data
        loadAppointmentsData();
    }, 1500);
}

function handleConsultationSubmit(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    
    // Validate form
    if (!validateConsultationForm(formData)) {
        return;
    }
    
    showLoading();
    
    setTimeout(() => {
        hideLoading();
        showAlert('success', 'Consulta enviada exitosamente.');
        closeModal();
        loadConsultationsData();
    }, 1500);
}

function handleUploadSubmit(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    
    showLoading();
    
    setTimeout(() => {
        hideLoading();
        showAlert('success', 'Documento subido exitosamente.');
        closeModal();
        loadDocumentsData();
    }, 1500);
}

function handleSupportSubmit(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    
    showLoading();
    
    setTimeout(() => {
        hideLoading();
        showAlert('success', 'Ticket de soporte creado exitosamente.');
        closeModal();
        loadSupportData();
    }, 1500);
}

// Form Validation Functions
function validateAppointmentForm(formData) {
    const requiredFields = ['tipo', 'abogado', 'fecha', 'hora'];
    return validateRequiredFields(formData, requiredFields);
}

function validateConsultationForm(formData) {
    const requiredFields = ['area', 'asunto', 'descripcion'];
    return validateRequiredFields(formData, requiredFields);
}

function validateRequiredFields(formData, fields) {
    for (let field of fields) {
        if (!formData.get(field) || formData.get(field).trim() === '') {
            showAlert('error', `El campo ${field} es requerido.`);
            return false;
        }
    }
    return true;
}

// Alert Functions
function showAlert(type, message, duration = 5000) {
    const alertContainer = getOrCreateAlertContainer();
    
    const alert = document.createElement('div');
    alert.className = `alert alert-${type}`;
    alert.innerHTML = `
        <div class="alert-content">
            <i class="fas ${getAlertIcon(type)}"></i>
            <span>${message}</span>
        </div>
        <button class="alert-close" onclick="this.parentElement.remove()">
            <i class="fas fa-times"></i>
        </button>
    `;
    
    alertContainer.appendChild(alert);
    
    // Auto remove after duration
    setTimeout(() => {
        if (alert.parentElement) {
            alert.remove();
        }
    }, duration);
}

function getOrCreateAlertContainer() {
    let container = document.querySelector('.alert-container');
    
    if (!container) {
        container = document.createElement('div');
        container.className = 'alert-container';
        container.style.cssText = `
            position: fixed;
            top: 80px;
            right: 20px;
            z-index: 3000;
            display: flex;
            flex-direction: column;
            gap: 10px;
        `;
        document.body.appendChild(container);
    }
    
    return container;
}

function getAlertIcon(type) {
    const icons = {
        success: 'fa-check-circle',
        error: 'fa-exclamation-circle',
        warning: 'fa-exclamation-triangle',
        info: 'fa-info-circle'
    };
    return icons[type] || 'fa-info-circle';
}

// Loading Functions
function showLoading() {
    const loading = document.createElement('div');
    loading.id = 'loadingOverlay';
    loading.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: rgba(0, 0, 0, 0.5);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 4000;
    `;
    
    loading.innerHTML = `
        <div style="background: white; padding: 20px; border-radius: 10px; text-align: center;">
            <div class="spinner" style="
                border: 3px solid #f3f3f3;
                border-top: 3px solid var(--primary-color);
                border-radius: 50%;
                width: 40px;
                height: 40px;
                animation: spin 1s linear infinite;
                margin: 0 auto 10px;
            "></div>
            <p>Procesando...</p>
        </div>
    `;
    
    // Add spinner animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
        }
    `;
    document.head.appendChild(style);
    
    document.body.appendChild(loading);
}

function hideLoading() {
    const loading = document.getElementById('loadingOverlay');
    if (loading) {
        loading.remove();
    }
}

// Data Loading Functions (Mock Data)
function loadAppointmentsData() {
    console.log('Loading appointments data...');
    // Here you would typically fetch data from an API
}

function loadHistoryData() {
    console.log('Loading history data...');
}

function loadConsultationsData() {
    console.log('Loading consultations data...');
}

function loadDocumentsData() {
    console.log('Loading documents data...');
}

function loadBillingData() {
    console.log('Loading billing data...');
}

function loadSupportData() {
    console.log('Loading support data...');
}

function loadTemplatesData() {
    console.log('Loading templates data...');
}

function loadNewsData() {
    console.log('Loading news data...');
}

function loadProfileData() {
    console.log('Loading profile data...');
}

// Template Functions
function filterTemplates(category) {
    const templates = document.querySelectorAll('.template-card');
    const buttons = document.querySelectorAll('.category-btn');
    
    // Update button states
    buttons.forEach(btn => btn.classList.remove('active'));
    event.target.classList.add('active');
    
    // Filter templates
    templates.forEach(template => {
        const templateCategory = template.getAttribute('data-category');
        if (category === 'all' || templateCategory === category) {
            template.style.display = 'flex';
        } else {
            template.style.display = 'none';
        }
    });
}

// News Functions
function filterNews(type) {
    const buttons = document.querySelectorAll('.filter-btn');
    
    // Update button states
    buttons.forEach(btn => btn.classList.remove('active'));
    event.target.classList.add('active');
    
    // Here you would filter news items based on type
    console.log('Filtering news by:', type);
}

// FAQ Functions
function toggleFaq(element) {
    const faqAnswer = element.nextElementSibling;
    const isOpen = faqAnswer.classList.contains('show');
    
    // Close all FAQ items
    document.querySelectorAll('.faq-answer').forEach(answer => {
        answer.classList.remove('show');
    });
    
    document.querySelectorAll('.faq-question').forEach(question => {
        question.classList.remove('active');
    });
    
    // Open clicked item if it wasn't already open
    if (!isOpen) {
        faqAnswer.classList.add('show');
        element.classList.add('active');
    }
}

// Profile Functions
function toggleEditProfile() {
    const profileDetails = document.getElementById('profileDetails');
    const isEditing = profileDetails.classList.contains('editing');
    
    if (isEditing) {
        // Save changes
        saveProfileChanges();
        profileDetails.classList.remove('editing');
    } else {
        // Enable editing
        enableProfileEditing();
        profileDetails.classList.add('editing');
    }
}

function enableProfileEditing() {
    const detailItems = document.querySelectorAll('.detail-item span');
    detailItems.forEach(span => {
        const currentValue = span.textContent;
        const input = document.createElement('input');
        input.type = 'text';
        input.value = currentValue;
        input.className = 'form-input';
        span.parentNode.replaceChild(input, span);
    });
}

function saveProfileChanges() {
    const inputs = document.querySelectorAll('.detail-item input');
    inputs.forEach(input => {
        const span = document.createElement('span');
        span.textContent = input.value;
        input.parentNode.replaceChild(span, input);
    });
    
    showAlert('success', 'Perfil actualizado exitosamente.');
}

// Responsive Functions
function handleWindowResize() {
    const sidebar = document.getElementById('sidebar');
    
    if (window.innerWidth > 1024) {
        // Desktop view
        if (sidebar) {
            sidebar.classList.remove('show');
        }
    }
}

// Search Functions
function setupSearchFunctionality() {
    const searchInputs = document.querySelectorAll('input[placeholder*="Buscar"], input[placeholder*="buscar"]');
    
    searchInputs.forEach(input => {
        input.addEventListener('input', (e) => {
            const searchTerm = e.target.value.toLowerCase();
            const context = getSearchContext(input);
            performSearch(searchTerm, context);
        });
    });
}

function getSearchContext(input) {
    // Determine what we're searching based on the input's location
    if (input.closest('#history')) return 'cases';
    if (input.closest('#documents')) return 'documents';
    if (input.closest('#billing')) return 'billing';
    return 'general';
}

function performSearch(term, context) {
    // Implement search functionality based on context
    console.log(`Searching for "${term}" in ${context}`);
}

// Utility Functions
function formatCurrency(amount) {
    return new Intl.NumberFormat('es-CO', {
        style: 'currency',
        currency: 'COP'
    }).format(amount);
}

function formatDate(date) {
    return new Intl.DateTimeFormat('es-CO', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    }).format(new Date(date));
}

function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Export functions for global access
window.showSection = showSection;
window.openModal = openModal;
window.closeModal = closeModal;
window.sendMessage = sendMessage;
window.toggleFaq = toggleFaq;
window.filterTemplates = filterTemplates;
window.filterNews = filterNews;
window.toggleEditProfile = toggleEditProfile;

// Initialize search functionality when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    setupSearchFunctionality();
});

// Service Worker Registration (Optional)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
            .then(registration => {
                console.log('SW registered: ', registration);
            })
            .catch(registrationError => {
                console.log('SW registration failed: ', registrationError);
            });
    });
}